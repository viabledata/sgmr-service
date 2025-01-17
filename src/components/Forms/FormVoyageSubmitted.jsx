import React from 'react';
import { Link } from 'react-router-dom';

const FormVoyageSubmitted = () => {
  document.title = 'Voyage Plan Submitted';

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper govuk-main-wrapper--l" id="main-content" role="main">

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <div className="govuk-panel govuk-panel--confirmation">
              <h1 className="govuk-panel__title">Pleasure Craft Voyage Plan Submitted</h1>
            </div>
            <p className="govuk-body">We have sent you a confirmation email.</p>
            <h2 className="govuk-heading-m">What happens next</h2>
            <p className="govuk-body">We&apos;ve sent your voyage plan to UK Border Force.</p>
            <p className="govuk-body">
              You can&nbsp;
              <Link to="/voyage-plans">add a return voyage or manage your voyage plans.</Link>
            </p>
          </div>
        </div>

      </main>
    </div>
  );
};

export default FormVoyageSubmitted;
