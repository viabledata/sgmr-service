import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// App imports
import { PEOPLE_URL } from '../constants/ApiConstants';
import { getData } from '../utils/apiHooks';

const SectionTablePeople = ({ pageData }) => {
  document.title = 'People';

  const [peopleData, setPeopleData] = useState();
  const [titles, setTitles] = useState([]);

  const storeData = () => {
    getData(`${PEOPLE_URL}?pagination=false`)
      .then((resp) => { setPeopleData(resp); });
  };

  const getPersonType = (personType) => {
    switch (personType) {
      case 'Skipper':
        return 'Skipper';
      case 'Passenger':
        return 'Unpaid Crew';
      default:
        return 'Employed Crew';
    }
  };

  useEffect(() => {
    storeData();
    const { reportTitles } = pageData;
    setTitles(reportTitles);
  }, [pageData]);

  if (!peopleData) { return null; }
  return (
    <section>
      <div className="govuk-grid-column-full">
        <hr className="govuk-section-break govuk-section-break--visible govuk-section-break--xl govuk-!-margin-top-0" />
      </div>
      <div className="govuk-width-container">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-full">
            <h2 className="govuk-heading-l">
              Saved people
            </h2>
            {!peopleData.errors && (
            <table className="govuk-table">
              <thead className="govuk-table__head">
                <tr className="govuk-table__row" role="row">
                  {titles.map((elem) => {
                    return (
                      <th className="govuk-table__header" scope="col" key={elem}>{elem}</th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="govuk-table__body">
                {Object.entries(peopleData).map((person) => {
                  return (
                    <tr className="govuk-table__row" key={person[1].id} role="row">
                      <td className="govuk-table__cell" role="cell">
                        <span className="responsive-table__heading" aria-hidden="true">
                          Last Name
                        </span>
                        <Link to={{
                          pathname: '/people/edit-person',
                          state: { peopleId: person[1].id },
                        }}
                        >
                          {person[1].lastName}
                        </Link>
                      </td>
                      <td className="govuk-table__cell" role="cell">
                        <span className="responsive-table__heading" aria-hidden="true">
                          First Name
                        </span>
                        {person[1].firstName}
                      </td>
                      <td className="govuk-table__cell" role="cell">
                        <span className="responsive-table__heading" aria-hidden="true">
                          Type
                        </span>
                        {getPersonType(person[1].peopleType.name)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionTablePeople;
