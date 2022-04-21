import React from 'react';

const WelcomeBanner = ({ user }) => {
  if (!user) { return null; }
  return (
    <div className="govuk-width-container">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <h3 className="govuk-heading-m">{`Welcome back, ${user}`}</h3>
        </div>
      </div>
      <hr className="govuk-section-break govuk-section-break--visible govuk-section-break--xl govuk-!-margin-top-0" />
    </div>
  );
};

export default WelcomeBanner;
