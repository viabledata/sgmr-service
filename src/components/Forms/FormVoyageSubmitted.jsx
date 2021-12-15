import React from 'react';
import { Link } from 'react-router-dom';

const FormVoyageSubmitted = () => {
  
  document.title = "Report Submitted";

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper govuk-main-wrapper--l" id="main-content" role="main">

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <div className="govuk-panel govuk-panel--confirmation">
              <h1 className="govuk-panel__title">Pleasure Craft Report Submitted</h1>
            </div>
            <p>We have sent you a confirmation email.</p>
            <h2 className="govuk-heading-m">What happens next</h2>
            <p>We’ve sent your voyage report to UK Border Force.</p>
            <p>
              You can&nbsp;
              <Link to="/reports">add a return voyage or manage your reports.</Link>
            </p>
          </div>
        </div>

      </main>
    </div>
  );
};

export default FormVoyageSubmitted;
