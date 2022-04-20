import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { USER_URL, USER_VOYAGE_REPORT_URL, VOYAGE_REPORT_URL } from '../../constants/ApiConstants';
import { deleteItem, getData } from '../../utils/v2ApiHooks';
import { pageSizeParam } from '../../lib/config';
import NotificationBanner from '../../components/NotificationBanner';
import WelcomeBanner from '../../components/WelcomeBanner';
import UserContext from '../../components/UserContext';

const Dashboard = () => {
  const history = useHistory();
  const { setUser } = useContext(UserContext);
  const [showOnboarding, setShowOnboarding] = useState(true);
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
      if (validReports.length > 0) {
        setShowOnboarding(false);
      }
    }
  };

  const countVoyages = (currentStatus) => {
    const newArray = reportList.filter((voyage) => {
      return voyage.status.name === currentStatus;
    });
    return newArray.length;
  };

  const getUserContext = async () => {
    const userData = await getData(USER_URL);
    setUser(userData.data);
    if (userData.data.people.length > 0 || userData.data.vessels.length > 0) {
      setShowOnboarding(false);
    }
  };

  useEffect(() => {
    setShowOnboarding(true);
    getUserContext(); // Setting user context
    getReportList();
  }, [setReportList, setShowOnboarding]);

  if (!reportList) { return null; }
  console.log(showOnboarding);
  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <NotificationBanner />
        <WelcomeBanner />

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-full">
            <h1 className="govuk-heading-xl">Voyage Plans Dashboard</h1>
          </div>
          <div className="govuk-grid-column-one-half">
            <h2 className="govuk-heading-m">Create a new voyage plan</h2>
            <p className="govuk-body">
              You can use this online form to create and tell Border Force and HMRC you are sailing to or from the UK in a pleasure craft to UK Border Force, notifying them of
              your travel plans.
            </p>
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
          </div>
          <div className="govuk-grid-column-one-half">
            <h2 className="govuk-heading-m">Manage existing voyage plans</h2>
            <p className="govuk-body">View your voyage plans to edit, cancel or delete them, depending on its status.</p>
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-one-third panel-number">
                <p className="govuk-body-s">
                  <strong className="panel-number-large" data-testid="draft-count">{countVoyages('Draft')}</strong>
                  Draft
                </p>
              </div>
              <div className="govuk-grid-column-one-third panel-number">
                <p className="govuk-body-s">
                  <strong className="panel-number-large" data-testid="submitted-count">{countVoyages('PreSubmitted') + countVoyages('Submitted') + countVoyages('Failed')}</strong>
                  Submitted
                </p>
              </div>
              <div className="govuk-grid-column-one-third panel-number">
                <p className="govuk-body-s">
                  <strong className="panel-number-large" data-testid="cancelled-count">{countVoyages('Cancelled') + countVoyages('PreCancelled')}</strong>
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
