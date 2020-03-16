import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserResendCode = () => {
  const [formData, setFormData] = useState({ email: JSON.parse(localStorage.getItem('email')) });
  const [errors, setErrors] = useState({});

  const removeError = (fieldName) => {
    const tempArr = { ...errors };
    const key = fieldName;
    delete tempArr[key];
    setErrors(tempArr);
  };

  // Update form info to state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    removeError(e.target.name);
  };
  // Ensure all required fields have a value
  const checkRequiredFields = () => {
    if (!formData.email) {
      setErrors({ ...errors, main: 'You must enter your code or click the link below to generate a new one' });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure required fields have a value
    if (checkRequiredFields() === true) {
      axios.patch(`${apiPath}/submit-verification-code`, formData)
        .then((resp) => {
          console.log(resp);
          history.push('/verify');
        })
        .catch((err) => {
          if (err.response) {
            switch (err.response.status) {
              case 400: setErrors({ ...errors, email: 'Code is invalid' }); break;
              default: false;
            }
          }
        });
    }
  };
  return (
    <div className="govuk-width-container">
    <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1 className="govuk-heading-xl">Request a new multi-factor authentication code</h1>
          <p className="govuk-body-l">
            Due to the nature of the data used and transmitted by the Submit an Advanced Voyage Report Service, we require users to register for multi-factor authentication to ensure the security of the system.
          </p>
          <form>
            <div id="email" className={`govuk-form-group ${errors.email ? 'govuk-form-group--error' : ''}`}>
              <label className="govuk-label govuk-label--m" htmlFor="email">
                Email address
              </label>{errors.email
                && (
                <span className="govuk-error-message">
                  <span className="govuk-visually-hidden">Error:</span> {errors.email}
                </span>
                )
              }
              <input
                className="govuk-input"
                name="email"
                type="text"
                value={formData.email ? formData.email : null}
                onChange={(e) => handleChange(e)}
              />
            <div id="mobileNumber" className={`govuk-form-group ${errors.mobileNumber ? 'govuk-form-group--error' : ''}`}>
              <label className="govuk-label govuk-label--m" htmlFor="mobileNumber">
                mobileNumber address
              </label>{errors.mobileNumber
                && (
                <span className="govuk-error-message">
                  <span className="govuk-visually-hidden">Error:</span> {errors.mobileNumber}
                </span>
                )
              }
              <input
                className="govuk-input"
                name="mobileNumber"
                type="text"
                value={formData.mobileNumber ? formData.mobileNumber : null}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <button
              type="submit"
              className="govuk-button"
              onClick={(e) => handleSubmit(e)}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </main>
  </div>
  );
};

export default UserResendCode;
