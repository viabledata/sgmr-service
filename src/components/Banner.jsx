import React from 'react';

const Banner = () => {
  return (
    <div className="govuk-width-container app-width-container--wide">
      <div className="govuk-phase-banner">
        <p className="govuk-phase-banner__content">
          <strong className="govuk-tag govuk-phase-banner__content__tag">
            beta
          </strong>
          <span className="govuk-phase-banner__text" data-testid="banner-text">
            This is a new service – your
            {' '}
            <a className="govuk-link" href="https://www.homeofficesurveys.homeoffice.gov.uk/s/NWSI7P/">feedback</a>
            {' '}
            will help us to improve it.
          </span>
        </p>
      </div>
    </div>
  );
};

export default Banner;
