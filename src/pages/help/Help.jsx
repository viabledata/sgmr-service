import React from 'react';

const Help = (source) => {
  document.title = 'Help';

  return (
    <div className="govuk-width-container ">
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <div className="govuk-width-container">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <h1 className="govuk-heading-l">Telling us about your voyage plan</h1>
              <p className="govuk-body-l">
                You can draft a voyage plan anytime. You should submit your plan at least two
                hours before you depart, but no more than 24 hours before you depart.
              </p>
              <p className="govuk-body">
                We&apos;ll ask you when you plan to depart and arrive, and where from. You can enter a
                time range of up to 6 hours for your intended departure and arrival times.
              </p>
              <h2 className="govuk-heading-s">If your voyage plan changes</h2>
              <p className="govuk-body">We expect you to update your voyage plan for our records, as soon as possible.</p>
              <p className="govuk-body">
                This includes changes to the date, departure or arrival point, people on board and
                significant changes to your intended departure or arrival time (where these change by more than six
                hours).
              </p>
              <p className="govuk-body">You can sign into your account to change the voyage plan you submitted.</p>
              <h3 className="govuk-heading-s">
                In an emergency, or if you can’t update your account online, you should call
                Border Force as soon as possible.
              </h3>
              <p className="govuk-body">
                The number which you call depends upon which UK region you arrive to or depart
                from:
              </p>
              <p className="govuk-body">
                The number which you call depends upon which UK region you arrive to or depart
                from:
              </p>
              <ul className="govuk-list govuk-list--bullet">
                <li>South: +44 (0)1293 501266</li>
                <li>South East: +44 (0)130 329 9157</li>
                <li>North: +44 (0)300 106 5725</li>
                <li>Central: +44 (0)300 072 4322</li>
              </ul>
              {source === 'voyage' && (
              <form action="create-voyage-plan-departure">
                <div className="govuk-button-group">
                  <button type="submit" className="govuk-button" data-module="govuk-button">
                    Continue
                  </button>
                  <a href="home.html" className="govuk-button govuk-button--secondary" data-module="govuk-button">
                    Cancel
                  </a>
                </div>
              </form>
              )}
            </div>
            <div className="govuk-grid-column-one-third" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Help;
