import React from 'react';

// app imports
import StartButton from '@components/StartButton';

const PageIntroToForm = ({ pageData }) => {
  return (
    <section>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <hr className="govuk-section-break govuk-section-break--visible govuk-section-break--xl govuk-!-margin-top-0" />
        </div>
      </div>
      <div className="govuk-width-container">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-full">
            <h2 className="govuk-heading-l">{pageData.formIntroHeading}</h2>
            <p className="govuk-body-l">{pageData.formIntroBlurb}</p>
            <StartButton pageData={pageData} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageIntroToForm;
