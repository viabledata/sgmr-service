import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

// App imports
import UserContext from './UserContext';

const PageAccount = () => {
  const history = useHistory();

  // Calling the user info
  const { user, setUser } = useContext(UserContext);

  if (!user) { return null; }
  return (
    <div>
      <dl className="govuk-summary-list govuk-!-margin-bottom-9 govuk-summary-list--no-border">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            First name
          </dt>
          <dd className="govuk-summary-list__value">
            {user.firstName}
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            Last name
          </dt>
          <dd className="govuk-summary-list__value">
            {user.lastName}
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            Email
          </dt>
          <dd className="govuk-summary-list__value">
            {user.email}
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            Mobile number
          </dt>
          <dd className="govuk-summary-list__value">
            {user.mobileNumber}
          </dd>
        </div>
      </dl>
      <button
        type="submit"
        className="govuk-button"
        onClick={() => history.push('/account/edit')}
      >
        Edit Account
      </button>
    </div>
  );
};

export default PageAccount;
