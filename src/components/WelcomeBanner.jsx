import React, { useContext } from 'react';
import UserContext from './UserContext';

const WelcomeBanner = () => {
  const { user } = useContext(UserContext);

  if (!user) { return null; }
  return (
    <div className="govuk-width-container">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <h3 className="govuk-heading-m">{`Welcome back, ${user.firstName}`}</h3>
        </div>
      </div>
      <hr className="govuk-section-break govuk-section-break--visible govuk-section-break--xl govuk-!-margin-top-0" />
    </div>
  );
};

export default WelcomeBanner;
