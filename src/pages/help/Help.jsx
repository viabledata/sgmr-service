import React from 'react';
import { useHistory } from 'react-router-dom';

import { USER_VOYAGE_REPORT_URL } from '../../constants/ApiConstants';
import { SAVE_VOYAGE_DEPARTURE_URL } from '../../constants/ClientConstants';
import { postData } from '../../utils/apiHooks';

const Help = ({ source }) => {
  document.title = 'Telling us about your voyage plan';
  const history = useHistory();

  const handleStart = async () => {
    const resp = await postData(USER_VOYAGE_REPORT_URL, null, 'reports');
    history.push({
      pathname: SAVE_VOYAGE_DEPARTURE_URL,
      state: { voyageId: resp.id },
    });
  };

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
                We&apos;ll ask you when you plan to depart and arrive, and where from. You can enter a time range of up to 6 hours for your intended departure and arrival times.
              </p>
              <h2 className="govuk-heading-s">If your voyage plan changes</h2>
              <p className="govuk-body">We expect you to update your voyage plan for our records, as soon as possible.</p>
              <p className="govuk-body">
                This includes changes to the date, departure or arrival point, people on board and significant changes to your intended departure or arrival time
                (where these change by more than six hours).
              </p>
              <p className="govuk-body">You can sign into your account to change the voyage plan you submitted.</p>
              <h3 className="govuk-heading-s">
                In an emergency, or if you can&apos;t update your account online, you should call Border Force as soon as possible.
              </h3>
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
                <>
                  <button
                    title="saveButton"
                    type="button"
                    className="govuk-button"
                    data-module="govuk-button"
                    onClick={handleStart}
                  >
                    Continue
                  </button>
                  <button
                    title="cancelButton"
                    type="button"
                    className="govuk-button govuk-button--secondary"
                    data-module="govuk-button"
                    onClick={() => history.push('/voyage-plans')}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Help;
