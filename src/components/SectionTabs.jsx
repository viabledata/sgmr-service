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
        <div className="govuk-grid-column-full">
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
      </div>
      <hr className="govuk-section-break govuk-section-break--visible govuk-section-break--xl govuk-!-margin-top-0" />
      <h2 className="govuk-heading-l">Manage Advanced Voyage Reports</h2>
      <p>You can view, edit, cancel or delete reports dependant on the status of the report.</p>
      <div className="govuk-tabs" data-module="govuk-tabs">
        {/* The h3 is only visible on small screens (GDS controlled) */}
        <h3 className="govuk-tabs__title">
          Contents
        </h3>

        <ul className="govuk-tabs__list">
          {tabData && tabData.map((tab) => {
            return (
              <li
                key={tab.name}
                className={tab.active === true ? 'govuk-tabs__list-item govuk-tabs__list-item--selected' : 'govuk-tabs__list-item'}
                onClick={(e) => setActiveTab(e)}
              >
                <p id={tab.name} className="govuk-tabs__tab">
                  {tab.text}
                </p>
              </li>
            );
          })}
        </ul>

        <div className="govuk-tabs__panel">
          <h2 className="govuk-heading-l">{tableName}</h2>
          <table className="govuk-table">
            <thead className="govuk-table__head">
              <tr className="govuk-table__row">
                <th scope="col" className="govuk-table__header">Vessel</th>
                <th scope="col" className="govuk-table__header">Departure date</th>
                <th scope="col" className="govuk-table__header">Departure time</th>
                <th scope="col" className="govuk-table__header">Departure port</th>
                <th scope="col" className="govuk-table__header">Arrival port</th>
                <th scope="col" className="govuk-table__header">Submission reference</th>
              </tr>
            </thead>
            <tbody>
              {reportList && reportList.map((voyage) => {
                if (voyage.status.name === tableName || voyage.status.name === `Pre${tableName}`) {
                  return (
                    <tr className="govuk-table__row" key={voyage.id}>
                      <td className="govuk-table__cell">
                        <Link to={{
                          pathname: EDIT_VOYAGE_CHECK_DETAILS_URL,
                          state: { voyageId: voyage.id },
                        }}
                        >
                          {voyage.vesselName}
                        </Link>
                      </td>
                      <td className="govuk-table__cell">
                        <Link to={{
                          pathname: EDIT_VOYAGE_CHECK_DETAILS_URL,
                          state: { voyageId: voyage.id },
                        }}
                        >
                          {formatUIDate(voyage.departureDate)}
                        </Link>
                      </td>
                      <td className="govuk-table__cell">{voyage.departureTime}</td>
                      <td className="govuk-table__cell">{voyage.departurePort}</td>
                      <td className="govuk-table__cell">{voyage.arrivalPort}</td>
                      <td className="govuk-table__cell">{voyage.submissionRef}</td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export default SectionTabs;
