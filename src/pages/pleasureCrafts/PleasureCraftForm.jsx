import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import FormFieldError from '../../components-v2/FormFieldError';
import { PLEASURE_CRAFT_PAGE_URL } from '../../constants/ClientConstants';
import removeError from '../../utils/errorHandlers';
import scrollToTop from '../../utils/scrollToTop';
import validate from '../../utils/validateFormData';
import PleasureCraftValidation from './PleasureCraftValidation';

const PleasureCraftForm = ({ type }) => {
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(JSON.parse(sessionStorage.getItem('formData')) || {});
  const [formPageIs, setFormPageIs] = useState(1);
  const sourcePage = PLEASURE_CRAFT_PAGE_URL;
  // const [sourcePage, setSourcePage] = useState(PLEASURE_CRAFT_PAGE_URL);
  const title = 'Add a pleasure craft';
  // const [title, setTitle] = useState('Add a pleasure craft');

  document.title = type === 'edit' ? 'Edit pleasure craft' : 'Save pleasure craft';
  const pleasureCraftTypeOther = formData.pleasureCraftType !== undefined && formData.pleasureCraftType !== 'sailingboat' && formData.pleasureCraftType !== 'motorboat';

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
        nextPageUrl = `/pleasure-craft/${type || 'save'}-pleasure-craft/page-${formPageIs + 1}`;
        break;
      case 'previousFormPageIs':
        nextPageUrl = `/pleasure-craft/${type || 'save'}-pleasure-craft/page-${formPageIs - 1}`;
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
            </div>
          </div>
        </div>
      </main>
    </div>

  );
};

export default PleasureCraftForm;
