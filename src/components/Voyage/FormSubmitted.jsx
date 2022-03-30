import React from 'react';
import { Link } from 'react-router-dom';

const FormVoyageSubmitted = () => {
  document.title = 'Pleasure Craft Voyage Plan Submitted';

  return (

    <div className="govuk-width-container">
      <main className="govuk-main-wrapper govuk-main-wrapper--l" id="main-content" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <div className="govuk-panel govuk-panel--confirmation">
              <h1 className="govuk-panel__title">
                Pleasure Craft Voyage Plan Submitted
              </h1>
            </div>
            <h2 className="govuk-heading-m">What happens next</h2>
            <p className="govuk-body">
              We&apos;ve sent your Pleasure Craft Voyage Plan to UK Border Force.
            </p>
            <p className="govuk-body">
              If you need to make any changes to this voyage plan you will need to submit another voyage plan with the new information and cancel this one. This can be done on the&nbsp;
              <Link className="govuk-link" to="/voyage-plans">Manage Pleasure Craft Voyage Plans</Link>
              &nbsp;page.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FormVoyageSubmitted;
