import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

import { PASSWORD_RESET_CONFIRMATION } from '../../constants/ApiConstants';
import Auth from '../../lib/Auth';
import ErrorSummary from '../ErrorSummary';
import { passwordValidation } from '../Forms/validationRules';

const PageWrapper = ({ children }) => (
  <div className="govuk-width-container ">
    <Link to="/sign-in" className="govuk-back-link">Back</Link>

    <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          {children}
        </div>
      </div>
    </main>
  </div>
);

const NewPassword = () => {
  document.title = 'Set a new password';

  const location = useLocation();
  const [isFormDisabled, setFormDisabled] = useState(false);
  const [error, setError] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const passwordValidationError = passwordValidation(formData.password);
    if (passwordValidationError) {
      setError(passwordValidationError);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords must match');
      return;
    }

    setFormDisabled(true);

    axios.post(PASSWORD_RESET_CONFIRMATION, {
      token: location.search.replace('?token=', ''),
      newPassword: formData.password,
    }, {
      headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
    })
      .then(() => {
        setFormSubmitted(true);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message || 'Cannot update your password now, try again later');
          setFormDisabled(false);
        }
      });
  };

  if (formSubmitted) {
    return (
      <PageWrapper>
        <h1 className="govuk-heading-xl">Password was changed</h1>
        <p className="govuk-body-l">
          We updated your password, you can now
          {' '}
          <Link to="/sign-in">sign in</Link>
          .
        </p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <h1 className="govuk-heading-xl">Set new password</h1>

      <ErrorSummary errors={[error]} />

      <form onSubmit={formSubmitHandler}>
        <div className="govuk-form-group">
          <label className="govuk-label" htmlFor="password">
            New password
          </label>
          <input
            className="govuk-input"
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
          />
        </div>

        <div className="govuk-form-group">
          <label className="govuk-label" htmlFor="confirmPassword">
            Confirm new password
          </label>
          <input
            className="govuk-input"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={handleChange}
          />
        </div>

        <button disabled={isFormDisabled} type="submit" className="govuk-button" data-module="govuk-button">
          Change password
        </button>
      </form>
    </PageWrapper>
  );
};

export default NewPassword;
