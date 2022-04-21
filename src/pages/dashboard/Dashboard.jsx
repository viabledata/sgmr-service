import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
    setShowOnboarding(countPeople === 0 && countPleasureCrafts === 1 && countVoyages === 1);
  }, [countPeople, countPleasureCrafts, countVoyages, setShowOnboarding]);

  if (!reportList) { return null; }
  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <NotificationBanner />
        <WelcomeBanner />
        {showOnboarding && (<OnboardingBanner />)}

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-half">
            <h2 className="govuk-heading-m">Create a voyage plan</h2>
            <p className="govuk-body">
              Tell Border Force and HMRC that you are planning to sail to or from the UK.
            </p>
            {!showOnboarding
              ? (
                <button
                  type="button"
                  className="govuk-button"
                  data-module="govuk-button"
                  onClick={() => history.push('/voyage-plans/start')}
                >
                  Create a new voyage plan
                </button>
              )
              : (
                <button
                  type="button"
                  className="govuk-button govuk-button--secondary"
                  data-module="govuk-button"
                  onClick={() => history.push('/voyage-plans/start')}
                >
                  Create a new voyage plan
                </button>
              )}
          </div>
          <div className="govuk-grid-column-one-half">
            <h2 className="govuk-heading-m">Manage your voyage plans</h2>
            <p className="govuk-body">You can view, update or cancel voyage plans you created up to 12 months ago.</p>
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
            <button
              type="button"
              className="govuk-button govuk-button--secondary"
              data-module="govuk-button"
              onClick={() => history.push('/manage-voyage-plans')}
            >
              View existing voyage plans
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
