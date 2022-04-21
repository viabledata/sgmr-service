import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { REPORT_PAGE_URL } from '../../constants/ClientConstants';

const VoyageSubmitted = () => {
  document.title = 'Voyage Plan Submitted';

  const history = useHistory();

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper govuk-main-wrapper--l" id="main-content" role="main">

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <div className="govuk-panel govuk-panel--confirmation">
              <h1 className="govuk-panel__title">Voyage plan submitted</h1>
              {/* <div className="govuk-panel__body">
                Your reference number is
                <br />
                <strong>Replace with reference number</strong>
              </div> */}
            </div>
            <p className="govuk-body-l">We have sent you a confirmation email.</p>
            <h2 className="govuk-heading-m">What happens next</h2>
            <p className="govuk-body">We&apos;ve sent your voyage plan to Border Force. They will contact you if they need more information.</p>
            <h3 className="govuk-heading-s">If you need to change or cancel your voyage plan</h3>
            <p className="govuk-body">To change or cancel your plan, you can either:</p>
            <ul className="govuk-list govuk-list--bullet">
              <li>Sign in to your account to change your voyage plan</li>
              <li>
                {'Call '}
                <a
                  className="govuk-link"
                  href="https://www.gov.uk/government/organisations/hm-revenue-customs/contact/national-yachtline"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  National Yachtline
                </a>
                {' on 0300 123 2012.'}
              </li>
            </ul>
            <h4 className="govuk-heading-s">If you are planning a return voyage</h4>
            <p className="govuk-body">
              {'You can create a draft voyage plan for your return by '}
              <Link to="/voyage-plans/start" className="govuk-link">
                clicking here
              </Link>
              {'. You will need to review and submit it before your return. Alternatively, you can create a new plan for your return later.'}
            </p>
            <h5 className="govuk-heading-s">Sailing to and from the UK</h5>
            <p className="govuk-body">
              {'Check the '}
              <a
                className="govuk-link"
                href="https://www.gov.uk/government/publications/notice-8-sailing-your-pleasure-craft-to-and-from-the-uk/notice-8-sailing-your-pleasure-craft-to-and-from-the-uk"
                target="_blank"
                rel="noreferrer noopener"
              >
                sailing to and from the UK guidance
              </a>
              {' before your voyage.'}
            </p>
            <button
              className="govuk-button govuk-button--secondary"
              data-module="govuk-button"
              type="button"
              onClick={() => { history.push(REPORT_PAGE_URL); }}
            >
              Continue to home page
            </button>
          </div>
        </div>

      </main>
    </div>
  );
};

export default VoyageSubmitted;
