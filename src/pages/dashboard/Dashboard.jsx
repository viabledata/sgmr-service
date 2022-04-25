import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { USER_URL, USER_VOYAGE_REPORT_URL, VOYAGE_REPORT_URL } from '../../constants/ApiConstants';
import { deleteItem, getData } from '../../utils/v2ApiHooks';
import ErrorSummary from '../../components-v2/ErrorSummary';
import OnboardingBanner from '../onboarding/OnboardingBanner';
import WelcomeBanner from '../../components/WelcomeBanner';

const Dashboard = () => {
  const history = useHistory();
  const [errors, setErrors] = useState();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userData, setUserData] = useState();
  const [voyageStatusCounts, setVoyageStatusCounts] = useState({});
  document.title = 'Voyage plans';

  const calcVoyageCounts = (reports) => {
    const draftReportCount = reports.filter((voyage) => {
      return voyage.status.name === 'Draft';
    });
    const submittedReportCount = reports.filter((voyage) => {
      return (
        voyage.status.name === 'Submitted'
        || voyage.status.name === 'PreSubmitted'
        || voyage.status.name === 'Failed'
      );
    });
    const cancelledReportCount = reports.filter((voyage) => {
      return (
        voyage.status.name === 'Cancelled'
        || voyage.status.name === 'PreCancelled'
      );
    });
    setVoyageStatusCounts({
      draft: draftReportCount.length,
      submitted: submittedReportCount.length,
      cancelled: cancelledReportCount.length,
    });
  };

  const getReportList = async (currentPage, array, totalPages) => {
    const lastPage = !totalPages ? 1 : totalPages;

    if (currentPage > lastPage) {
      calcVoyageCounts(array);
    } else {
      const resp = await getData(`${USER_VOYAGE_REPORT_URL}?page=${currentPage}`);
      if (!resp.errors) {
        resp.data.items.map((item) => {
          if (!item.departureDate && !item.departureTime && !item.departurePort) {
            deleteItem(`${VOYAGE_REPORT_URL}/${item.id}`);
          } else {
            array.push(item);
          }
        });
        const nextPage = currentPage + 1;
        getReportList(nextPage, array, resp.data._meta.totalPages);
      } else {
        setErrors(resp);
      }
    }
  };

  const getUserDetails = async () => {
    const user = await getData(USER_URL);
    if (!user.errors) {
      setUserData(user.data);
    } else {
      setErrors(user);
    }
  };

  useEffect(() => {
    if (userData && Object.keys(voyageStatusCounts).length > 0) {
      const totalVoyages = Object.values(voyageStatusCounts).reduce((a, b) => a + b);
      setShowOnboarding(userData.people.length === 0 && userData.vessels.length === 0 && totalVoyages === 0);
    }
  }, [userData, voyageStatusCounts, setShowOnboarding]);

  useEffect(() => {
    getUserDetails();
    getReportList(1, []);
  }, [setUserData, setVoyageStatusCounts]);

  if (errors) { return (<ErrorSummary errors={{ helpError: 'View help page' }} />); }
  if (!userData || !voyageStatusCounts) { return null; }
  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <WelcomeBanner user={userData.firstName} />
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
                  <strong className="panel-number-large" data-testid="draft-count">{voyageStatusCounts?.draft}</strong>
                  Draft
                </p>
              </div>
              <div className="govuk-grid-column-one-third panel-number">
                <p className="govuk-body-s">
                  <strong className="panel-number-large" data-testid="submitted-count">{voyageStatusCounts?.submitted}</strong>
                  Submitted
                </p>
              </div>
              <div className="govuk-grid-column-one-third panel-number">
                <p className="govuk-body-s">
                  <strong className="panel-number-large" data-testid="cancelled-count">{voyageStatusCounts?.cancelled}</strong>
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
