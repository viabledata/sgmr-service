import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

// app imports
import Auth from 'Auth';
import { apiPath } from 'config';

const UserInputCode = () => {
  const urlParams = location.search.split('source=');
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
    if (!formData.twoFactorToken) {
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
          Auth.storeToken(resp.data.token);
          localStorage.remove('email');
          history.push('/reports');
        })
        .catch((err) => {
          if (err.response) {
            switch (err.response.status) {
              case 400: setErrors({ ...errors, twoFactorToken: 'Code is invalid' }); break;
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
            <h1 className="govuk-heading-xl">Confirm your multi-factor authentication code</h1>
            <p className="govuk-body-l">
              Due to the nature of the data used and transmitted by the Submit an Advanced Voyage Report Service, we require users to register for multi-factor authentication to ensure the security of the system.
            </p>
            <form>
              <div id="twoFactorToken" className={`govuk-form-group ${errors.twoFactorToken ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label govuk-label--m" htmlFor="twoFactorToken">
                  Authentication code
                </label>
                <span className="govuk-hint">Please enter the code you received</span>
                {errors.twoFactorToken
                  && (
                  <span className="govuk-error-message">
                    <span className="govuk-visually-hidden">Error:</span> {errors.twoFactorToken}
                  </span>
                  )
                }
                <input
                  className="govuk-input"
                  name="twoFactorToken"
                  type="text"
                  onChange={(e) => handleChange(e)}
                />
                <p className="govuk-body">
                  <Link to='/resend-code'>Didn't receive a code?</Link>
                </p>
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

export default UserInputCode;
