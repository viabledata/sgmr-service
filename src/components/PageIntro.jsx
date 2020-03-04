import React from 'react';
// import { useHistory } from 'react-router-dom';

const PageIntro = ({ pageData }) => {
  // let history = useHistory();

  return (
    <div className="govuk-width-container">
      {/* <a className="govuk-back-link" onClick={(e) => {
        e.preventDefault();
        history.goBack();
      }}>Back</a> */}

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-full">
            <h1 className="govuk-heading-xl">{pageData.pageHeading}</h1>
            <p className="govuk-body-l">{pageData.pageBlurb}</p>
          </div>
          <div className="govuk-grid-column-full">
            <hr className="govuk-section-break govuk-section-break--visible govuk-section-break--xl govuk-!-margin-top-0" />
          </div>
        </div>

    </div>
  );
};

export default PageIntro;
