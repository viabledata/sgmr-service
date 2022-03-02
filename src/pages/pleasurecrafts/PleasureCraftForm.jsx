import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, withRouter } from 'react-router-dom';

import FormFieldError from '../../components-v2/FormFieldError';
import { VESSELS_URL } from '../../constants/ApiConstants';
import { VESSELS_PAGE_URL } from '../../constants/ClientConstants';
import { getData, patchData, postData } from '../../utils/v2ApiHooks';
import removeError from '../../utils/errorHandlers';
import validate from '../../utils/validateFormData';
import scrollToTop from '../../utils/scrollToTop';
import PleasureCraftValidation from './PleasureCraftValidation';

const PleasureCraftForm = ({ source, type, vesselId }) => {
  const history = useHistory();
  const location = useLocation();
  const locationPath = location.pathname;
  const locationState = location.state;
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(JSON.parse(sessionStorage.getItem('formData')) || {});
  const [formPageIs, setFormPageIs] = useState(1);
  const [sourcePage, setSourcePage] = useState(VESSELS_PAGE_URL);
  const [submittedNextPage, setSubmittedNextPage] = useState(VESSELS_PAGE_URL);
  const [submitType, setSubmitType] = useState();
  const [title, setTitle] = useState();

  document.title = type === 'edit' ? 'Edit pleasure craft' : 'Save pleasure craft';
  const vesselTypeOther = formData.vesselType !== undefined && formData.vesselType !== 'sailingBoat' && formData.vesselType !== 'motorboat';
  const hasRegistration = formData.registration !== undefined;
  const hasMMSI = formData.mmsi !== undefined;
  const hasCallsign = formData.callsign !== undefined;

  const getPleasureCraftData = async () => {
    const resp = await getData(`${VESSELS_PAGE_URL}/${vesselId}`, 'vessels');
    const vesselName = resp.vesselName;
    const vesselType = resp.vesselType;
    const registration = resp.registration;
    const nationality = resp.nationality;
    const ais = resp.ais;
    const mmsi = resp.mmsi;
    const callsign = resp.callsign;

    setFormData({
      ...resp,
      vesselName,
      vesselType,
      registration: registration || null,
      nationality: nationality || null,
      ais: ais || null,
      mmsi: mmsi || null,
      callsign: callsign || null,
    });
  };

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
      vesselName: formData.vesselName,
      vesselType: formData.vesselType,
      registration: formData.registration,
      nationality: formData.nationality,
      ais: formData.ais,
      mmsi: formData.mmsi,
      callsign: formData.callsign,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    if (!await validateForm()) {
      if (submitType === 'PATCH') {
        response = await patchData(`${VESSELS_URL}/${vesselId}`, formatDataToSubmit(formData), locationPath);
      } else {
        response = await postData(VESSELS_URL, formatDataToSubmit(formData), locationPath);
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
    if (locationState?.source === 'edit' || source === 'edit') {
      source = 'edit';
      if (vesselId) { getPleasureCraftData(); }
    }
    switch (source) {
      case 'onboarding':
        setTitle('Add details of a pleasure craft you frequently sail with');
        setSubmitType('POST');
        break;
      case 'voyage':
        setTitle('Add details of a pleasure craft you are sailing with');
        setSubmitType('POST');
        break;
      case 'edit':
        setTitle('Update details of a pleasure craft you sail with');
        setSubmitType('PATCH');
        setSubmittedNextPage(VESSELS_PAGE_URL);
        setSourcePage(VESSELS_PAGE_URL);
        break;
      default:
        setTitle('Add details of a pleasure craft you frequently sail with');
        setSubmitType('POST');
        setSubmittedNextPage(VESSELS_PAGE_URL);
        setSourcePage(VESSELS_PAGE_URL);
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
                    <div id="vesselName" className={`govuk-form-group ${errors.vesselName ? 'govuk-form-group--error' : ''}`}>
                      <label className="govuk-label" htmlFor="vesselNameInput">
                        Name of pleasure craft
                      </label>
                      <FormFieldError error={errors.vesselName} />
                      <input
                        className="govuk-input"
                        id="vesselNameInput"
                        name="vesselName"
                        type="text"
                        value={formData.vesselName || ''}
                        onChange={handleChange}
                      />
                    </div>

                    <div id="vesselType" className={`govuk-form-group ${errors.vesselType ? 'govuk-form-group--error' : ''}`}>
                      <label className="govuk-label" htmlFor="vesselType">
                        Type of pleasure craft
                      </label>
                      <div className="govuk-radios" data-module="govuk-radios">
                        <FormFieldError error={errors.vesselType} />
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            id="vesselTypeInput"
                            name="vesselType"
                            type="radio"
                            value="sailingBoat"
                            checked={formData.vesselType === 'sailingBoat' ? 'checked' : ''}
                            onChange={(e) => handleChange(e)}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="vesselTypeInput">
                            Sailing boat
                          </label>
                        </div>
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            id="vesselType-2"
                            name="vesselType"
                            type="radio"
                            value="motorboat"
                            checked={formData.vesselType === 'motorboat' ? 'checked' : ''}
                            onChange={(e) => handleChange(e)}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="vesselType-2">
                            Motorboat
                          </label>
                        </div>
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            id="vesselType-3"
                            name="vesselType"
                            type="radio"
                            value=""
                            checked={vesselTypeOther ? 'checked' : ''}
                            onChange={(e) => handleChange(e)}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="vesselType-3">
                            Other
                          </label>
                        </div>
                        {vesselTypeOther && (
                        <div className="govuk-form-group">
                          <label className="govuk-label" htmlFor="vesselType-other">
                            Please specify
                            <input
                              className="govuk-input"
                              name="vesselType"
                              type="text"
                              value={vesselTypeOther ? formData.vesselType : ''}
                              onChange={handleChange}
                            />
                          </label>
                        </div>
                        )}
                      </div>
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
                      {type === 'edit' && (
                      <button
                        type="button"
                        className="govuk-button govuk-button--warning"
                        onClick={(e) => { goToNextPage(e, { url: `/pleasure-crafts/${vesselId}/delete`, runValidation: false }); }}
                      >
                        Delete this pleasure craft
                      </button>
                      )}
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
                    <div id="registration" className={`govuk-form-group ${errors.registration || errors.nationality ? 'govuk-form-group--error' : ''}`}>
                      <label className="govuk-label" htmlFor="registration">
                        Does this pleasure craft have a registration number?
                      </label>
                      <div className="govuk-radios" data-module="govuk-radios">
                        <FormFieldError error={errors.registration} />
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            id="registration-1"
                            name="registration"
                            type="radio"
                            value=""
                            checked={hasRegistration ? 'checked' : ''}
                            onChange={(e) => handleChange(e)}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="registration-1">
                            Yes
                          </label>
                        </div>
                        {hasRegistration && (
                        <div className="govuk-form-group">
                          <label className="govuk-label">
                            Registration number
                            <input
                              className="govuk-input"
                              name="registration-2"
                              type="text"
                              value={hasRegistration ? formData.registration : ''}
                              onChange={handleChange}
                            />
                          </label>
                          <FormFieldError error={errors.nationality} />
                          <label className="govuk-label">
                            Country of registration
                            <input
                              className="govuk-input"
                              name="nationality"
                              type="text"
                              value={hasRegistration ? formData.nationality : ''}
                              onChange={handleChange}
                            />
                          </label>
                        </div>
                        )}
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            id="pleasure-craft-registration-number-4"
                            name="pleasure-craft-registration-number"
                            type="radio"
                            value="no"
                            checked={!hasRegistration ? 'checked' : ''}
                            onChange={(e) => handleChange(e)}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="pleasure-craft-registration-number-4">
                            No
                          </label>
                        </div>
                      </div>
                    </div>

                    <div id="ais" className={`govuk-form-group ${errors.ais ? 'govuk-form-group--error' : ''}`}>
                      <label className="govuk-label" htmlFor="vesselType">
                        Does this pleasure craft have an Automatic Identification System (AIS)?
                      </label>
                      <div className="govuk-radios" data-module="govuk-radios">
                        <FormFieldError error={errors.ais} />
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            id="pleasure-craft-ais-yes"
                            name="pleasure-craft-ais"
                            type="radio"
                            value="yes"
                            checked={formData.ais === 'yes' ? 'checked' : ''}
                            onChange={(e) => handleChange(e)}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="pleasure-craft-ais-yes">
                            Yes
                          </label>
                        </div>
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            id="pleasure-craft-ais-no"
                            name="pleasure-craft-ais"
                            type="radio"
                            value="no"
                            checked={formData.ais === 'no' ? 'checked' : ''}
                            onChange={(e) => handleChange(e)}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="pleasure-craft-ais-no">
                            No
                          </label>
                        </div>
                      </div>
                    </div>

                    <div id="mmsi" className={`govuk-form-group ${errors.mmsi ? 'govuk-form-group--error' : ''}`}>
                      <label className="govuk-label" htmlFor="mmsi">
                        Does this pleasure craft have a Maritime Mobile Service Identify number (MMSI)?
                      </label>
                      <div className="govuk-radios" data-module="govuk-radios">
                        <FormFieldError error={errors.mmsi} />
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            id="pleasure-craft-mmsi"
                            name="pleasure-craft-mmsi"
                            type="radio"
                            value="yes"
                            checked={formData.mmsi !== undefined ? 'checked' : ''}
                            onChange={(e) => handleChange(e)}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="pleasure-craft-mmsi">
                            Yes
                          </label>
                        </div>
                        {formData.mmsi !== undefined && (
                        <div className="govuk-form-group">
                          <label className="govuk-label">
                            MMSI number
                            <input
                              className="govuk-input"
                              name="mmsi"
                              type="text"
                              value={formData.mmsi !== undefined ? formData.mmsi : ''}
                              onChange={handleChange}
                            />
                          </label>
                        </div>
                        )}
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            id="pleasure-craft-mmsi-3"
                            name="pleasure-craft-mmsi"
                            type="radio"
                            value="no"
                            checked={formData.mmsi === undefined ? 'checked' : ''}
                            onChange={(e) => handleChange(e)}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="pleasure-craft-mmsi-3">
                            No
                          </label>
                        </div>
                      </div>
                    </div>

                    <div id="callsign" className={`govuk-form-group ${errors.callsign ? 'govuk-form-group--error' : ''}`}>
                      <label className="govuk-label" htmlFor="callsign">
                        Does this pleasure craft have a callsign?
                      </label>
                      <div className="govuk-radios" data-module="govuk-radios">
                        <FormFieldError error={errors.callsign} />
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            id="pleasure-craft-callsign"
                            name="pleasure-craft-callsign"
                            type="radio"
                            value="yes"
                            checked={hasCallsign ? 'checked' : ''}
                            onChange={(e) => handleChange(e)}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="pleasure-craft-callsign">
                            Yes
                          </label>
                        </div>
                        {hasCallsign && (
                        <div className="govuk-form-group">
                          <label className="govuk-label" htmlFor="callsign">
                            Call sign
                            <input
                              className="govuk-input"
                              name="callsign"
                              type="text"
                              value={hasCallsign ? formData.callsign : ''}
                              onChange={handleChange}
                            />
                          </label>
                        </div>
                        )}
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            id="pleasure-craft-callsign-2"
                            name="pleasure-craft-callsign"
                            type="radio"
                            value="no"
                            checked={!hasCallsign ? 'checked' : ''}
                            onChange={(e) => handleChange(e)}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="pleasure-craft-callsign-2">
                            No
                          </label>
                        </div>
                      </div>
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

export default withRouter(PleasureCraftForm);
