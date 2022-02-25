import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { validate } from '../../components/Forms/validationRules';
import FormFieldError from '../../components-v2/FormFieldError';
import { PEOPLE_PAGE_URL } from '../../constants/ClientConstants';
import scrollToTop from '../../utils/scrollToTop';
import nationalities from '../../utils/staticFormData';
import PeopleValidation from './PeopleValidation';

const PersonForm = ({ source, type }) => {
  const history = useHistory();
  const location = useLocation();
  const locationPath = location.pathname;
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});
  const [formPageIs, setFormPageIs] = useState(1);
  const [submittedNextPage, setSubmittedNextPage] = useState(PEOPLE_PAGE_URL);
  const [title, setTitle] = useState();

  document.title = 'Save person';
  const documentTypeOther = formData.documentType !== undefined && formData.documentType !== 'Passport' && formData.documentType !== 'IdentityCard';

  const removeError = (fieldName) => {
    const errorList = { ...errors };
    let key;
    if (fieldName.includes('dateOfBirth')) {
      key = 'dateOfBirth';
    } else if (fieldName.includes('documentExpiryDate')) {
      key = 'documentExpiryDateYes';
    } else {
      key = fieldName;
    }
    delete errorList[key];
    setErrors(errorList);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    removeError(e.target.name);
  };

  const handleErrorClick = (e, id) => {
    e.preventDefault();
    const scrollToError = document.getElementById(id);
    scrollToError.scrollIntoView();
  };

  const validateForm = async () => {
    const newErrors = await validate(PeopleValidation[`page${formPageIs}`], formData);
    setErrors(newErrors);
    scrollToTop(newErrors);
    return Object.keys(newErrors).length > 0;
  };

  const goToNextPage = async (e, { url, runValidation }) => {
    e.preventDefault();
    let nextPageUrl;
    switch (url) {
      case 'nextFormPageIs':
        nextPageUrl = `/people/${type || 'save'}-person/page-${formPageIs + 1}`;
        break;
      case 'previousFormPageIs':
        nextPageUrl = `/people/${type || 'save'}-person/page-${formPageIs - 1}`;
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
    if (!await validateForm()) {
      history.push(submittedNextPage);
    }
  };

  useEffect(() => {
    switch (source) {
      case 'onboarding':
        setTitle('Add details of a person you frequently sail with');
        break;
      case 'voyage':
        setTitle('Add details of the person you are sailing with');
        break;
      case 'edit':
        setTitle('Update details of the person you sail with');
        setSubmittedNextPage(PEOPLE_PAGE_URL);
        break;
      default:
        setTitle('Add details of the person you frequently sail with');
        setSubmittedNextPage(PEOPLE_PAGE_URL);
    }
  }, [source]);

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
                  <div id="firstName" className={`govuk-form-group ${errors.firstName ? 'govuk-form-group--error' : ''}`}>
                    <label className="govuk-label" htmlFor="firstNameInput">
                      Given name(s)
                    </label>
                    <div id="firstName-hint" className="govuk-hint">The person&apos;s first and middle names</div>
                    <FormFieldError error={errors.firstName} />
                    <input
                      id="firstNameInput"
                      className="govuk-input"
                      name="firstName"
                      type="text"
                      value={formData?.firstName || ''}
                      onChange={(e) => { handleChange(e); }}
                    />
                  </div>
                  <div id="lastName" className={`govuk-form-group ${errors.lastName ? 'govuk-form-group--error' : ''}`}>
                    <label className="govuk-label" htmlFor="lastNameInput">
                      Surname
                    </label>
                    <div id="lastName-hint" className="govuk-hint">If the person has more than one surname, enter them all</div>
                    <FormFieldError error={errors.lastName} />
                    <input
                      id="lastNameInput"
                      className="govuk-input"
                      name="lastName"
                      type="text"
                      value={formData?.lastName || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div id="dateOfBirth" className={`govuk-form-group ${errors.dateOfBirth ? 'govuk-form-group--error' : ''}`}>
                    <label className="govuk-label" htmlFor="dateOfBirthDay">
                      Date of birth
                    </label>
                    <div id="dateOfBirth-hint" className="govuk-hint">Enter this as shown on your passport, for example, 31 03 1980</div>
                    <FormFieldError error={errors.dateOfBirth} />
                    <div className="govuk-date-input">
                      <div className="govuk-date-input__item">
                        <div className="govuk-form-group">
                          <label className="govuk-label govuk-date-input__label" htmlFor="dateOfBirthDay">
                            Day
                          </label>
                          <input
                            className="govuk-input govuk-date-input__input govuk-input--width-2"
                            name="dateOfBirthDay"
                            id="dateOfBirthDay"
                            type="text"
                            maxLength={2}
                            autoComplete="bday-day"
                            pattern="[0-9]*"
                            inputMode="numeric"
                            value={formData?.dateOfBirthDay || ''}
                            onChange={(handleChange)}
                          />
                        </div>
                      </div>
                      <div className="govuk-date-input__item">
                        <div className="govuk-form-group">
                          <label className="govuk-label govuk-date-input__label" htmlFor="dateOfBirthMonth">
                            Month
                          </label>
                          <input
                            className="govuk-input govuk-date-input__input govuk-input--width-2"
                            name="dateOfBirthMonth"
                            id="dateOfBirthMonth"
                            type="text"
                            maxLength={2}
                            autoComplete="bday-month"
                            pattern="[0-9]*"
                            inputMode="numeric"
                            value={formData?.dateOfBirthMonth || ''}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="govuk-date-input__item">
                        <div className="govuk-form-group">
                          <label className="govuk-label" htmlFor="dateOfBirthYear">
                            Year
                          </label>
                          <input
                            className="govuk-input govuk-date-input__input govuk-input--width-4"
                            name="dateOfBirthYear"
                            id="dateOfBirthYear"
                            type="text"
                            maxLength={4}
                            autoComplete="bday-year"
                            pattern="[0-9]*"
                            inputMode="numeric"
                            value={formData?.dateOfBirthYear || ''}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
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
                  </div>
                </>
                )}
              {formPageIs === 2
              && (
                <>
                  <h1 className="govuk-heading-l">Travel document details</h1>
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
                  <div className={`govuk-form-group ${errors.documentType ? 'govuk-form-group--error' : ''}`}>
                    <fieldset id="documentType" className="govuk-fieldset">
                      <legend className="govuk-fieldset__legend govuk-fieldset__legend">Select a travel document type</legend>
                      <div id="documentType-hint" className="govuk-hint">
                        Read advice on
                        {' '}
                        <a href="https://www.gov.uk/uk-border-control" target="_blank" rel="noreferrer" className="govuk-link">Entering the UK</a>
                      </div>
                      <FormFieldError error={errors.documentType} />
                      <div className="govuk-radios" data-module="govuk-radios">
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            id="documentTypePassport"
                            name="documentType"
                            type="radio"
                            value="Passport"
                            checked={formData.documentType === 'Passport' ? 'checked' : ''}
                            onChange={(e) => { handleChange(e); }}
                            data-aria-controls="documentTypePassport"
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="documentTypePassport">
                            Passport
                          </label>
                        </div>
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            id="documentTypeIdentityCard"
                            name="documentType"
                            type="radio"
                            value="IdentityCard"
                            checked={formData.documentType === 'IdentityCard' ? 'checked' : ''}
                            onChange={(e) => { handleChange(e); }}
                            data-aria-controls="documentTypeIdentityCard"
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="documentTypeIdentityCard">
                            Identity card
                          </label>
                        </div>
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            id="documentTypeOther"
                            name="documentType"
                            type="radio"
                            value=""
                            checked={documentTypeOther ? 'checked' : ''}
                            onChange={(e) => { handleChange(e); }}
                            data-aria-controls="documentTypeOther"
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="documentTypeOther">
                            Another travel document
                          </label>
                        </div>
                        {documentTypeOther && (
                        <div className="govuk-form-group">
                          <label className="govuk-label" htmlFor="documentType-other">
                            Please specify
                            <input
                              className="govuk-input"
                              name="documentType"
                              type="text"
                              value={documentTypeOther ? formData.documentType : ''}
                              onChange={handleChange}
                            />
                          </label>
                        </div>
                        )}
                      </div>
                    </fieldset>
                  </div>
                  <div id="documentNumber" className={`govuk-form-group ${errors.documentNumber ? 'govuk-form-group--error' : ''}`}>
                    <label className="govuk-label" htmlFor="documentNumberInput">
                      Travel document number
                    </label>
                    <div id="documentNumber-hint" className="govuk-hint">This can contain letters and numbers. For example, 120382978A</div>
                    <FormFieldError error={errors.documentNumber} />
                    <input
                      id="documentNumberInput"
                      className="govuk-input"
                      name="documentNumber"
                      type="text"
                      value={formData?.documentNumber || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div id="nationality" className={`govuk-form-group ${errors.nationality ? 'govuk-form-group--error' : ''}`}>
                    <label className="govuk-label" htmlFor="nationality">
                      Nationality
                    </label>
                    <FormFieldError error={errors.nationality} />
                    <select
                      className="govuk-select"
                      name="nationality"
                      type="text"
                      value={formData.nationality || 'Please select'}
                      onChange={handleChange}
                    >
                      <option disabled>Please select</option>
                      {nationalities.map((nationality) => (
                        <option key={nationality.id} value={nationality.value}>{nationality.label}</option>
                      ))}
                    </select>
                  </div>
                  <div id="documentExpiryDate" className={`govuk-form-group ${errors.documentExpiryDate ? 'govuk-form-group--error' : ''}`}>
                    <fieldset className="govuk-fieldset" aria-describedby="expiry-date-hint">
                      <legend className="govuk-fieldset__legend govuk-fieldset__legend">Does your document have an expiry date?</legend>
                      <FormFieldError error={errors.documentExpiryDate} />
                      <div className="govuk-radios" data-module="govuk-radios">
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            id="documentExpiryDateYes"
                            name="documentExpiryDate"
                            type="radio"
                            value="documentExpiryDateYes"
                            aria-controls="documentExpiryDateYes"
                            checked={formData.documentExpiryDate === 'documentExpiryDateYes' ? 'checked' : ''}
                            onChange={(e) => { handleChange(e); }}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="documentExpiryDateYes">
                            Yes
                          </label>
                        </div>
                        {formData.documentExpiryDate === 'documentExpiryDateYes' && (
                        <div className="govuk-radios__conditional" id="documentExpiryDate">
                          <div className="govuk-form-group">
                            <fieldset className="govuk-fieldset" aria-describedby="documentExpiryDate-hint" role="group">
                              <legend className="govuk-fieldset__legend"> Expiry date</legend>
                              <div id="documentExpiryDate-hint" className="govuk-hint">For example 31 03 1980</div>
                              <div className="govuk-date-input" id="documentExpiryDate">
                                <div className="govuk-date-input__item">
                                  <div className="govuk-form-group">
                                    <label className="govuk-label govuk-date-input__label" htmlFor="documentExpiryDateDay">Day</label>
                                    <input
                                      className="govuk-input govuk-date-input__input govuk-input--width-2"
                                      name="documentExpiryDateDay"
                                      id="documentExpiryDateDay"
                                      type="text"
                                      maxLength={2}
                                      pattern="[0-9]*"
                                      inputMode="numeric"
                                      value={formData?.documentExpiryDateDay || ''}
                                      onChange={(handleChange)}
                                    />
                                  </div>
                                </div>
                                <div className="govuk-date-input__item">
                                  <div className="govuk-form-group">
                                    <label className="govuk-label govuk-date-input__label" htmlFor="documentExpiryDateMonth">Month</label>
                                    <input
                                      className="govuk-input govuk-date-input__input govuk-input--width-2"
                                      name="documentExpiryDateMonth"
                                      id="documentExpiryDateMonth"
                                      type="text"
                                      maxLength={2}
                                      pattern="[0-9]*"
                                      inputMode="numeric"
                                      value={formData?.documentExpiryDateMonth || ''}
                                      onChange={(handleChange)}
                                    />
                                  </div>
                                </div>
                                <div className="govuk-date-input__item">
                                  <div className="govuk-form-group">
                                    <label className="govuk-label govuk-date-input__label" htmlFor="documentExpiryDateYear">Year</label>
                                    <input
                                      className="govuk-input govuk-date-input__input govuk-input--width-4"
                                      name="documentExpiryDateYear"
                                      id="documentExpiryDateYear"
                                      type="text"
                                      maxLength={4}
                                      pattern="[0-9]*"
                                      inputMode="numeric"
                                      value={formData?.documentExpiryDateYear || ''}
                                      onChange={handleChange}
                                    />
                                  </div>
                                </div>
                              </div>
                            </fieldset>
                          </div>
                        </div>
                        )}
                        <div className="govuk-radios__item">
                          <input
                            className="govuk-radios__input"
                            id="documentExpiryDateNo"
                            name="documentExpiryDate"
                            type="radio"
                            value="documentExpiryDateNo"
                            data-aria-controls="documentExpiryDateNo"
                            checked={formData.documentExpiryDate === 'documentExpiryDateNo' ? 'checked' : ''}
                            onChange={(e) => { handleChange(e); }}
                          />
                          <label className="govuk-label govuk-radios__label" htmlFor="documentExpiryDateNo">
                            No
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  <div className="govuk-button-group">
                    <button
                      type="button"
                      className="govuk-button"
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
                </>
              )}
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default PersonForm;
