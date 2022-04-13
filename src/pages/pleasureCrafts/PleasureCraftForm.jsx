import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import FormFieldError from '../../components-v2/FormFieldError';
import { PLEASURE_CRAFT_URL } from '../../constants/ApiConstants';
import { PLEASURE_CRAFT_PAGE_URL } from '../../constants/ClientConstants';
import { postData } from '../../utils/v2ApiHooks';
import removeError from '../../utils/errorHandlers';
import scrollToTop from '../../utils/scrollToTop';
import validate from '../../utils/validateFormData';
import PleasureCraftValidation from './PleasureCraftValidation';

const PleasureCraftForm = ({ source, type }) => {
  const history = useHistory();
  const location = useLocation();
  const locationPath = location.pathname;
  // const locationState = location.state;
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(JSON.parse(sessionStorage.getItem('formData')) || {});
  const [formPageIs, setFormPageIs] = useState(1);
  const [sourcePage, setSourcePage] = useState(PLEASURE_CRAFT_PAGE_URL);
  const [submittedNextPage, setSubmittedNextPage] = useState(PLEASURE_CRAFT_PAGE_URL);
  const [submitType, setSubmitType] = useState();
  const [title, setTitle] = useState('Add a pleasure craft');

  const SAILINGBOAT_TEXT = 'Sailing boat';
  const MOTORBOAT_TEXT = 'Motorboat';

  document.title = type === 'edit' ? 'Edit pleasure craft' : 'Save pleasure craft';
  const typeOther = formData.type !== undefined && formData.type !== SAILINGBOAT_TEXT && formData.type !== MOTORBOAT_TEXT;
  // Waiting on API update: const pleasureCraftMMSIYes = formData.pleasureCraftMMSI !== undefined && formData.pleasureCraftMMSI !== 'pleasureCraftMMSINo';
  const callSignYes = formData.callSign !== undefined && formData.callSign !== 'callSignNo';
  const registrationCountryYes = formData.registrationCountry !== undefined && formData.registrationCountry !== 'registrationCountryNo';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors(removeError(e.target.name, errors));
  };

  const handleErrorClick = (e, id) => {
    e.preventDefault();
    const scrollToError = document.getElementById(id);
    scrollToError.scrollIntoView();
  };

  const validateForm = async () => {
    const newErrors = await validate(PleasureCraftValidation[`page${formPageIs}`], formData);
    setErrors(newErrors);
    scrollToTop(newErrors);
    return Object.keys(newErrors).length > 0;
  };

  const goToNextPage = async (e, { url, runValidation }) => {
    e.preventDefault();
    let nextPageUrl;
    switch (url) {
      case 'nextFormPageIs':
        nextPageUrl = `/pleasure-crafts/${type || 'save'}-pleasure-craft/page-${formPageIs + 1}`;
        break;
      case 'previousFormPageIs':
        nextPageUrl = `/pleasure-crafts/${type || 'save'}-pleasure-craft/page-${formPageIs - 1}`;
        setFormPageIs(formPageIs - 1);
        break;
      default: nextPageUrl = url;
    }

    if (runValidation) {
      if (!await validateForm()) {
        history.push(nextPageUrl);
        setFormPageIs(url === 'nextFormPageIs' ? (formPageIs + 1) : formPageIs); // only relevant if user going to next page of a form and validation passes
      }
    } else {
      history.push(nextPageUrl);
    }
  };

  const formatDataToSubmit = () => {
    return {

      vesselName: formData.pleasureCraftName,
      vesselType: formData.type,
      moorings: formData.mooring,
      registration: formData.registrationNumber,
      vesselNationality: formData.registrationCountryName,
      callsign: formData.callSignReference,
      hullIdentificationNumber: '', // we no longer ask this
      portOfRegistry: '', // we no longer ask this,
      // The next two are new items we capture, but cannot yet pass to the API
      // Waiting on API update: ais: formData.pleasureCraftAIS,
      // Waiting on API update: mmsi: formData.pleasureCraftMMSINumber,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    if (!await validateForm()) {
      if (submitType === 'PATCH') {
        // response = await patchData(`${PEOPLE_URL}/${personId}`, formatDataToSubmit(formData), locationPath);
      } else {
        response = await postData(PLEASURE_CRAFT_URL, formatDataToSubmit(formData), locationPath);
      }
    }

    if (response && response.status === 200) {
      history.push(submittedNextPage);
    } else if (response) {
      setErrors({ [response.id]: response.message });
    }
  };

  useEffect(() => {
    setErrors({}); // always clear errors when changing page
    setFormPageIs(parseInt(locationPath.split('page-').pop(), 10));
    scrollToTop();
  }, [locationPath]);

  useEffect(() => {
    // if (locationState?.source === 'edit' || source === 'edit') {
    //   source = 'edit';
    //   if (personId) { getPersonData(); }
    // }
    switch (source) {
      case 'onboarding':
        setTitle('Add details of a person you frequently sail with');
        setSubmitType('POST');
        break;
      case 'voyage':
        setTitle('Add details of the person you are sailing with');
        setSubmitType('POST');
        break;
      case 'edit':
        setTitle('Update details of the person you sail with');
        setSubmitType('PATCH');
        setSubmittedNextPage(PLEASURE_CRAFT_PAGE_URL);
        setSourcePage(PLEASURE_CRAFT_PAGE_URL);
        break;
      default:
        setTitle('Add details of the person you frequently sail with');
        setSubmitType('POST');
        setSubmittedNextPage(PLEASURE_CRAFT_PAGE_URL);
        setSourcePage(PLEASURE_CRAFT_PAGE_URL);
    }
  }, [source]);

  useEffect(() => {
    sessionStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  return (
    <div className="govuk-width-container ">
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <div className="govuk-width-container ">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              {formPageIs === 1
                && (
                  <>
                    <h1 className="govuk-heading-l">{title}</h1>
                    {Object.keys(errors).length >= 1 && (
                    <div className="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabIndex="-1" data-module="govuk-error-summary">
                      <h2 className="govuk-error-summary__title">
                        There is a problem
                      </h2>
                      <div className="govuk-error-summary__body">
                        <ul className="govuk-list govuk-error-summary__list">
                          {Object.entries(errors).reverse().map((elem) => (
                            <li key={elem[0]}>
                              {elem[0] !== 'title'
                            //  eslint-disable-next-line jsx-a11y/anchor-is-valid
                            && <a onClick={(e) => handleErrorClick(e, elem[0])} href="#">{elem[1]}</a>}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    )}
                    <div id="pleasureCraftName" className={`govuk-form-group ${errors.pleasureCraftName ? 'govuk-form-group--error' : ''}`}>
                      <label className="govuk-label" htmlFor="pleasureCraftNameInput">
                        Name of pleasure craft
                      </label>
                      <FormFieldError error={errors.pleasureCraftName} />
                      <input
                        id="pleasureCraftNameInput"
                        className="govuk-input"
                        name="pleasureCraftName"
                        type="text"
                        value={formData?.pleasureCraftName || ''}
                        onChange={handleChange}
                      />
                    </div>
                    <div id="type" className={`govuk-form-group ${errors.type ? 'govuk-form-group--error' : ''}`}>
                      <fieldset className="govuk-fieldset">
                        <legend className="govuk-fieldset__legend">
                          <label className="govuk-fieldset__heading" htmlFor="type">
                            Type of pleasure craft
                          </label>
                        </legend>
                        <div className="govuk-radios govuk-radios">
                          <FormFieldError error={errors.type} />
                          <div className="govuk-radios__item">
                            <input
                              className="govuk-radios__input"
                              name="type"
                              id="sailingboat"
                              type="radio"
                              value={SAILINGBOAT_TEXT}
                              checked={formData.type === SAILINGBOAT_TEXT ? 'checked' : ''}
                              onChange={handleChange}
                            />
                            <label className="govuk-label govuk-radios__label" htmlFor="sailingboat">
                              Sailing boat (with or without an engine)
                            </label>
                          </div>
                          <div className="govuk-radios__item">
                            <input
                              className="govuk-radios__input"
                              name="type"
                              id="motorboat"
                              type="radio"
                              value={MOTORBOAT_TEXT}
                              checked={formData.type === MOTORBOAT_TEXT ? 'checked' : ''}
                              onChange={handleChange}
                            />
                            <label className="govuk-label govuk-radios__label" htmlFor="motorboat">
                              Motorboat
                            </label>
                          </div>
                          <div className="govuk-radios__item">
                            <input
                              className="govuk-radios__input"
                              name="type"
                              id="otherCraft"
                              type="radio"
                              value=""
                              checked={typeOther ? 'checked' : ''}
                              onChange={handleChange}
                            />
                            <label className="govuk-label govuk-radios__label" htmlFor="otherCraft">
                              Other
                            </label>
                          </div>
                          {typeOther && (
                          <div className="govuk-form-group">
                            <label className="govuk-label" htmlFor="type-other">
                              Please specify
                              <input
                                className="govuk-input"
                                name="type"
                                type="text"
                                value={typeOther ? formData.type : ''}
                                onChange={handleChange}
                              />
                            </label>
                          </div>
                          )}
                        </div>
                      </fieldset>
                    </div>
                    <div id="mooring" className={`govuk-form-group ${errors.mooring ? 'govuk-form-group--error' : ''}`}>
                      <label className="govuk-label" htmlFor="mooringInput">
                        Usual moorings
                      </label>
                      <div id="mooring-hint" className="govuk-hint">A description, UNLOCODE or set of Coordinates for where the pleasure craft is usually moored</div>
                      <FormFieldError error={errors.mooring} />
                      <input
                        id="mooringInput"
                        className="govuk-input"
                        name="mooring"
                        type="text"
                        value={formData?.mooring || ''}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="govuk-button-group">
                      <button
                        type="button"
                        className="govuk-button"
                        data-module="govuk-button"
                        onClick={(e) => {
                          goToNextPage(e, { url: 'nextFormPageIs', runValidation: true });
                        }}
                      >
                        Continue
                      </button>
                    </div>
                    <button
                      type="button"
                      className="govuk-button govuk-button--text"
                      onClick={(e) => { goToNextPage(e, { url: sourcePage, runValidation: false }); }}
                    >
                      Exit without saving
                    </button>
                  </>
                )}
              {formPageIs === 2
              && (
                <>
                  <h1 className="govuk-heading-l">Pleasure craft details</h1>
                  {Object.keys(errors).length >= 1 && (
                  <div className="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabIndex="-1" data-module="govuk-error-summary">
                    <h2 className="govuk-error-summary__title">
                      There is a problem
                    </h2>
                    <div className="govuk-error-summary__body">
                      <ul className="govuk-list govuk-error-summary__list">
                        {Object.entries(errors).reverse().map((elem) => (
                          <li key={elem[0]}>
                            {(elem[0] !== 'title' && elem[0] !== 'helpError')
                            //  eslint-disable-next-line jsx-a11y/anchor-is-valid
                            && <a onClick={(e) => handleErrorClick(e, elem[0])} href="#">{elem[1]}</a>}
                            {elem[0] === 'helpError'
                            && <a href="/page/help">{elem[1]}</a>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  )}
                  <div id="registrationNumber" className={`govuk-form-group ${errors.registrationNumber ? 'govuk-form-group--error' : ''}`}>
                    <label className="govuk-label" htmlFor="registrationNumberInput">
                      Registration number
                    </label>
                    <FormFieldError error={errors.registrationNumber} />
                    <input
                      id="registrationNumberInput"
                      className="govuk-input"
                      name="registrationNumber"
                      type="text"
                      value={formData?.registrationNumber || ''}
                      onChange={handleChange}
                    />
                  </div>

                  <div id="registrationCountry" className={`govuk-form-group ${errors.registrationCountry ? 'govuk-form-group--error' : ''}`}>
                    <fieldset className="govuk-fieldset">
                      <legend className="govuk-fieldset__legend">
                        <label className="govuk-fieldset__heading" htmlFor="registrationCountry">
                          Does this pleasure craft have a Country of Registration?
                        </label>
                      </legend>
                      <div className="govuk-radios govuk-radios">
                        <FormFieldError error={errors.registrationCountry} />
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            name="registrationCountry"
                            id="registrationCountryYes"
                            type="radio"
                            value="registrationCountryYes"
                            checked={formData.registrationCountry === 'registrationCountryYes' ? 'checked' : ''}
                            onChange={handleChange}
                            data-testid="registrationCountryYes"
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="registrationCountryYes">
                            Yes
                          </label>
                        </div>
                        {registrationCountryYes && (
                        <div className="govuk-form-group">
                          <label className="govuk-label" htmlFor="registrationCountryName">
                            Country of registration
                            <input
                              className="govuk-input"
                              name="registrationCountryName"
                              type="text"
                              defaultValue={registrationCountryYes ? formData.registrationCountryName : ''}
                              onChange={handleChange}
                            />
                          </label>
                        </div>
                        )}
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            name="registrationCountry"
                            id="registrationCountryNo"
                            type="radio"
                            value="registrationCountryNo"
                            checked={formData.registrationCountry === 'registrationCountryNo' ? 'checked' : ''}
                            onChange={handleChange}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="registrationCountryNo">
                            No
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>

                  {/* // Waiting on API update:
                  <div id="pleasureCraftAIS" className={`govuk-form-group ${errors.pleasureCraftAIS ? 'govuk-form-group--error' : ''}`}>
                    <fieldset className="govuk-fieldset">
                      <legend className="govuk-fieldset__legend">
                        <label className="govuk-fieldset__heading" htmlFor="pleasureCraftAIS">
                          Does this pleasure craft have an Automatic Identification System (AIS)?
                        </label>
                      </legend>
                      <div className="govuk-radios govuk-radios">
                        <FormFieldError error={errors.pleasureCraftAIS} />
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            name="pleasureCraftAIS"
                            id="pleasureCraftAISYes"
                            type="radio"
                            value="pleasureCraftAISYes"
                            checked={formData.pleasureCraftAIS === 'pleasureCraftAISYes' ? 'checked' : ''}
                            onChange={handleChange}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="pleasureCraftAISYes">
                            Yes
                          </label>
                        </div>
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            name="pleasureCraftAIS"
                            id="pleasureCraftAISNo"
                            type="radio"
                            value="pleasureCraftAISNo"
                            checked={formData.pleasureCraftAIS === 'pleasureCraftAISNo' ? 'checked' : ''}
                            onChange={handleChange}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="pleasureCraftAISNNo">
                            No
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div> */}

                  {/* // Waiting on API update:
                  <div id="pleasureCraftMMSI" className={`govuk-form-group ${errors.pleasureCraftMMSI ? 'govuk-form-group--error' : ''}`}>
                    <fieldset className="govuk-fieldset">
                      <legend className="govuk-fieldset__legend">
                        <label className="govuk-fieldset__heading" htmlFor="pleasureCraftMMSI">
                          Does this pleasure craft have a Maritime Mobile Service Identify number (MMSI)?
                        </label>
                      </legend>
                      <div className="govuk-radios govuk-radios">
                        <FormFieldError error={errors.pleasureCraftMMSI} />
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            name="pleasureCraftMMSI"
                            id="pleasureCraftMMSIYes"
                            type="radio"
                            value="pleasureCraftMMSIYes"
                            checked={formData.pleasureCraftMMSI === 'pleasureCraftMMSIYes' ? 'checked' : ''}
                            onChange={handleChange}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="pleasureCraftMMSIYes">
                            Yes
                          </label>
                        </div>
                        {pleasureCraftMMSIYes && (
                          <div className="govuk-form-group">
                            <label className="govuk-label" htmlFor="pleasureCraftMMSINumber">
                              MMSI number
                              <input
                                className="govuk-input"
                                name="pleasureCraftMMSINumber"
                                type="text"
                                defaultValue={pleasureCraftMMSIYes ? formData.pleasureCraftMMSINumber : ''}
                                onChange={handleChange}
                              />
                            </label>
                          </div>
                        )}
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            name="pleasureCraftMMSI"
                            id="pleasureCraftMMSINo"
                            type="radio"
                            value="pleasureCraftMMSINo"
                            checked={formData.pleasureCraftMMSI === 'pleasureCraftMMSINo' ? 'checked' : ''}
                            onChange={handleChange}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="pleasureCraftMMSINo">
                            No
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div> */}

                  <div id="callSign" className={`govuk-form-group ${errors.callSign ? 'govuk-form-group--error' : ''}`}>
                    <fieldset className="govuk-fieldset">
                      <legend className="govuk-fieldset__legend">
                        <label className="govuk-fieldset__heading" htmlFor="callSign">
                          Does this pleasure craft have a Call sign?
                        </label>
                      </legend>
                      <div className="govuk-radios govuk-radios">
                        <FormFieldError error={errors.callSign} />
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            name="callSign"
                            id="callSignYes"
                            type="radio"
                            value="callSignYes"
                            checked={formData.callSign === 'callSignYes' ? 'checked' : ''}
                            onChange={handleChange}
                            data-testid="callSignYes"
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="callSignYes">
                            Yes
                          </label>
                        </div>
                        {callSignYes && (
                          <div className="govuk-form-group">
                            <label className="govuk-label" htmlFor="callSignReference">
                              Call sign
                              <input
                                className="govuk-input"
                                id="callSignReference"
                                name="callSignReference"
                                type="text"
                                defaultValue={formData.callSignReference}
                                onChange={handleChange}
                              />
                            </label>
                          </div>
                        )}
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            name="callSign"
                            id="callSign-no"
                            type="radio"
                            value="callSignNo"
                            checked={formData.callSign === 'callSignNo' ? 'checked' : ''}
                            onChange={handleChange}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="callSignNo">
                            No
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>

                  <div className="govuk-button-group">
                    <button
                      type="button"
                      className="govuk-button govuk-button--secondary"
                      data-module="govuk-button"
                      onClick={(e) => {
                        goToNextPage(e, { url: 'previousFormPageIs', runValidation: false });
                      }}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className="govuk-button"
                      data-module="govuk-button"
                      onClick={(e) => { handleSubmit(e); }}
                    >
                      Save
                    </button>
                  </div>
                  <button
                    type="button"
                    className="govuk-button govuk-button--text"
                    onClick={(e) => { goToNextPage(e, { url: sourcePage, runValidation: false }); }}
                  >
                    Exit without saving
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>

  );
};

export default PleasureCraftForm;
