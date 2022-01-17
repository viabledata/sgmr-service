import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Auth from '../../lib/Auth';

const DeleteConfirmation = () => {
  document.title = 'Your account is now deleted';

  const history = useHistory();
  if (Auth.isAuthorized()) {
    history.push('/voyage-plans');
    return null;
  }
  return (
    <div className="govuk-width-container ">
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-l">Your account is now deleted</h1>
            <p className="govuk-body">
              Use the
              {' '}
              <Link to="/register">registration form</Link>
              {' '}
              to create a new one.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DeleteConfirmation;
