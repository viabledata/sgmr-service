import React from 'react';

const PageIntroToForm = ({ pageData }) => {
  return (
    <div className="govuk-width-container">
      <div className="govuk-grid-column-full">
        <h2 className="govuk-heading-l">{pageData.formIntroHeading}</h2>
        <p className="govuk-body-l">{pageData.formIntroBlurb}</p>
        <a href={pageData.buttonLink} role="button" draggable="false" className="govuk-button govuk-button--start" data-module="govuk-button">
          {pageData.buttonText}
          <svg className="govuk-button__start-icon" xmlns="http://www.w3.org/2000/svg" width="17.5" height="19" viewBox="0 0 33 40" role="presentation" focusable="false">
            <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
          </svg>
        </a>
      </div>
      <div className="govuk-grid-column-full">
        <hr className="govuk-section-break govuk-section-break--visible govuk-section-break--xl govuk-!-margin-top-0" />
      </div>
    </div>
  );
};

export default PageIntroToForm;
