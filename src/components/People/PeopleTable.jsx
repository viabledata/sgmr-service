import React from 'react';
import { Link } from 'react-router-dom';


const PeopleTable = ({
  peopleData, checkboxes, link, handleCheckboxes,
}) => {
  return (
    <table className="table-clickable govuk-table">
      <thead className="govuk-table__head">
        <tr className="govuk-table__row">
          {checkboxes === 'true' && (
          <th className="govuk-table__header">
              &nbsp;
          </th>
          )}
          <th className="govuk-table__header">Surname</th>
          <th className="govuk-table__header">Given name</th>
        </tr>
      </thead>
      <tbody className="govuk-table__body">
        {peopleData.map((person) => {
          return (
            <tr className="govuk-table__row" key={person.id}>
              {checkboxes === 'true' && (
              <td className="govuk-table__cell multiple-choice--hod">
                <div className="govuk-checkboxes__item">
                  <input
                    type="checkbox"
                    className="govuk-checkboxes__input jsCheckbox"
                    id={person.id}
                    onChange={(e) => handleCheckboxes(e)}
                    name="people"
                  />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor={person.id}>&nbsp;</label>
                </div>
              </td>
              )}
              {link === 'true'
              && (
              <td className="govuk-table__cell">
                <Link to={{
                  pathname: '/people/edit-person',
                  state: { personId: person.id },
                }}
                >
                  {person.lastName}
                </Link>
              </td>
              ) }
              {link !== 'true' && <td className="govuk-table__cell">{person.lastName}</td> }
              <td className="govuk-table__cell">{person.firstName}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PeopleTable;
