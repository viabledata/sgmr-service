import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { USER_URL, USER_VOYAGE_REPORT_URL, VOYAGE_REPORT_URL } from '../../constants/ApiConstants';
import { deleteItem, getData } from '../../utils/v2ApiHooks';
import { pageSizeParam } from '../../lib/config';
import NotificationBanner from '../../components/NotificationBanner';
import OnboardingBanner from '../onboarding/OnboardingBanner';
import WelcomeBanner from '../../components/WelcomeBanner';
import UserContext from '../../components/UserContext';

const Dashboard = () => {
  const history = useHistory();
  const { setUser } = useContext(UserContext);
  const [countPeople, setCountPeople] = useState();
  const [countPleasureCrafts, setCountPleasureCrafts] = useState();
  const [countVoyages, setCountVoyages] = useState();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [reportList, setReportList] = useState();
  document.title = 'Voyage plans';

  const getReportList = async () => {
    const validReports = [];
    const resp = await getData(`${USER_VOYAGE_REPORT_URL}?${pageSizeParam}`);
    if (!resp.errors) {
      resp.data.items.map((report) => {
        if (!report.departureDate && !report.departureTime && !report.departurePort) {
          deleteItem(`${VOYAGE_REPORT_URL}/${report.id}`);
        } else {
          validReports.push(report);
        }
      });
      setReportList(validReports);
      setCountVoyages(validReports.length);
    }
  };

  const calcVoyageCounts = (currentStatus) => {
    const newArray = reportList.filter((voyage) => {
      return voyage.status.name === currentStatus;
    });
    return newArray.length;
  };

  const getUserContext = async () => {
    const userData = await getData(USER_URL);
    setUser(userData.data);
    setCountPeople(userData.data.people.length);
    setCountPleasureCrafts(userData.data.vessels.length);
  };

  useEffect(() => {
    getUserContext(); // Setting user context
    getReportList();
  }, [setReportList]);

  useEffect(() => {
    setShowOnboarding(countPeople === 0 && countPleasureCrafts === 0 && countVoyages === 1);
  }, [countPeople, countPleasureCrafts, countVoyages, setShowOnboarding]);

  if (!reportList) { return null; }
  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <NotificationBanner />
        <WelcomeBanner />
        {showOnboarding && (<OnboardingBanner />)}

        <div className="govuk-grid-row">
          {!showOnboarding && (
          <div className="govuk-grid-column-full">
            <h1 className="govuk-heading-xl">Voyage Plans Dashboard</h1>
          </div>
          )}
          <div className="govuk-grid-column-one-half">
            <h2 className="govuk-heading-m">Create a voyage plan</h2>
            <p className="govuk-body">
              You can use this online form to create and tell Border Force and HMRC you are sailing to or from the UK in a pleasure craft to UK Border Force, notifying them of
              your travel plans.
            </p>
            {!showOnboarding
              ? (
                <button
                  type="button"
                  className="govuk-button govuk-button--start"
                  data-module="govuk-button"
                  onClick={() => history.push('/voyage-plans/start')}
                >
                  Start now
                  <svg
                    className="govuk-button__start-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="17.5"
                    height="19"
                    viewBox="0 0 33 40"
                    role="presentation"
                    focusable="false"
                  >
                    <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
                  </svg>
                </button>
              )
              : (
                <button
                  type="button"
                  className="govuk-button govuk-button--secondary govuk-!-margin-top-2 govuk-!-margin-bottom-8"
                  data-module="govuk-button"
                  onClick={() => history.push('/voyage-plans/start')}
                >
                  Create a new voyage plan
                </button>
              )}
          </div>
          <div className="govuk-grid-column-one-half">
            <h2 className="govuk-heading-m">Manage existing voyage plans</h2>
            <p className="govuk-body">View your voyage plans to edit, cancel or delete them, depending on its status.</p>
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-one-third panel-number">
                <p className="govuk-body-s">
                  <strong className="panel-number-large" data-testid="draft-count">{calcVoyageCounts('Draft')}</strong>
                  Draft
                </p>
              </div>
              <div className="govuk-grid-column-one-third panel-number">
                <p className="govuk-body-s">
                  <strong className="panel-number-large" data-testid="submitted-count">{calcVoyageCounts('PreSubmitted') + calcVoyageCounts('Submitted') + calcVoyageCounts('Failed')}</strong>
                  Submitted
                </p>
              </div>
              <div className="govuk-grid-column-one-third panel-number">
                <p className="govuk-body-s">
                  <strong className="panel-number-large" data-testid="cancelled-count">{calcVoyageCounts('Cancelled') + calcVoyageCounts('PreCancelled')}</strong>
                  Cancelled
                </p>
              </div>
            </div>
            <Link className="govuk-link govuk-body" to="/manage-voyage-plans">View existing voyage plans</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
