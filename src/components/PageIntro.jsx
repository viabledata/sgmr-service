import React from 'react';

const PageIntro = ({ pageData }) => {
  return (
    <div className="govuk-width-container">

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-full">
            <h1 className="govuk-heading-xl">{pageData.pageHeading}</h1>
            <p className="govuk-body-l">{pageData.pageBlurb}</p>
            {!pageData.formIntroHeading 
              && <a href={pageData.buttonLink} role="button" draggable="false" className="govuk-button govuk-button--start" data-module="govuk-button">
              {pageData.buttonText}
              <svg className="govuk-button__start-icon" xmlns="http://www.w3.org/2000/svg" width="17.5" height="19" viewBox="0 0 33 40" role="presentation" focusable="false">
                <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
              </svg>
            </a>}
          </div>
          <div className="govuk-grid-column-full">
            <hr className="govuk-section-break govuk-section-break--visible govuk-section-break--xl govuk-!-margin-top-0" />
          </div>
        </div>

    </div>
  );
};

export default PageIntro;
