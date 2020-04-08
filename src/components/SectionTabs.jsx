import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// App imports
import { formatUIDate } from '@utils/date';
import { fetchReportsRoutine } from '@state/reports';


const SectionTabs = ({
  pageData, fetchReportsTriggerAction, reports,
}) => {
  const [tabData, setTabData] = useState([]);
  const [tableName, setTableName] = useState('Draft');
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
    const tempArr = [...tabData];
    tempArr.map((elem) => {
      if (e.target.id === elem.name) {
        elem.active = true;
        setTableName(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1));
      } else {
        elem.active = false;
      }
    });
    setTabData(tempArr);
  };

  useEffect(() => {
    setTabData(tabs);
    fetchReportsTriggerAction();
  }, [pageData]);

  if (!pageData || !tabData || tabData.length === 0 || !reports.list) { return null; }

  return (
    <div className="govuk-width-container">
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
              {reports.list.items && reports.list.items.map((voyage) => {
                if (voyage.status.name === tableName) {
                  return (
                    <tr className="govuk-table__row" key={voyage.id}>
                      <td className="govuk-table__cell">{voyage.vesselName}</td>
                      <td className="govuk-table__cell">{formatUIDate(voyage.departureDate)}</td>
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

SectionTabs.propTypes = {
  fetchReportsTriggerAction: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  reports: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchReportsTriggerAction: () => dispatch(fetchReportsRoutine.trigger()),
});
const mapStateToProps = ({ reports }) => ({ reports });
export default connect(mapStateToProps, mapDispatchToProps)(SectionTabs);
