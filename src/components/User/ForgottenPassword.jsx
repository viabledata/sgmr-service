import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { PASSWORD_RESET_LINK } from '@constants/ApiConstants';
import Auth from '@lib/Auth';
import ErrorSummary from '@components/ErrorSummary';
import { VALID_EMAIL_REGEX } from '@constants/ClientConstants';

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

const ForgottenPassword = () => {
  const [isFormDisabled, setFormDisabled] = useState(false);
  const [error, setError] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!formData.email) {
      setError('Enter your email address');
      return;
    }
    if (!VALID_EMAIL_REGEX.test(formData.email)) {
      setError('Enter a valid email address');
      return;
    }

    setFormDisabled(true);

    axios.post(PASSWORD_RESET_LINK, {
      email: formData.email,
    }, {
      headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
    })
      .then(() => {
        setFormSubmitted(true);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message || 'Cannot reset your password now, try again later');
          setFormDisabled(false);
        }
      });
  };

  if (formSubmitted) {
    return (
      <PageWrapper>
        <h1 className="govuk-heading-xl">Check your inbox</h1>
        <p className="govuk-body-l">
          A link to reset your password was sent to the provided email address.
        </p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <h1 className="govuk-heading-xl">Forgotten password</h1>

      <p className="govuk-body-l">
        We'll email you a link to reset your password.
      </p>

      <ErrorSummary errors={[error]} />

      <form onSubmit={formSubmitHandler}>
        <div className="govuk-form-group">
          <label className="govuk-label" htmlFor="email">
            Email address
          </label>
          <input
            className="govuk-input"
            id="email"
            name="email"
            type="text"
            onChange={handleChange}
          />
        </div>

        <button disabled={isFormDisabled} type="submit" className="govuk-button" data-module="govuk-button">
          Send the link
        </button>
      </form>
    </PageWrapper>
  );
};

export default ForgottenPassword;
