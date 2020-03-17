import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

// app imports
import { apiPath } from 'config';

const UserResendCode = () => {
  const history = useHistory();
  const urlParams = location.search.split('source=');
  const [source, setSource] = useState();
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
    if (checkRequiredFields() === true && source === 'registration') {
      axios.patch(`${apiPath}/resend-verification-code`, formData)
        .then((resp) => {
          history.push(`/verify?source=${source}`);
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
      axios.post(`${apiPath}/resend-verification-code`, formData)
        .then((resp) => {
          history.push(`/verify?source=${source}`);
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
    // setFormData({ email: JSON.parse(localStorage.getItem('email')) });
    setSource(urlParams[1]);
  }, []);


  return (
    <div className="govuk-width-container">
    <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1 className="govuk-heading-xl">Request a new multi-factor authentication code</h1>
          <p className="govuk-body-l">
            Due to the nature of the data used and transmitted by the Submit an Advanced Voyage Report Service, we require users to register for multi-factor authentication to ensure the security of the system.
          </p>

          {Object.keys(errors).length > 0 && (
            <div className="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabIndex="-1" data-module="govuk-error-summary">
              <h2 className="govuk-error-summary__title" >
                There is a problem
              </h2>
              <div className="govuk-error-summary__body">
                <ul className="govuk-list govuk-error-summary__list">
                  {Object.entries(errors).map((elem, i) => (
                    <li key={i}>
                      {elem[0] !== 'title'
                          && <a href={`#${elem[0]}`}>{elem[1]}</a>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}


          <form>
            <div id="email" className="govuk-form-group">
              <label className="govuk-label govuk-label--m" htmlFor="email">
                Email address
              </label>
              <input
                className="govuk-input"
                name="email"
                type="text"
                value={formData.email ? formData.email : ''}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div id="mobileNumber" className="govuk-form-group">
              <label className="govuk-label govuk-label--m" htmlFor="mobileNumber">
                Mobile number
              </label>
              <input
                className="govuk-input"
                name="mobileNumber"
                type="text"
                value={formData.mobileNumber ? formData.mobileNumber : ''}
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
