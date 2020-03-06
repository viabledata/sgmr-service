import React, { useState, useEffect } from 'react';
// This page is currently hard coded for /reports only

const SectionTabs = (props) => {
  const [data, setData] = useState();
  const [tabData, setTabData] = useState([]);

  // Temp data until connect to API
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

  // Get data from API


  const setActiveTab = (e) => {
    const tempArr = [...tabData];
    tempArr.map((elem, i) => {
      if (e.target.id === elem.name) {
        elem.active = true;
        document.activeElement.blur();
      } else {
        elem.active = false;
      }
    });
    setTabData(tempArr);
  };

  useEffect(() => {
    setTabData(tabs);
  }, []);

  return (
    <div className="govuk-width-container">
      <div className="govuk-tabs" data-module="govuk-tabs">
        {/* The h2 is only visible on small screens (GDS controlled) */}
        <h2 className="govuk-tabs__title">
          Contents
        </h2>

        <ul className="govuk-tabs__list">
          {tabData.map((elem, i) => {
            return (
              <li
                key={i}
                className={elem.active === true ? 'govuk-tabs__list-item govuk-tabs__list-item--selected' : 'govuk-tabs__list-item'}
                onClick={(e) => setActiveTab(e)}
              >
                <a id={elem.name} className="govuk-tabs__tab" href={`#${elem.name}`}>
                  {elem.text}
                </a>
              </li>
            );
          })}
        </ul>

{/* 
        <div className="govuk-tabs__panel" id="past-day">
          <h2 className="govuk-heading-l">Past day</h2>
          <table className="govuk-table">
            <thead className="govuk-table__head">
              <tr className="govuk-table__row">
                <th scope="col" className="govuk-table__header">Case manager</th>
                <th scope="col" className="govuk-table__header">Cases opened</th>
                <th scope="col" className="govuk-table__header">Cases closed</th>
              </tr>
            </thead>
            <tbody className="govuk-table__body">
              <tr className="govuk-table__row">
                <td className="govuk-table__cell">David Francis</td>
                <td className="govuk-table__cell">3</td>
                <td className="govuk-table__cell">0</td>
              </tr>
              <tr className="govuk-table__row">
                <td className="govuk-table__cell">Paul Farmer</td>
                <td className="govuk-table__cell">1</td>
                <td className="govuk-table__cell">0</td>
              </tr>
              <tr className="govuk-table__row">
                <td className="govuk-table__cell">Rita Patel</td>
                <td className="govuk-table__cell">2</td>
                <td className="govuk-table__cell">0</td>
              </tr>
            </tbody>
          </table>

        </div>
        <div className="govuk-tabs__panel govuk-tabs__panel--hidden" id="past-week">
          <h2 className="govuk-heading-l">Past week</h2>
          <table className="govuk-table">
            <thead className="govuk-table__head">
              <tr className="govuk-table__row">
                <th scope="col" className="govuk-table__header">Case manager</th>
                <th scope="col" className="govuk-table__header">Cases opened</th>
                <th scope="col" className="govuk-table__header">Cases closed</th>
              </tr>
            </thead>
            <tbody className="govuk-table__body">
              <tr className="govuk-table__row">
                <td className="govuk-table__cell">David Francis</td>
                <td className="govuk-table__cell">24</td>
                <td className="govuk-table__cell">18</td>
              </tr>
              <tr className="govuk-table__row">
                <td className="govuk-table__cell">Paul Farmer</td>
                <td className="govuk-table__cell">16</td>
                <td className="govuk-table__cell">20</td>
              </tr>
              <tr className="govuk-table__row">
                <td className="govuk-table__cell">Rita Patel</td>
                <td className="govuk-table__cell">24</td>
                <td className="govuk-table__cell">27</td>
              </tr>
            </tbody>
          </table>

        </div>
        <div className="govuk-tabs__panel govuk-tabs__panel--hidden" id="past-month">
          <h2 className="govuk-heading-l">Past month</h2>
          <table className="govuk-table">
            <thead className="govuk-table__head">
              <tr className="govuk-table__row">
                <th scope="col" className="govuk-table__header">Case manager</th>
                <th scope="col" className="govuk-table__header">Cases opened</th>
                <th scope="col" className="govuk-table__header">Cases closed</th>
              </tr>
            </thead>
            <tbody className="govuk-table__body">
              <tr className="govuk-table__row">
                <td className="govuk-table__cell">David Francis</td>
                <td className="govuk-table__cell">98</td>
                <td className="govuk-table__cell">95</td>
              </tr>
              <tr className="govuk-table__row">
                <td className="govuk-table__cell">Paul Farmer</td>
                <td className="govuk-table__cell">122</td>
                <td className="govuk-table__cell">131</td>
              </tr>
              <tr className="govuk-table__row">
                <td className="govuk-table__cell">Rita Patel</td>
                <td className="govuk-table__cell">126</td>
                <td className="govuk-table__cell">142</td>
              </tr>
            </tbody>
          </table>

        </div>
        <div className="govuk-tabs__panel govuk-tabs__panel--hidden" id="past-year">
          <h2 className="govuk-heading-l">Past year</h2>
          <table className="govuk-table">
            <thead className="govuk-table__head">
              <tr className="govuk-table__row">
                <th scope="col" className="govuk-table__header">Case manager</th>
                <th scope="col" className="govuk-table__header">Cases opened</th>
                <th scope="col" className="govuk-table__header">Cases closed</th>
              </tr>
            </thead>
            <tbody className="govuk-table__body">
              <tr className="govuk-table__row">
                <td className="govuk-table__cell">David Francis</td>
                <td className="govuk-table__cell">1380</td>
                <td className="govuk-table__cell">1472</td>
              </tr>
              <tr className="govuk-table__row">
                <td className="govuk-table__cell">Paul Farmer</td>
                <td className="govuk-table__cell">1129</td>
                <td className="govuk-table__cell">1083</td>
              </tr>
              <tr className="govuk-table__row">
                <td className="govuk-table__cell">Rita Patel</td>
                <td className="govuk-table__cell">1539</td>
                <td className="govuk-table__cell">1265</td>
              </tr>
            </tbody>
          </table>

        </div> */}
      </div>
    </div>
  );
};

export default SectionTabs;
