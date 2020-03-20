import React from 'react';
import { connect } from 'react-redux';

import { createVoyageReportRoutine } from 'State/voyage';
import PageAccount from 'PageAccount';
import StartButton from 'StartButton';

const PageIntro = ({ pageData, createVoyageReportAction }) => {
  return (
    <div className="govuk-width-container">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <h1 className="govuk-heading-xl">{pageData.pageHeading}</h1>
          <p className="govuk-body-l">{pageData.pageBlurb}</p>
          {pageData.urlStub === '/account' && <PageAccount pageData={pageData} />}
          {pageData.buttonLocation === 'intro' && <StartButton pageData={pageData} onClick={createVoyageReportAction} />}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  createVoyageReportAction: () => dispatch(createVoyageReportRoutine.request()),
});

export default connect(null, mapDispatchToProps)(PageIntro);
