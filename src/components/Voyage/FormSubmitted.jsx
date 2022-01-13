import React from 'react';
import { Link } from 'react-router-dom';

const FormVoyageSubmitted = () => {
  document.title = 'Pleasure Craft Report Submitted';

  return (

    <div className="govuk-width-container">
      <main className="govuk-main-wrapper govuk-main-wrapper--l" id="main-content" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <div className="govuk-panel govuk-panel--confirmation">
              <h1 className="govuk-panel__title">
                Pleasure Craft Report Submitted
              </h1>
            </div>
            <p className="govuk-body" />
            <h2 className="govuk-heading-m">What happens next</h2>
            <p className="govuk-body">
              We’ve sent your Pleasure Craft Report to UK Border Force.
            </p>
            <p>
              If you need to make any changes to this report you will need to submit another report with the new information and cancel this one. This can be done on the&nbsp;
              <Link to="/reports">Manage Pleasure Craft Reports</Link>
              &nbsp;page.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FormVoyageSubmitted;
