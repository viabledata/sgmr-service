import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import qs from 'qs';
import Auth from '@lib/Auth';
import axios from 'axios';

import { ACTIVATE_ACCOUNT, RESEND_ACTIVATION_LINK } from '@constants/ApiConstants';

const ActivationSuccess = () => (
  <>
    <div className="govuk-panel govuk-panel--confirmation">
      <h1 className="govuk-panel__title">Account Activated</h1>
    </div>
    <p className="govuk-body-l">
      We have successfully verified your account. You can now
      {' '}
      <Link to="/sign-in">sign in</Link>
      .
    </p>
  </>
);

const ActivationError = ({ email }) => {
  const resendCode = async (e, userEmail) => {
    await axios.post(RESEND_ACTIVATION_LINK, {
      email: userEmail,
    });
  };

  return (
    <div className="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" data-module="govuk-error-summary">
      <h2 className="govuk-error-summary__title" id="error-summary-title">
        There is a problem
      </h2>
      <div className="govuk-error-summary__body">
        <ul className="govuk-list govuk-error-summary__list">
          <li>
            We could not activate your account. To send a new verification email please click
            {' '}
            <Link
              to={`/registration-confirmation?email=${email}`}
              onClick={(e) => resendCode(e, email)}
            >
              here
            </Link>
            .
          </li>
        </ul>
      </div>
    </div>
  );
};

const AccountActivation = () => {
  const history = useHistory();
  if (Auth.isAuthorized()) {
    history.push('/reports');
    return null;
  }
  const [activated, setActivated] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const { token, email } = qs.parse(location.search, { ignoreQueryPrefix: true });

  useEffect(() => {
    async function activateAccount() {
      try {
        await axios.post(ACTIVATE_ACCOUNT, {
          token,
          email,
        });
        setActivated(true);
      } catch (err) {
        setError(err.message);
      }
    }
    activateAccount();
  }, []);

  if (!activated && !error) { return null; }
  return (
    <div className="govuk-width-container ">
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            {activated && <ActivationSuccess />}
            {error && <ActivationError email={email} />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountActivation;
