import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// app imports
import { apiUrl } from 'config';


const UserRegister = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState(JSON.parse(localStorage.getItem('errors')) || {});

  const removeError = (fieldName) => {
    const tempArr = { ...errors };
    const key = fieldName;
    delete tempArr[key];
    setErrors(tempArr);
  };

  const handleErrors = (e, errorText, groupField) => {
    // For fields with multiple inputs in a single group
    const name = !groupField ? e.target.name : groupField;
    // Error onBlur if condition not met
    if (!e.target.value) { setErrors({ ...errors, [name]: errorText }); }
    switch (name) {
      case 'email':
        (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email))
          ? removeError('email')
          : setErrors({ ...errors, email: errorText });
        break;
      case 'confirmEmail':
        formData.email.toLowerCase() === formData.confirmEmail.toLowerCase()
          ? removeError('confirmEmail')
          : setErrors({ ...errors, confirmEmail: errorText });
        break;
      case 'password':
        formData.password.length < 8
          ? setErrors({ ...errors, password: 'Password is too short' })
          : removeError('password');
        break;
      case 'confirmPassword':
        formData.password === formData.confirmPassword
          ? removeError('confirmPassword')
          : setErrors({ ...errors, confirmPassword: errorText });
        break;
      default: null;
    }
  };

  // Update form info to state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    removeError(e.target.name);
  };

  // Handle Submit, including clearing localStorage
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if email addresses still match in our data, if they don't, set error
    if (formData.email.toLowerCase() !== formData.confirmEmail.toLowerCase()) {
      setErrors({ ...errors, confirmEmail: 'Your email addresses do not match' });
    }
    // Check if passwords still match in our data, if they don't, set error
    if (formData.password !== formData.confirmPassword) {
      setErrors({ ...errors, confirmPassword: 'Your passwords do not match' });
    }

    // If there are no errors, format data and submit to api
    if (Object.keys(errors).length === 0) {
      const dataSubmit = {
        email: formData.email.toLowerCase(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        mobileNumber: formData.mobileNumber,
        password: formData.password,
      };
      axios.post(`${apiUrl}/registration`, dataSubmit)
        .then((resp) => {
          history.push('/verify?source=registration');
          localStorage.setItem('email', JSON.stringify(formData.email));
        })
        .catch((err) => {
          switch (err.response.data.message) {
            case 'User already registered':
              setErrors({ ...errors, email: 'Email address already registered' });
              break;
            default: setErrors(err.response.data);
          }
        });
    }
  };

  // Clear local storage of formData & errors on pageload just incase
  useEffect(() => {
    localStorage.removeItem('formData');
    localStorage.removeItem('errors');
    localStorage.removeItem('email');
  }, []);


  return (
    <div id="pageContainer" className="govuk-width-container ">
      <a className="govuk-back-link" onClick={(e) => {
        e.preventDefault();
        history.goBack();
      }}>
        Back
      </a>
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-xl">Create an account</h1>
             <form>

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

              <div id="firstName" className={`govuk-form-group ${errors.firstName ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label govuk-label--m" htmlFor="firstName">
                  Given name
                </label>
                {errors.firstName
                  && (
                  <span className="govuk-error-message">
                    <span className="govuk-visually-hidden">Error:</span> {errors.firstName}
                  </span>
                  )
                }
                <input
                  className="govuk-input"
                  name="firstName"
                  type="text"
                  value={formData.firstName || ''}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleErrors(e, 'You must enter your given name')}
                />
              </div>

              <div id="lastName" className={`govuk-form-group ${errors.lastName ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label govuk-label--m" htmlFor="lastName">
                  Surname
                </label>
                {errors.lastName
                  && (
                  <span className="govuk-error-message">
                    <span className="govuk-visually-hidden">Error:</span> {errors.lastName}
                  </span>
                  )
                }
              <input
                  className="govuk-input"
                  name="lastName"
                  type="text"
                  value={formData.lastName || ''}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleErrors(e, 'You must enter your lastName')}
                />
              </div>

              <div id="mobileNumber" className={`govuk-form-group ${errors.mobileNumber ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label govuk-label--m" htmlFor="mobileNumber">
                  Mobile number
                </label>
                {errors.mobileNumber
                  && (
                  <span className="govuk-error-message">
                    <span className="govuk-visually-hidden">Error:</span> {errors.mobileNumber}
                  </span>
                  )
                }
                <span className="govuk-hint">You will be sent a verification token to this number.</span>
              <input
                  className="govuk-input"
                  name="mobileNumber"
                  type="text"
                  value={formData.mobileNumber || ''}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleErrors(e, 'You must enter your mobile number')}
                />
              </div>
              <div id="email" className={`govuk-form-group ${errors.email ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label govuk-label--m" htmlFor="email">
                  Email address
                </label>
                {errors.email
                  && (
                  <span className="govuk-error-message">
                    <span className="govuk-visually-hidden">Error:</span> {errors.email}
                  </span>
                  )
                }
                <span className="govuk-hint">You will use this email to sign in to the Submit an Advanced Voyage Report service</span>
              <input
                  className="govuk-input"
                  name="email"
                  type="text"
                  value={formData.email || ''}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleErrors(e, 'You must enter your email')}
                />
              </div>

              <div id="confirmEmail" className={`govuk-form-group ${errors.confirmEmail ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label govuk-label--m" htmlFor="confirmEmail">
                  Confirm email address
                </label>
                {errors.confirmEmail
                  && (
                  <span className="govuk-error-message">
                    <span className="govuk-visually-hidden">Error:</span> {errors.confirmEmail}
                  </span>
                  )
                }
              <input
                  className="govuk-input"
                  name="confirmEmail"
                  type="text"
                  value={formData.confirmEmail || ''}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleErrors(e, 'Your email addresses do not match')}
                />
              </div>

              <div id="password" className={`govuk-form-group ${errors.password ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label govuk-label--m" htmlFor="password">
                  Password
                </label>
                {errors.password
                  && (
                  <span className="govuk-error-message">
                    <span className="govuk-visually-hidden">Error:</span> {errors.password}
                  </span>
                  )
                }
              <input
                  className="govuk-input"
                  name="password"
                  type="password"
                  value={formData.password || ''}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleErrors(e, 'You must enter a password')}
                />
              </div>

              <div id="confirmPassword" className={`govuk-form-group ${errors.confirmPassword ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label govuk-label--m" htmlFor="confirmPassword">
                  Confirm password
                </label>
                {errors.confirmPassword
                  && (
                  <span className="govuk-error-message">
                    <span className="govuk-visually-hidden">Error:</span> {errors.confirmPassword}
                  </span>
                  )
                }
              <input
                  className="govuk-input"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword || ''}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleErrors(e, 'Your passwords do not match')}
                />
              </div>

              <h3 className="govuk-heading-s">Declaration</h3>
              <p className="govuk-body">By creating this account, you agree:</p>
              <ul className="govuk-list govuk-list--bullet">
                <li>that the information you have provided is correct to the best of your knowledge</li>
                <li>that you have read and accept our <a target="_blank" href="https://www.gov.uk/government/publications/personal-information-use-in-borders-immigration-and-citizenship">privacy policy</a></li>
              </ul>

              <button
                className="govuk-button"
                data-module="govuk-button"
                onClick={(e) => handleSubmit(e)}
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
