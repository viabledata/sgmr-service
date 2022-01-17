import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'qs';
import Auth from '../../lib/Auth';

const UserRegisterConfirmation = () => {
  document.title = 'Account successfully created';

  const history = useHistory();

  const location = useLocation();
  const { email } = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (Auth.isAuthorized() || !email) {
    history.push('/reports');
    return null;
  }

  return (
    <div className="govuk-width-container ">
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <div className="govuk-panel govuk-panel--confirmation">
              <h1 className="govuk-panel__title">Account successfully created</h1>
            </div>
            <p>
              Please check your inbox. We have sent a verification email to
              {' '}
              {email}
            </p>
            <h2 className="govuk-heading-m">What happens next</h2>
            <p>
              Click the verification link inside the email. This link will remain valid
              for 3 hours. If you can’t see the email, please check any spam folders.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserRegisterConfirmation;
