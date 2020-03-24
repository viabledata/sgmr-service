import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

// App imports
import { USER_VOYAGE_REPORT_URL } from 'Constants/ApiConstants';
import Auth from 'Auth';
import { fetchReportsRoutine } from 'State/reports';


const SectionTabs = ({
  fetchReportsTriggerAction, reports
}) => {

  const [tabData, setTabData] = useState([]);
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
      } else {
        elem.active = false;
      }
    });
    setTabData(tempArr);
  };

  useEffect(() => {
    setTabData(tabs);
    fetchReportsTriggerAction();
  }, []);


  // if (!reports.list) { return null; }

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
          {tabData.map((elem, i) => {
            return (
              <li
                key={i}
                className={elem.active === true ? 'govuk-tabs__list-item govuk-tabs__list-item--selected' : 'govuk-tabs__list-item'}
                onClick={(e) => setActiveTab(e)}
              >
                <p id={elem.name} className="govuk-tabs__tab">
                  {elem.text}
                </p>
              </li>
            );
          })}
        </ul>

        {/* <div className="govuk-tabs__panel" id={data[0].section}>
          <h2 className="govuk-heading-l">{data[0].text}</h2>
          <table className="govuk-table">
            <thead className="govuk-table__head">
              <tr className="govuk-table__row">
                {data[0].headings.map((elem, i) => {
                  return (
                    <th key={i} scope="col" className="govuk-table__header">{elem}</th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {data[0].items.map((elem, i) => {
                return (
                  <tr className="govuk-table__row" key={i}>
                    <td className="govuk-table__cell">{elem.name}</td>
                    <td className="govuk-table__cell">{elem.departureDate}</td>
                    <td className="govuk-table__cell">{elem.departureTime}</td>
                    <td className="govuk-table__cell">{elem.departurePort}</td>
                    <td className="govuk-table__cell">{elem.arrivalPort}</td>
                    <td className="govuk-table__cell">{elem.submissionRef}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div> */}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchReportsTriggerAction: () => dispatch(fetchReportsRoutine.trigger()),
});
const mapStateToProps = ({ reports }) => ({ reports });
export default connect(mapStateToProps, mapDispatchToProps)(SectionTabs);
