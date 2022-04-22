import React from 'react';
import { Link } from 'react-router-dom';

const OnboardingBanner = () => {
  return (
    <div className="govuk-width-container">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h2 className="govuk-heading-l">Add information to your account</h2>
          <p className="govuk-body">
            Save time in the future by adding your pleasure craft and travel document details for the skipper and people you frequently sail with.
          </p>
          <Link
            className="govuk-button govuk-button--start govuk-!-margin-top-2 govuk-!-margin-bottom-8"
            to={{
              pathname: '/pleasure-crafts/save-pleasure-craft/page-1',
              state: { source: 'onboarding' },
            }}
            aria-label="Start onboarding"
          >
            Start now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OnboardingBanner;
