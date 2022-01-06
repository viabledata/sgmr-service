import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { deleteItem, getData } from '@utils/apiHooks';
import { formatUIDate } from '@utils/date';
import { USER_VOYAGE_REPORT_URL, VOYAGE_REPORT_URL } from '@constants/ApiConstants';
import { EDIT_VOYAGE_CHECK_DETAILS_URL } from '@constants/ClientConstants';

const ManageReports = (pageData) => {
  document.title = 'Manage reports';

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

  useEffect(() => {
    setTabData(tabs);
    getReportList();
  }, [pageData]);

  if (!pageData || !tabData || tabData.length === 0) { return null; }
  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <h1 className="govuk-heading-l">Manage your reports</h1>
        <p className="govuk-body-l">
          Click on one of your reports below to view, edit, cancel or delete it, depending on its status. For example, you can edit a draft or submitted report, but you
          can&apos;t edit a cancelled report.
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
                      setActiveTab(e);
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
            <table className="govuk-table">
              <thead className="govuk-table__head">
                <tr className="govuk-table__row">
                  <th scope="col" className="govuk-table__header">Vessel</th>
                  <th scope="col" className="govuk-table__header">Departure date</th>
                  <th scope="col" className="govuk-table__header">Departure port</th>
                  <th scope="col" className="govuk-table__header">Arrival port</th>
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
                        <td className="govuk-table__cell">{voyage.departurePort}</td>
                        <td className="govuk-table__cell">{voyage.arrivalPort}</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManageReports;
