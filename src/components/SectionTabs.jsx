import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

// App imports
import { deleteItem, getData, postData } from '@utils/apiHooks';
import { formatUIDate } from '@utils/date';
import { USER_VOYAGE_REPORT_URL, VOYAGE_REPORT_URL } from '@constants/ApiConstants';
import { EDIT_VOYAGE_CHECK_DETAILS_URL } from '@constants/ClientConstants';


const SectionTabs = (pageData) => {
  const history = useHistory();
  const [tabData, setTabData] = useState([]);
  const [tableName, setTableName] = useState('Draft');
  const [reportList, setReportList] = useState();
  const tabs = [
    {
      name: 'draft',
      text: 'Draft',
      active: true,
    },
    {
      name: 'submitted',
      text: 'Submitted',
      active: false,
    }, {
      name: 'cancelled',
      text: 'Cancelled',
      active: false,
    },
  ];


  const setActiveTab = (e) => {
    const tabArray = [...tabData];
    tabArray.map((elem) => {
      if (e.target.id === elem.name) {
        elem.active = true;
        setTableName(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1));
      } else {
        elem.active = false;
      }
    });
    setTabData(tabArray);
  };


  const getReportList = () => {
    let validReports = [];
    getData(USER_VOYAGE_REPORT_URL)
      .then((resp) => {
        if (!resp.errors) {
          resp.items.map((report) => {
            if (!report.departureDate && !report.departureTime && !report.departurePort) {
              deleteItem(`${VOYAGE_REPORT_URL}/${report.id}`);
            } else {
              validReports.push(report);
            }
          });
          setReportList(validReports);
        }
      });
  };


  const handleStart = () => {
    postData(USER_VOYAGE_REPORT_URL, null, 'reports')
      .then((resp) => {
        history.push({
          pathname: '/save-voyage/page-1',
          state: { voyageId: resp.id },
        });
      });
  };


  useEffect(() => {
    setTabData(tabs);
    getReportList();
  }, [pageData]);


  if (!pageData || !tabData || tabData.length === 0) { return null; }

  return (
    <div className="govuk-width-container">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-half">
          <h2 className="govuk-heading-m">Create a new notification</h2>
          <p className="govuk-body">You can use the online form to create and submit an Advance Voyage Notification to UK Border Force.</p>
          <button
            type="button"
            className="govuk-button govuk-button--start"
            data-module="govuk-button"
            onClick={handleStart}
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
          <h2 className="govuk-heading-m">Manage existing notifications</h2>
          <p className="govuk-body">View your notifications to edit, cancel or delete them, depending on its status.</p>
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-third panel-number">
              <p className="govuk-body-s">
                <strong className="panel-number-large">4</strong>
                Draft
              </p>
            </div>
            <div className="govuk-grid-column-one-third panel-number">
              <p className="govuk-body-s">
                <strong className="panel-number-large">11</strong>
                Submitted
              </p>
            </div>
            <div className="govuk-grid-column-one-third panel-number">
              <p className="govuk-body-s">
                <strong className="panel-number-large">1</strong>
                Cancelled
              </p>
            </div>
          </div>
          <Link className="govuk-link govuk-body" to="/manage-notifications">View existing notifications</Link>
        </div>
      </div>
    </div>
  );
};


export default SectionTabs;
