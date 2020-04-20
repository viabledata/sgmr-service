import React from 'react';
// import { connect } from 'react-redux';

import PageAccount from '@components/PageAccount';

const PageIntro = ({ pageData }) => {
  return (
    <div className="govuk-width-container">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <h1 className="govuk-heading-xl">{pageData.pageHeading}</h1>
          <p className="govuk-body-l">{pageData.pageBlurb}</p>
          {pageData.urlStub === '/account' && <PageAccount pageData={pageData} />}
        </div>
      </div>
    </div>
  );
};

export default PageIntro;
