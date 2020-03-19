import React from 'react';
import { Link } from 'react-router-dom';

const FormVoyageSubmitted = () => {
  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper govuk-main-wrapper--l" id="main-content" role="main">

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <div className="govuk-panel govuk-panel--confirmation">
              <h1 className="govuk-panel__title">Advanced Voyage Report Submitted</h1>
              <div className="govuk-panel__body">Your reference number is <strong>xxREFxx</strong></div>
            </div>
            <p className="govuk-body-l">We have sent you a confirmation email to xxEMAILxx</p>
            <h2 className="govuk-heading-m">What happens next</h2>
            <p>We’ve sent your Advanced Voyage Report to UK Border Force.</p>
            <p>If you need to make any changes to this report you will need to submit another report with the new information and cancel this one. This can be done on the <Link to="/reports">Manage Advanced Voyage Reports</Link> page.</p>
            <p><a href="https://www.gov.uk/service-manual/user-centred-design/resources/patterns/feedback-pages.html">What did you think of this service?</a> (takes 30 seconds)</p>
          </div>
        </div>

      </main>
    </div>
  );
};

export default FormVoyageSubmitted;
