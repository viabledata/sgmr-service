import React from 'react';

// app imports
import StartButton from 'StartButton';
import PageAccount from 'PageAccount';

const PageIntro = ({ pageData }) => {
  return (
    <div className="govuk-width-container">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-full">
            <h1 className="govuk-heading-xl">{pageData.pageHeading}</h1>
            <p className="govuk-body-l">{pageData.pageBlurb}</p>
          </div>
          {pageData.urlStub === '/account' && <PageAccount pageData={pageData} />}
          {pageData.buttonLocation === 'intro' && <StartButton pageData={pageData} />}
        </div>
    </div>
  );
};

export default PageIntro;
