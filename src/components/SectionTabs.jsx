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
  const tabledraft = [
    {
      section: 'draft',
      text: 'Draft',
      headings: [
        'Vessel',
        'Departure date',
        'Departure time',
        'Departure port',
        'Arrival port',
        'Submission reference',
      ],
      items: [
        {
          id: '05b21e40-cbee-46be-8d61-b24978f32b24',
          name: 'In Deep Ship',
          departureDate: '10/01/20',
          departureTime: '11:00',
          departurePort: 'GB PME',
          arrivalPort: 'FR BOD',
          submissionRef: '',
          status: 'draft',
        },
        {
          id: '05b21e40-cbee-46be-8d61-b24978f32b24',
          name: 'Serenity',
          departureDate: '10/01/20',
          departureTime: '12:00',
          departurePort: 'GB PME',
          arrivalPort: 'FR BOD',
          SubmissionRef: '',
          status: 'draft',
        },
        {
          id: '05b21e40-cbee-46be-8d61-b24978f32b24',
          name: 'Baroness',
          departureDate: '10/01/20',
          departureTime: '15:00',
          departurePort: 'GB PME',
          arrivalPort: 'FR BOD',
          SubmissionRef: '',
          status: 'draft',
        },
        {
          id: '05b21e40-cbee-46be-8d61-b24978f32b24',
          name: 'Baroness',
          departureDate: '10/01/20',
          departureTime: '15:00',
          departurePort: 'GB PME',
          arrivalPort: 'FR BOD',
          SubmissionRef: '456873fhyg9kud87',
          status: 'submitted',
        },
        {
          id: '05b21e40-cbee-46be-8d61-b24978f32b24',
          name: 'Baroness',
          departureDate: '10/01/20',
          departureTime: '15:00',
          departurePort: 'GB PME',
          arrivalPort: 'FR BOD',
          SubmissionRef: 'fdr5suhy798s543o',
          status: 'submitted',
        },
        {
          id: '05b21e40-cbee-46be-8d61-b24978f32b24',
          name: 'Baroness',
          departureDate: '10/01/20',
          departureTime: '15:00',
          departurePort: 'GB PME',
          arrivalPort: 'FR BOD',
          SubmissionRef: '',
          status: 'cancelled',
        },
      ],
    },
  ];
  const tablesubmitted = [
    {
      section: 'submitted',
      text: 'Submitted',
      headings: [
        'Vessel',
        'Departure date',
        'Departure time',
        'Departure port',
        'Arrival port',
        'Submission reference',
      ],
      items: [
        {
          id: '05b21e40-cbee-46be-8d61-b24978f32b24',
          name: 'Baroness',
          departureDate: '10/01/20',
          departureTime: '15:00',
          departurePort: 'GB PME',
          arrivalPort: 'FR BOD',
          SubmissionRef: '',
          status: 'draft',
        },
        {
          id: '05b21e40-cbee-46be-8d61-b24978f32b24',
          name: 'Baroness',
          departureDate: '10/01/20',
          departureTime: '15:00',
          departurePort: 'GB PME',
          arrivalPort: 'FR BOD',
          SubmissionRef: '456873fhyg9kud87',
          status: 'submitted',
        },
      ],
    },
  ];
  const tablecancelled = [
    {
      section: 'cancelled',
      text: 'Cancelled',
      headings: [
        'Vessel',
        'Departure date',
        'Departure time',
        'Departure port',
        'Arrival port',
        'Submission reference',
      ],
      items: [
        {
          id: '05b21e40-cbee-46be-8d61-b24978f32b24',
          name: 'Baroness',
          departureDate: '10/01/20',
          departureTime: '15:00',
          departurePort: 'GB PME',
          arrivalPort: 'FR BOD',
          SubmissionRef: '',
          status: 'cancelled',
        },
      ],
    },
  ];

  // Get data from API


  const setActiveTab = (e) => {
    const tempArr = [...tabData];
    let tableName;
    switch (e.target.id) {
      case 'draft': tableName = tabledraft; break;
      case 'submitted': tableName = tablesubmitted; break;
      case 'cancelled': tableName = tablecancelled; break;
      default: tableName = tabledraft;
    }
    tempArr.map((elem, i) => {
      if (e.target.id === elem.name) {
        elem.active = true;
        setData(tableName);
      } else {
        elem.active = false;
      }
    });
    setTabData(tempArr);
  };

  useEffect(() => {
    setTabData(tabs);
    setData(tabledraft);
  }, []);

  if (!data) { return (<></>); }
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

        <div className="govuk-tabs__panel" id={data[0].section}>
          <h2 className="govuk-heading-l">{data[0].text}</h2>
        </div>

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
