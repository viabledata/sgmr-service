import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../lib/Auth';

const LandingPage = () => {
  document.title = 'Tell Border Force and HMRC you are sailing to or from the UK in a pleasure craft';

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-l">Tell Border Force and HMRC you are sailing to or from the UK in a pleasure craft</h1>
            <p className="govuk-body">Use this service to:</p>
            <ul className="govuk-list govuk-list--bullet govuk-!-margin-bottom-7">
              <li>Tell Border Force and HMRC about your next voyage plan</li>
              <li>Update an existing voyage plan</li>
            </ul>
            <div className="govuk-warning-text">
              <span className="govuk-warning-text__icon" aria-hidden="true">!</span>
              <strong className="govuk-warning-text__text">
                <span className="govuk-warning-text__assistive">Warning</span>
                There are now new rules in place for entering the UK.
                <br />
                <a href="https://www.gov.uk/uk-border-control">Find out more here.</a>
              </strong>
            </div>
            <div className="govuk-inset-text">
              From 1 October 2021, most EU, EEA and Swiss citizens will only be able to enter the UK using a valid passport. ID cards will no longer be
              accepted as a valid travel document for entry into the UK. For further details and exceptions,
              {' '}
              <a href="https://www.gov.uk/guidance/visiting-the-uk-as-an-eu-eea-or-swiss-citizen">please check GOV.UK.</a>
            </div>
            <h2 className="govuk-heading-m">What you&apos;ll need:</h2>
            <ul className="govuk-list govuk-list--bullet">
              <li>your pleasure craft details, including registration if applicable</li>
              <li>the skipper&apos;s details</li>
              <li>the passport or travel document details for all people on board</li>
              <li>date and estimated departure and arrival times for your plan</li>
            </ul>
            <p className="govuk-body">You&apos;ll also need to sign in or create and account to use this service.</p>
            <Link
              to={Auth.isAuthorized() ? '/voyage-plans' : '/sign-in'}
              role="button"
              draggable="false"
              className="govuk-button govuk-!-margin-bottom-7 govuk-button--start"
              data-module="govuk-button"
            >
              Start now
              <svg
                className="govuk-button__start-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="17.5"
                height="19"
                viewBox="0 0 33 40"
                aria-hidden="true"
                focusable="false"
              >
                <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
              </svg>
            </Link>
          </div>
          <div className="govuk-grid-column-one-third">
            <h3 className="govuk-heading-m">Related content</h3>
            <ul className="govuk-list govuk-!-font-size-16">
              <li><a className="govuk-link" target="blank" href="https://www.gov.uk/browse/abroad/travel-abroad">Travel abroad</a></li>
              <li>
                <a className="govuk-link" target="blank" href="https://www.gov.uk/government/collections/send-advance-passenger-information">
                  Send Advance Passenger Information
                </a>
              </li>
              <li>
                <a className="govuk-link" target="blank" href="https://www.gov.uk/government/publications/notice-8-sailing-your-pleasure-craft-to-and-from-the-uk">
                  Notice 8: sailing your pleasure craft to and from the UK
                </a>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
