import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const UserRegister = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState(JSON.parse(localStorage.getItem('errors')) || { title: null });

  // Update form info to state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle errors [for empty fields]
  const removeError = (fieldName) => {
    const tempArr = { ...errors };
    const key = fieldName;
    delete tempArr[key];
    setErrors(tempArr);
  };
  const handleErrors = (e, errorText, groupField) => {
    // If field value is empty, add error : if field has value, removeError
    const name = !groupField ? e.target.name : groupField;
    !e.target.value ? setErrors({ ...errors, [name]: errorText }) : removeError(name);
  };

  // Validate email addresses match

  // Validate password is at least 8 characters long
  // Validate passwords match

  // Handle Submit, including clearing localStorage
  const handleSubmit = (e) => {
    // Combine date fields into required format before submit
    e.preventDefault();
    history.goBack(); // Return to page you came from
  };

  // Update localStorage to hold page data (errors only on this form)
  useEffect(() => {
    localStorage.setItem('errors', JSON.stringify(errors));
  }, [errors]);

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

              {Object.keys(errors).length > 1 && (
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

              <div id="givenName" className={`govuk-form-group ${errors.givenName ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label govuk-label--m" htmlFor="givenName">
                  Given name
                </label>
                {errors.givenName
                  && (
                  <span className="govuk-error-message">
                    <span className="govuk-visually-hidden">Error:</span> {errors.givenName}
                  </span>
                  )
                }
                <input
                  className="govuk-input"
                  name="givenName"
                  type="text"
                  value={formData.givenName || ''}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleErrors(e, 'You must enter your given name')}
                  onKeyPress={(e) => handleErrors(e)}
                />
              </div>

              <div id="surname" className={`govuk-form-group ${errors.surname ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label govuk-label--m" htmlFor="surname">
                  Surname
                </label>
                {errors.surname
                  && (
                  <span className="govuk-error-message">
                    <span className="govuk-visually-hidden">Error:</span> {errors.surname}
                  </span>
                  )
                }
              <input
                  className="govuk-input"
                  name="surname"
                  type="text"
                  value={formData.surname || ''}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleErrors(e, 'You must enter your surname')}
                  onKeyPress={(e) => handleErrors(e)}
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
                  onKeyPress={(e) => handleErrors(e)}
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
                  onKeyPress={(e) => handleErrors(e)}
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
                  type="text"
                  value={formData.password || ''}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleErrors(e, 'Your password must be at least 8 characters long')}
                  onKeyPress={(e) => handleErrors(e)}
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
                  type="text"
                  value={formData.confirmPassword || ''}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleErrors(e, 'Your passwords do not match')}
                  onKeyPress={(e) => handleErrors(e)}
                />
              </div>

            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserRegister;
