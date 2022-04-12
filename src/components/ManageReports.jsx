import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { USER_VOYAGE_REPORT_URL, VOYAGE_REPORT_URL } from '../constants/ApiConstants';
import { EDIT_VOYAGE_CHECK_DETAILS_URL } from '../constants/ClientConstants';
import { pageSizeParam } from '../lib/config';
import { deleteItem, getData } from '../utils/apiHooks';
import { formatUIDate } from '../utils/date';
import Pagination from './Pagination';
import LoadingSpinner from './LoadingSpinner';

const ManageReports = (pageData) => {
  document.title = 'Manage voyage plans';

  const [tabData, setTabData] = useState([]);
  const [tableName, setTableName] = useState('Draft');
  const [reportList, setReportList] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState('');
  const [isLoading, setIsLoading] = useState(true);
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

  const pageSize = 10;
  let reportStatus;

  const createActiveTab = (e) => {
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
    setCurrentPage(1);
  };

  const voyageReportStatus = () => {
    if (tableName === 'Draft') {
      reportStatus = 'status=Draft';
    }
    if (tableName === 'Submitted') {
      // Failed reports count as submitted, as the user does not need to know about failed voyage plan submissions
      reportStatus = 'status=Submitted&status=PreSubmitted&status=Failed';
    }
    if (tableName === 'Cancelled') {
      reportStatus = 'status=Cancelled&status=PreCancelled';
    }
    return reportStatus;
  };

  const getReportList = () => {
    const validReports = [];
    getData(`${USER_VOYAGE_REPORT_URL}?${pageSizeParam}&page=${currentPage}&${reportStatus}`)
      .then((resp) => {
        setTotalCount(resp._meta.totalItems);
        if (!resp.errors) {
          resp.items.map((report) => {
            if (!report.departureDate && !report.departureTime && !report.departurePort) {
              deleteItem(`${VOYAGE_REPORT_URL}/${report.id}`);
            } else {
              validReports.push(report);
            }
          });
          setReportList(validReports);
          setIsLoading(false);
        }
      });
  };

  // Sets tab data on load & ensures session data clear
  useEffect(() => {
    setTabData(tabs);
    sessionStorage.removeItem('formData');
  }, [pageData]);

  // Calls api whenever tableName or currentPage changes
  useEffect(() => {
    setIsLoading(true);
    voyageReportStatus();
    getReportList();
  }, [tableName, currentPage]);

  if (!pageData || !tabData || tabData.length === 0) { return null; }
  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <h1 className="govuk-heading-l">Manage your voyage plans</h1>
        <p className="govuk-body-l">
          Click on one of your voyage plans below to view, edit, cancel or delete it, depending on its status. For example, you can edit a draft or submitted voyage plan, but you
          can&apos;t edit a cancelled voyage plan.
        </p>
        <div className="govuk-tabs" data-module="govuk-tabs">
          <ul className="govuk-tabs__list">
            {tabData && tabData.map((tab) => {
              return (
                <li
                  key={tab.name}
                  className={tab.active ? 'govuk-tabs__list-item govuk-tabs__list-item--selected' : 'govuk-tabs__list-item'}
                >
                  <a
                    href={`#${tab.name}`}
                    id={tab.name}
                    className="govuk-tabs__tab"
                    onClick={(e) => {
                      createActiveTab(e);
                      e.preventDefault();
                    }}
                  >
                    {tab.text}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="govuk-tabs__panel">
            <h2 className="govuk-heading-l">{tableName}</h2>
            <LoadingSpinner loading={isLoading} />
            {!isLoading
              && (
                <table className="govuk-table">
                  <thead className="govuk-table__head">
                    <tr className="govuk-table__row" role="row">
                      <th scope="col" className="govuk-table__header">Pleasure craft</th>
                      <th scope="col" className="govuk-table__header">Departure date</th>
                      <th scope="col" className="govuk-table__header">Departure port</th>
                      <th scope="col" className="govuk-table__header">Arrival port</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportList && reportList.map((voyage) => {
                      return (
                        <tr className="govuk-table__row" key={voyage.id} role="row">
                          <td className="govuk-table__cell" role="cell">
                            <span className="responsive-table__heading" aria-hidden="true">
                              Pleasure craft
                            </span>
                            <Link
                              className="govuk-link"
                              to={{
                                pathname: EDIT_VOYAGE_CHECK_DETAILS_URL,
                                state: { voyageId: voyage.id },
                              }}
                              aria-label={
                                `Open voyage for ${voyage.vesselName}, departure on ${formatUIDate(voyage.departureDate)}, 
                                departure port ${voyage.departurePort}, arrival port ${voyage.arrivalPort}`
                              }
                            >
                              {voyage.vesselName}
                            </Link>
                          </td>
                          <td className="govuk-table__cell" role="cell">
                            <span className="responsive-table__heading" aria-hidden="true">
                              Departure date
                            </span>
                            <Link
                              className="govuk-link"
                              to={{
                                pathname: EDIT_VOYAGE_CHECK_DETAILS_URL,
                                state: { voyageId: voyage.id },
                              }}
                              aria-label={
                                `Open voyage for ${voyage.vesselName}, departure on ${formatUIDate(voyage.departureDate)}, 
                                departure port ${voyage.departurePort}, arrival port ${voyage.arrivalPort}`
                              }
                            >
                              {formatUIDate(voyage.departureDate)}
                            </Link>
                          </td>
                          <td className="govuk-table__cell" role="cell">
                            <span className="responsive-table__heading" aria-hidden="true">
                              Departure port
                            </span>
                            {voyage.departurePort}
                          </td>
                          <td className="govuk-table__cell" role="cell">
                            <span className="responsive-table__heading" aria-hidden="true">
                              Arrival port
                            </span>
                            {voyage.arrivalPort}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
          </div>
          <Pagination
            currentPage={currentPage}
            totalCount={totalCount}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </main>
    </div>
  );
};

export default ManageReports;
