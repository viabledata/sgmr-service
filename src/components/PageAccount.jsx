import React from 'react';

const PageAccount = () => {
  return (
    <div>
      <dl className="govuk-summary-list govuk-!-margin-bottom-9">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            Given name
          </dt>
          <dd className="govuk-summary-list__value">
            Alex
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            Surname
          </dt>
          <dd className="govuk-summary-list__value">
            Sam
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            Email
          </dt>
          <dd className="govuk-summary-list__value">
            email@email.com
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default PageAccount;
