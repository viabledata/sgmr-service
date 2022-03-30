import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import Auth from '../../lib/Auth';
import { RESEND_ACTIVATION_LINK } from '../../constants/ApiConstants';

const UserRegisterConfirmation = () => {
  document.title = 'Account successfully created';

  const history = useHistory();

  const location = useLocation();
  const { email } = qs.parse(location.search, { ignoreQueryPrefix: true });

  const [title, setTitle] = useState('Account successfully created');

  const resendCode = async (e, userEmail) => {
    await axios.post(RESEND_ACTIVATION_LINK, {
      email: userEmail,
    });
    setTitle('Verification email sent');
  };

  if (Auth.isAuthorized() || !email) {
    history.push('/voyage-plans');
    return null;
  }

  return (
    <div className="govuk-width-container ">
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <div className="govuk-panel govuk-panel--confirmation">
              <h1 className="govuk-panel__title">{title}</h1>
            </div>
            <p className="govuk-body">
              Please check your inbox. We have sent a verification email to
              {' '}
              {email}
            </p>
            <h2 className="govuk-heading-m">What happens next</h2>
            <p className="govuk-body">
              Click the verification link inside the email. This link will remain valid
              for 3 hours. If you can&apos;t see the email, please check any spam folders.
            </p>
            <Link className="govuk-link" to={`/registration-confirmation?email=${email}`} onClick={(e) => resendCode(e, email)}>Resend verification email</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserRegisterConfirmation;
