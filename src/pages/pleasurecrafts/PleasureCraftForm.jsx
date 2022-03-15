import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
import { useThrottle } from 'react-use';
import { matchSorter } from 'match-sorter';

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';

import FormFieldError from '../../components-v2/FormFieldError';
import { VESSELS_URL } from '../../constants/ApiConstants';
import { VESSELS_PAGE_URL } from '../../constants/ClientConstants';
import { getData, patchData, postData } from '../../utils/v2ApiHooks';
import removeError from '../../utils/errorHandlers';
import validate from '../../utils/validateFormData';
import scrollToTop from '../../utils/scrollToTop';
import PleasureCraftValidation from './PleasureCraftValidation';
import { countries } from '../../utils/staticFormData';

const useCountryMatch = (term) => {
  const throttledTerm = useThrottle(term, 100);
  return React.useMemo(
    () => (term.trim() === ''
      ? null
      : matchSorter(countries, term, {
        keys: [(item) => `${item.label}`],
      })),
    [throttledTerm],
  );
};

const PleasureCraftForm = ({ source, type }) => {
  const history = useHistory();
  const location = useLocation();
  const locationPath = location.pathname;
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(JSON.parse(sessionStorage.getItem('formData')) || {});
  const [formPageIs, setFormPageIs] = useState(1);
  const [vesselId, setVesselId] = useState();
  const [sourceLocation, setSourceLocation] = useState();
  const [sourcePage, setSourcePage] = useState(VESSELS_PAGE_URL);
  const [submittedNextPage, setSubmittedNextPage] = useState(VESSELS_PAGE_URL);
  const [submitType, setSubmitType] = useState();
  const [title, setTitle] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = useCountryMatch(searchTerm);

  document.title = type === 'edit' ? 'Edit pleasure craft' : 'Save pleasure craft';
  const vesselTypeOther = formData.vesselType !== undefined && formData.vesselType !== 'sailingBoat' && formData.vesselType !== 'motorboat';

  const getPleasureCraftData = async (forThisVesselId) => {
    const resp = await getData(`${VESSELS_PAGE_URL}/${forThisVesselId}`, 'vessels');
    const vesselName = resp.vesselName;
    const vesselType = resp.vesselType;
    const hasRegistration = resp.hasRegistration;
    const registration = resp.registration;
    const vesselNationality = resp.vesselNationality;
    const ais = resp.ais;
    const hasMMSI = resp.hasMMSI;
    const mmsi = resp.mmsi;
    const hasCallsign = resp.hasCallsign;
    const callsign = resp.callsign;

    setFormData({
      ...resp.data,
      vesselName,
      vesselType,
      hasRegistration: hasRegistration || null,
      registration: registration || null,
      vesselNationality: vesselNationality || null,
      ais: ais || null,
      hasMMSI: hasMMSI || null,
      mmsi: mmsi || null,
      hasCallsign: hasCallsign || null,
      callsign: callsign || null,
    });
  };

  const handleSelect = (e) => {
    setSearchTerm(e);
    setFormData({ ...formData, vesselNationality: e });
    setErrors(removeError('vesselNationality', errors));
  };

  const handleComboboxInputChange = (e) => {
    setSearchTerm(e.target.value);
    setFormData({ ...formData, [e.target.name]: '' });
    setErrors(removeError(e.target.name, errors));
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
      hasRegistration: formData.hasRegistration,
      registration: formData.registration,
      vesselNationality: formData.vesselNationality,
      ais: formData.ais,
      hasMMSI: formData.hasMMSI,
      mmsi: formData.mmsi,
      hasCallsign: formData.hasCallsign,
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
    switch (sourceLocation) {
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
  }, [sourceLocation]);

  useEffect(() => {
    sessionStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    if (location.state?.source) {
      setSourceLocation(location.state?.source);
    } else {
      setSourceLocation(source);
    }
    if (location.state?.peopleId) {
      setVesselId(location.state.peopleId);
      getPleasureCraftData(location.state.peopleId);
    }
  }, []);

  useEffect(() => {
    if (formData.vesselNationality) {
      setSearchTerm(formData.vesselNationality);
    }
  }, []);

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

                    <div id="vesselType" className={`govuk-form-group ${!vesselTypeOther && errors.vesselType ? 'govuk-form-group--error' : ''}`}>
                      <label className="govuk-label" htmlFor="vesselType">
                        Type of pleasure craft
                      </label>
                      <div className="govuk-radios" data-module="govuk-radios">
                        {!vesselTypeOther && (
                          <FormFieldError error={errors.vesselType} />
                        )}
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            id="vesselTypeSailboat"
                            name="vesselType"
                            type="radio"
                            value="sailingBoat"
                            checked={formData.vesselType === 'sailingBoat' ? 'checked' : ''}
                            onChange={(e) => handleChange(e)}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="vesselTypeSailboat">
                            Sailing boat
                          </label>
                        </div>
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            id="vesselTypeMotorboat"
                            name="vesselType"
                            type="radio"
                            value="motorboat"
                            checked={formData.vesselType === 'motorboat' ? 'checked' : ''}
                            onChange={(e) => handleChange(e)}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="vesselTypeMotorboat">
                            Motorboat
                          </label>
                        </div>
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            id="vesselTypeOther"
                            name="vesselType"
                            type="radio"
                            value=""
                            checked={vesselTypeOther ? 'checked' : ''}
                            onChange={(e) => handleChange(e)}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="vesselTypeOther">
                            Other
                          </label>
                        </div>
                        {vesselTypeOther && (
                        <div className="govuk-radios__conditional" id="conditional-other">
                          <div className={`govuk-form-group ${errors.vesselTypeOther ? 'govuk-form-group--error' : ''}`}>
                            <label className="govuk-label" htmlFor="other-input">
                              Please specify
                            </label>
                            <FormFieldError error={errors.vesselTypeOther} />
                            <input
                              id="other-input"
                              className="govuk-input"
                              name="vesselType"
                              type="text"
                              value={vesselTypeOther ? formData.vesselType : ''}
                              onChange={handleChange}
                            />
                          </div>
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
                    <div id="registration" className={`govuk-form-group ${errors.hasRegistration ? 'govuk-form-group--error' : ''}`}>
                      <label className="govuk-label" htmlFor="registration">
                        Does this pleasure craft have a registration number?
                      </label>
                      <div className="govuk-radios" data-module="govuk-radios">
                        <FormFieldError error={errors.hasRegistration} />
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            id="registration-yes"
                            name="hasRegistration"
                            type="radio"
                            value="registrationYes"
                            checked={formData.hasRegistration === 'registrationYes' ? 'checked' : ''}
                            onChange={(e) => handleChange(e)}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="registration-yes">
                            Yes
                          </label>
                        </div>
                        {formData.hasRegistration === 'registrationYes' && (
                        <div className="govuk-radios__conditional" id="conditional-registration">
                          <div className={`govuk-form-group ${errors.registration ? 'govuk-form-group--error' : ''}`}>
                            <label className="govuk-label" htmlFor="registration-input">
                              Registration number
                            </label>
                            <FormFieldError error={errors.registration} />
                            <input
                              id="registration-input"
                              className="govuk-input"
                              name="registration"
                              type="text"
                              value={formData.hasRegistration === 'registrationYes' ? formData.registration : ''}
                              onChange={handleChange}
                            />
                          </div>
                          <div className={`govuk-form-group ${errors.vesselNationality ? 'govuk-form-group--error' : ''}`}>
                            <label className="govuk-label" htmlFor="vesselNationality-input">
                              Country of registration
                            </label>
                            <FormFieldError error={errors.vesselNationality} />
                            <Combobox
                              aria-label="Country of Registration"
                              onSelect={(e) => handleSelect(e)}
                            >
                              <ComboboxInput
                                id="vesselNationality-input"
                                className="govuk-input"
                                name="vesselNationality"
                                value={searchTerm}
                                onChange={(e) => handleComboboxInputChange(e)}
                              />
                              {searchResults && (
                              <ComboboxPopover className="shadow-popup">
                                {searchResults.length > 0 ? (
                                  <ComboboxList className="comboBoxListItem">
                                    {searchResults.slice(0, 10).map((searchResult) => (
                                      <ComboboxOption
                                        key={searchResult.id}
                                        value={`${searchResult.label}`}
                                      />
                                    ))}
                                  </ComboboxList>
                                ) : (
                                  <span />
                                )}
                              </ComboboxPopover>
                              )}
                            </Combobox>
                          </div>
                        </div>
                        )}
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            id="registration-no"
                            name="hasRegistration"
                            type="radio"
                            value="registrationNo"
                            checked={formData.hasRegistration === 'registrationNo' ? 'checked' : ''}
                            onChange={(e) => handleChange(e)}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="registration-no">
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
                            id="ais-yes"
                            name="ais"
                            type="radio"
                            value="aisYes"
                            checked={formData.ais === 'aisYes' ? 'checked' : ''}
                            onChange={(e) => handleChange(e)}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="ais-yes">
                            Yes
                          </label>
                        </div>
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            id="ais-no"
                            name="ais"
                            type="radio"
                            value="aisNo"
                            checked={formData.ais === 'aisNo' ? 'checked' : ''}
                            onChange={(e) => handleChange(e)}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="ais-no">
                            No
                          </label>
                        </div>
                      </div>
                    </div>

                    <div id="mmsi" className={`govuk-form-group ${errors.hasMMSI ? 'govuk-form-group--error' : ''}`}>
                      <label className="govuk-label" htmlFor="mmsi">
                        Does this pleasure craft have a Maritime Mobile Service Identify number (MMSI)?
                      </label>
                      <div className="govuk-radios" data-module="govuk-radios">
                        <FormFieldError error={errors.hasMMSI} />
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            id="mmsi-yes"
                            name="hasMMSI"
                            type="radio"
                            value="mmsiYes"
                            checked={formData.hasMMSI === 'mmsiYes' ? 'checked' : ''}
                            onChange={(e) => handleChange(e)}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="mmsi-yes">
                            Yes
                          </label>
                        </div>
                        {formData.hasMMSI === 'mmsiYes' && (
                        <div className="govuk-radios__conditional" id="conditional-mmsi">
                          <div className={`govuk-form-group ${errors.mmsi ? 'govuk-form-group--error' : ''}`}>
                            <label className="govuk-label" htmlFor="mmsi-input">
                              MMSI number
                            </label>
                            <FormFieldError error={errors.mmsi} />
                            <input
                              id="mmsi-input"
                              className="govuk-input"
                              name="mmsi"
                              type="text"
                              value={formData.hasMMSI === 'mmsiYes' ? formData.mmsi : ''}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        )}
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            id="mmsi-no"
                            name="hasMMSI"
                            type="radio"
                            value="mmsiNo"
                            checked={formData.hasMMSI === 'mmsiNo' ? 'checked' : ''}
                            onChange={(e) => handleChange(e)}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="mmsi-no">
                            No
                          </label>
                        </div>
                      </div>
                    </div>

                    <div id="callsign" className={`govuk-form-group ${errors.hasCallsign ? 'govuk-form-group--error' : ''}`}>
                      <label className="govuk-label" htmlFor="callsign">
                        Does this pleasure craft have a callsign?
                      </label>
                      <div className="govuk-radios" data-module="govuk-radios">
                        <FormFieldError error={errors.hasCallsign} />
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            id="callsign-yes"
                            name="hasCallsign"
                            type="radio"
                            value="callsignYes"
                            checked={formData.hasCallsign === 'callsignYes' ? 'checked' : ''}
                            onChange={(e) => handleChange(e)}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="callsign-yes">
                            Yes
                          </label>
                        </div>
                        {formData.hasCallsign === 'callsignYes' && (
                        <div className="govuk-radios__conditional" id="conditional-callsign">
                          <div className={`govuk-form-group ${errors.callsign ? 'govuk-form-group--error' : ''}`}>
                            <label className="govuk-label" htmlFor="callsign-input">
                              Call sign
                            </label>
                            <FormFieldError error={errors.callsign} />
                            <input
                              id="callsign-input"
                              className="govuk-input"
                              name="callsign"
                              type="text"
                              value={formData.hasCallsign === 'callsignYes' ? formData.callsign : ''}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        )}
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            id="callsign-no"
                            name="hasCallsign"
                            type="radio"
                            value="callsignNo"
                            checked={formData.hasCallsign === 'callsignNo' || formData.callsign === '' ? 'checked' : ''}
                            onChange={(e) => handleChange(e)}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="callsign-no">
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
