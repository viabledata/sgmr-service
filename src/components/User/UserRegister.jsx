import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { REGISTRATION_URL } from '../../constants/ApiConstants';
import UserRegisterValidation from './UserRegisterValidation';
import { postData } from '../../utils/apiHooks';
import scrollToTopOnError from '../../utils/scrollToTopOnError';
import FormError from '../Voyage/FormError';
import PasswordField from './PasswordField';

const UserRegister = () => {
  document.title = 'Create an account';

  const pageName = 'userRegister';
  const history = useHistory();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const removeError = (fieldName) => {
    const errorArray = { ...errors };
    const key = fieldName;
    delete errorArray[key];
    delete errorArray[pageName];
    setErrors(errorArray);
  };

  // Update form info to state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    removeError(e.target.name);
  };

  // Format data to submit
  const formatData = (data) => {
    return {
      firstName: data.firstName,
      lastName: data.lastName,
      mobileNumber: data.mobileNumber,
      email: data.email.toLowerCase(),
      password: data.password,
    };
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(UserRegisterValidation(formData));
    if (Object.keys(UserRegisterValidation(formData)).length === 0 && Object.keys(errors).length === 0) {
      postData(REGISTRATION_URL, formatData(formData))
        .then((resp) => {
          if (!resp.errors) {
            history.push(`/registration-confirmation?email=${formData.email}`);
          } else {
            setErrors({ userRegister: resp.message });
            scrollToTopOnError(resp.message);
          }
        });
    }
  };

  return (
    <div id="pageContainer" className="govuk-width-container ">
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        role="none"
        className="govuk-back-link"
        onClick={(e) => {
          e.preventDefault();
          history.goBack();
        }}
      >
        Back
      </a>
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-xl">Create an account</h1>
            <form onSubmit={handleSubmit}>
              {Object.keys(errors).length > 0 && (
                <div className="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabIndex="-1" data-module="govuk-error-summary">
                  <h2 className="govuk-error-summary__title">
                    There is a problem
                  </h2>
                  <FormError error={errors.userRegister} />
                </div>
              )}

              <div id="firstName" className={`govuk-form-group ${errors.firstName ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label" htmlFor="firstName-field">
                  First name
                </label>
                <FormError error={errors.firstName} />
                <input
                  id="firstName-field"
                  className="govuk-input"
                  name="firstName"
                  type="text"
                  value={formData.firstName || ''}
                  onChange={handleChange}
                />
              </div>

              <div id="lastName" className={`govuk-form-group ${errors.lastName ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label" htmlFor="lastName-field">
                  Last name
                </label>
                <FormError error={errors.lastName} />
                <input
                  id="lastName-field"
                  className="govuk-input"
                  name="lastName"
                  type="text"
                  value={formData.lastName || ''}
                  onChange={handleChange}
                />
              </div>

              <div id="mobileNumber" className={`govuk-form-group ${errors.mobileNumber ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label" htmlFor="mobileNumber-field">
                  Mobile number
                </label>
                <FormError error={errors.mobileNumber} />
                <span className="govuk-hint">We will send an access code to this number. For international numbers include the country code.</span>
                <input
                  id="mobileNumber-field"
                  className="govuk-input"
                  name="mobileNumber"
                  type="text"
                  value={formData.mobileNumber || ''}
                  onChange={handleChange}
                />
              </div>
              <div id="email" className={`govuk-form-group ${errors.email ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label" htmlFor="email-field">
                  Email address
                </label>
                <FormError error={errors.email} />
                <span className="govuk-hint">You will use this to sign into your account.</span>
                <input
                  id="email-field"
                  className="govuk-input"
                  name="email"
                  type="text"
                  value={formData.email || ''}
                  onChange={handleChange}
                />
              </div>

              <div id="confirmEmail" className={`govuk-form-group ${errors.confirmEmail ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label" htmlFor="confirmEmail-field">
                  Confirm email address
                </label>
                <FormError error={errors.confirmEmail} />
                <input
                  id="confirmEmail-field"
                  className="govuk-input"
                  name="confirmEmail"
                  type="text"
                  value={formData.confirmEmail || ''}
                  onChange={handleChange}
                />
              </div>

              <PasswordField handleChange={handleChange} formData={formData} errors={errors} />

              <h2 className="govuk-heading-s">Declaration</h2>
              <p className="govuk-body">By creating this account, you agree:</p>
              <ul className="govuk-list govuk-list--bullet">
                <li>that the information you have provided is correct to the best of your knowledge</li>
                <li>
                  that you have read and accept our&nbsp;
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.gov.uk/government/publications/personal-information-use-in-borders-immigration-and-citizenship"
                  >
                    privacy policy
                  </a>
                </li>
              </ul>

              <button
                type="submit"
                className="govuk-button"
                data-module="govuk-button"
              >
                Agree and submit
              </button>

            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserRegister;
