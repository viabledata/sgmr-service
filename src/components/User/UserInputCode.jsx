import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

// app imports
import Auth from '@lib/Auth';
import { SUBMIT_VERIFICATION_CODE_URL } from '@constants/ApiConstants';

const UserInputCode = () => {
  const history = useHistory();
  const urlParams = location.search.split('source=');
  const [source, setSource] = useState();
  const [formData, setFormData] = useState({});
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
    if (checkRequiredFields() === true && source === 'registration') {
      axios.patch(SUBMIT_VERIFICATION_CODE_URL, formData)
        .then(() => {
          history.push(`/sign-in?source=${source}`);
        })
        .catch((err) => {
          if (err.response) {
            switch (err.response.status) {
              case 400: setErrors({ ...errors, twoFactorToken: 'Something is wrong' }); break;
              case 401: setErrors({ ...errors, twoFactorToken: 'Code is invalid' }); break;
              case 409: setErrors({ ...errors, twoFactorToken: 'Already verified, login' }); break;
              default: false;
            }
          }
        });
    } else {
      axios.post(SUBMIT_VERIFICATION_CODE_URL, formData)
        .then((resp) => {
          if (resp.data.token) { Auth.storeToken(resp.data.token); }
          history.push(`/${source}`);
        })
        .catch((err) => {
          if (err.response) {
            switch (err.response.status) {
              case 400: setErrors({ ...errors, twoFactorToken: 'Something is wrong' }); break;
              case 401: setErrors({ ...errors, twoFactorToken: 'Code is invalid' }); break;
              case 409: setErrors({ ...errors, twoFactorToken: 'Already verified, login' }); break;
              default: false;
            }
          }
        });
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      // If user attempts to 'go back' to this page while they have a token active it will redirect to reports
      history.push('/reports');
    } else {
      setFormData({ email: JSON.parse(localStorage.getItem('email')) });
      setSource(urlParams[1]);
    }
  }, []);

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-xl">Enter your access code</h1>
            <p className="govuk-body-l">
              To ensure security we have sent a 5-digit code to your mobile number. It may take a few minutes to arrive.
            </p>
            <form>
              <div id="twoFactorToken" className={`govuk-form-group ${errors.twoFactorToken ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label govuk-label--m" htmlFor="twoFactorToken">
                  Access code
                </label>
                <span className="govuk-hint">Please enter the code you received</span>
                {errors.twoFactorToken
                  && (
                  <span className="govuk-error-message">
                    <span className="govuk-visually-hidden">Error:</span>
                    {' '}
                    {errors.twoFactorToken}
                  </span>
                  )}
                <input
                  className="govuk-input govuk-input--width-5"
                  name="twoFactorToken"
                  type="text"
                  onChange={handleChange}
                />
                <p className="govuk-body">
                  <Link to={`/resend-code?source=${source}`}>Problems receiving this code?</Link>
                </p>
              </div>
              <button
                type="submit"
                className="govuk-button"
                onClick={handleSubmit}
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
