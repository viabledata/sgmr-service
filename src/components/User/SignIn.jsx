import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import { LOGIN_URL } from '../../constants/ApiConstants';
import Auth from '../../lib/Auth';

const SignIn = () => {
  document.title = 'Sign In';

  const history = useHistory();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

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
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
          removeError('email');
        } else {
          setErrors({ ...errors, email: errorText });
        }
        break;
      default: return null;
    }
  };

  // Update form info to state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    removeError(e.target.name);
    // For SignIn page, always remove 'main' error if it exists
    removeError('main');
  };
  // Ensure all required fields have a value
  const checkRequiredFields = () => {
    if (!formData.email || !formData.password) {
      setErrors({ ...errors, main: 'You must enter an email address and password' });
      return false;
    }
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email) === false) {
      setErrors({ ...errors, email: 'Enter a valid email address' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Ensure required fields have a value
    if (checkRequiredFields() === true) {
      try {
        const response = await axios.post(LOGIN_URL, formData);
        if (response.data.token) { Auth.storeToken(response.data.token); }
        history.push('/voyage-plans');
      } catch (err) {
        setErrors({ ...errors, main: 'Email and password combination is invalid' });
      }
    }
  };

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <form>
              <h1 className="govuk-heading-xl">Sign in</h1>

              {Object.keys(errors).length > 0 && (
                <div className="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabIndex="-1" data-module="govuk-error-summary">
                  <h2 className="govuk-error-summary__title">
                    There is a problem
                  </h2>
                  <div className="govuk-error-summary__body">
                    <ul className="govuk-list govuk-error-summary__list">
                      {Object.entries(errors).map((elem) => (
                        <li key={elem.id}>
                          {elem[0] !== 'title'
                          && <a href={`#${elem[0]}`}>{elem[1]}</a>}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="govuk-form-group">
                <label className="govuk-label" htmlFor="email">
                  Email address
                </label>
                <div className="govuk-hint">Enter the email address you used when you created your account</div>
                <input
                  className="govuk-input"
                  id="email"
                  name="email"
                  type="text"
                  onChange={handleChange}
                  onBlur={(e) => handleErrors(e, 'Enter a valid email address')}
                />
              </div>

              <div className="govuk-form-group">
                <label className="govuk-label" htmlFor="password">
                  Password
                </label>
                <input
                  className="govuk-input"
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  onBlur={(e) => handleErrors(e, 'You must enter your password')}
                />
              </div>

              <button
                type="submit"
                className="govuk-button"
                onClick={handleSubmit}
              >
                Sign in
              </button>
              <p className="govuk-body"><Link to="/forgotten-password">Problems signing in?</Link></p>
            </form>
          </div>
          <div className="govuk-grid-column-one-third">
            <h3 className="govuk-heading-m">Create an account</h3>
            <p className="govuk-body"><Link to="/register">Create an account to submit and update voyage plans</Link></p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignIn;
