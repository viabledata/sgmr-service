import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import FormFieldError from '../../components-v2/FormFieldError';
import { PLEASURE_CRAFT_PAGE_URL } from '../../constants/ClientConstants';
import removeError from '../../utils/errorHandlers';
import scrollToTop from '../../utils/scrollToTop';
import validate from '../../utils/validateFormData';
import PleasureCraftValidation from './PleasureCraftValidation';

const PleasureCraftForm = ({ type }) => {
  const history = useHistory();
  const location = useLocation();
  const locationPath = location.pathname;
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(JSON.parse(sessionStorage.getItem('formData')) || {});
  const [formPageIs, setFormPageIs] = useState(1);
  const sourcePage = PLEASURE_CRAFT_PAGE_URL;
  // const [sourcePage, setSourcePage] = useState(PLEASURE_CRAFT_PAGE_URL);
  const title = 'Add a pleasure craft';
  // const [title, setTitle] = useState('Add a pleasure craft');

  document.title = type === 'edit' ? 'Edit pleasure craft' : 'Save pleasure craft';
  const pleasureCraftTypeOther = formData.pleasureCraftType !== undefined && formData.pleasureCraftType !== 'sailingboat' && formData.pleasureCraftType !== 'motorboat';
  const pleasureCraftMMSIYes = formData.pleasureCraftMMSI !== undefined && formData.pleasureCraftMMSI !== 'No';
  const pleasureCraftCallSignYes = formData.pleasureCraftCallSign !== undefined && formData.pleasureCraftCallSign !== 'No';
  const pleasureCraftRegistrationCountryYes = formData.pleasureCraftRegistrationCountry !== undefined && formData.pleasureCraftRegistrationCountry !== 'No';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
  };

  useEffect(() => {
    setErrors({}); // always clear errors when changing page
    setFormPageIs(parseInt(locationPath.split('page-').pop(), 10));
    scrollToTop();
  }, [locationPath]);

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
                    <div id="pleasureCraftType" className={`govuk-form-group ${errors.pleasureCraftType ? 'govuk-form-group--error' : ''}`}>
                      <fieldset className="govuk-fieldset">
                        <legend className="govuk-fieldset__legend">
                          <label className="govuk-fieldset__heading" htmlFor="pleasureCraftType">
                            Type of pleasure craft
                          </label>
                        </legend>
                        <div className="govuk-radios govuk-radios">
                          <FormFieldError error={errors.pleasureCraftType} />
                          <div className="govuk-radios__item">
                            <input
                              className="govuk-radios__input"
                              name="pleasureCraftType"
                              id="sailingboat"
                              type="radio"
                              value="sailingboat"
                              checked={formData.pleasureCraftType === 'sailingboat' ? 'checked' : ''}
                              onChange={handleChange}
                            />
                            <label className="govuk-label govuk-radios__label" htmlFor="sailingboat">
                              Sailing boat (with or without an engine)
                            </label>
                          </div>
                          <div className="govuk-radios__item">
                            <input
                              className="govuk-radios__input"
                              name="pleasureCraftType"
                              id="motorboat"
                              type="radio"
                              value="motorboat"
                              checked={formData.pleasureCraftType === 'motorboat' ? 'checked' : ''}
                              onChange={handleChange}
                            />
                            <label className="govuk-label govuk-radios__label" htmlFor="motorboat">
                              Motorboat
                            </label>
                          </div>
                          <div className="govuk-radios__item">
                            <input
                              className="govuk-radios__input"
                              name="pleasureCraftType"
                              id="otherCraft"
                              type="radio"
                              value=""
                              checked={pleasureCraftTypeOther ? 'checked' : ''}
                              onChange={handleChange}
                            />
                            <label className="govuk-label govuk-radios__label" htmlFor="otherCraft">
                              Other
                            </label>
                          </div>
                          {pleasureCraftTypeOther && (
                          <div className="govuk-form-group">
                            <label className="govuk-label" htmlFor="pleasureCraftType-other">
                              Please specify
                              <input
                                className="govuk-input"
                                name="pleasureCraftType"
                                type="text"
                                value={pleasureCraftTypeOther ? formData.pleasureCraftType : ''}
                                onChange={handleChange}
                              />
                            </label>
                          </div>
                          )}
                        </div>
                      </fieldset>
                    </div>
                    <div id="pleasureCraftMooring" className={`govuk-form-group ${errors.pleasureCraftMooring ? 'govuk-form-group--error' : ''}`}>
                      <label className="govuk-label" htmlFor="pleasureCraftMooringInput">
                        Usual moorings
                      </label>
                      <div id="pleasureCraftMooring-hint" className="govuk-hint">A description, UNLOCODE or set of Coordinates for where the pleasure craft is usually moored</div>
                      <FormFieldError error={errors.pleasureCraftMooring} />
                      <input
                        id="pleasureCraftMooringInput"
                        className="govuk-input"
                        name="pleasureCraftMooring"
                        type="text"
                        value={formData?.pleasureCraftMooring || ''}
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
                  <div id="pleasureCraftRegistrationNumber" className={`govuk-form-group ${errors.pleasureCraftRegistrationNumber ? 'govuk-form-group--error' : ''}`}>
                    <label className="govuk-label" htmlFor="pleasureCraftRegistrationNumberInput">
                      Registration number
                    </label>
                    <FormFieldError error={errors.pleasureCraftRegistrationNumber} />
                    <input
                      id="pleasureCraftRegistrationNumberInput"
                      className="govuk-input"
                      name="pleasureCraftRegistrationNumber"
                      type="text"
                      value={formData?.pleasureCraftRegistrationNumber || ''}
                      onChange={handleChange}
                    />
                  </div>

                  <div id="pleasureCraftRegistrationCountry" className={`govuk-form-group ${errors.pleasureCraftRegistrationCountry ? 'govuk-form-group--error' : ''}`}>
                    <fieldset className="govuk-fieldset">
                      <legend className="govuk-fieldset__legend">
                        <label className="govuk-fieldset__heading" htmlFor="pleasureCraftRegistrationCountry">
                          Does this pleasure craft have a Country of Registration?
                        </label>
                      </legend>
                      <div className="govuk-radios govuk-radios">
                        <FormFieldError error={errors.pleasureCraftRegistrationCountry} />
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            name="pleasureCraftRegistrationCountry"
                            id="pleasureCraftRegistrationCountry-yes"
                            type="radio"
                            value="Yes"
                            checked={formData.pleasureCraftRegistrationCountry === 'Yes' ? 'checked' : ''}
                            onChange={handleChange}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="pleasureCraftRegistrationCountry-yes">
                            Yes
                          </label>
                        </div>
                        {pleasureCraftRegistrationCountryYes && (
                        <div className="govuk-form-group">
                          <label className="govuk-label" htmlFor="pleasureCraftRegistrationCountry-number">
                            Country of registration
                            <input
                              className="govuk-input"
                              name="pleasureCraftRegistrationCountryNumber"
                              type="text"
                              defaultValue={pleasureCraftRegistrationCountryYes ? formData.pleasureCraftRegistrationCountryNumber : ''}
                              onChange={handleChange}
                            />
                          </label>
                        </div>
                        )}
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            name="pleasureCraftRegistrationCountry"
                            id="pleasureCraftRegistrationCountry-no"
                            type="radio"
                            value="No"
                            checked={formData.pleasureCraftRegistrationCountry === 'No' ? 'checked' : ''}
                            onChange={handleChange}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="pleasureCraftRegistrationCountry-no">
                            No
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>

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
                            id="pleasureCraftAIS-yes"
                            type="radio"
                            value="Yes"
                            checked={formData.pleasureCraftAIS === 'Yes' ? 'checked' : ''}
                            onChange={handleChange}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="pleasureCraftAIS-yes">
                            Yes
                          </label>
                        </div>
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            name="pleasureCraftAIS"
                            id="pleasureCraftAIS-no"
                            type="radio"
                            value="No"
                            checked={formData.pleasureCraftAIS === 'No' ? 'checked' : ''}
                            onChange={handleChange}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="pleasureCraftAIS-no">
                            No
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>

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
                            id="pleasureCraftMMSI-yes"
                            type="radio"
                            value="Yes"
                            checked={formData.pleasureCraftMMSI === 'Yes' ? 'checked' : ''}
                            onChange={handleChange}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="pleasureCraftMMSI-yes">
                            Yes
                          </label>
                        </div>
                        {pleasureCraftMMSIYes && (
                          <div className="govuk-form-group">
                            <label className="govuk-label" htmlFor="pleasureCraftMMSI-number">
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
                            id="pleasureCraftMMSI-no"
                            type="radio"
                            value="No"
                            checked={formData.pleasureCraftMMSI === 'No' ? 'checked' : ''}
                            onChange={handleChange}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="pleasureCraftMMSI-no">
                            No
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>

                  <div id="pleasureCraftCallSign" className={`govuk-form-group ${errors.pleasureCraftCallSign ? 'govuk-form-group--error' : ''}`}>
                    <fieldset className="govuk-fieldset">
                      <legend className="govuk-fieldset__legend">
                        <label className="govuk-fieldset__heading" htmlFor="pleasureCraftCallSign">
                          Does this pleasure craft have a Call sign?
                        </label>
                      </legend>
                      <div className="govuk-radios govuk-radios">
                        <FormFieldError error={errors.pleasureCraftCallSign} />
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            name="pleasureCraftCallSign"
                            id="pleasureCraftCallSign-yes"
                            type="radio"
                            value="Yes"
                            checked={formData.pleasureCraftCallSign === 'Yes' ? 'checked' : ''}
                            onChange={handleChange}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="pleasureCraftCallSign-yes">
                            Yes
                          </label>
                        </div>
                        {pleasureCraftCallSignYes && (
                          <div className="govuk-form-group">
                            <label className="govuk-label" htmlFor="pleasureCraftCallSign-number">
                              Call sign
                              <input
                                className="govuk-input"
                                name="pleasureCraftCallSignNumber"
                                type="text"
                                defaultValue={pleasureCraftCallSignYes ? formData.pleasureCraftCallSignNumber : ''}
                                onChange={handleChange}
                              />
                            </label>
                          </div>
                        )}
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            name="pleasureCraftCallSign"
                            id="pleasureCraftCallSign-no"
                            type="radio"
                            value="No"
                            checked={formData.pleasureCraftCallSign === 'No' ? 'checked' : ''}
                            onChange={handleChange}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="pleasureCraftCallSign-no">
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
