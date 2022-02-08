import React, { useEffect, useState } from 'react';

const PeopleTable = ({ peopleData, onSelectionChange = () => {} }) => {
  const [peopleToRemove, setPeopleToRemove] = useState([]);

  useEffect(() => {
    onSelectionChange(peopleToRemove);
  }, [peopleToRemove]);

  const handleCheckboxes = (e) => {
    let checkedPeople = [...peopleToRemove];
    if (e.target.checked) {
      checkedPeople.push(e.target.value);
    } else {
      checkedPeople = checkedPeople.filter((personId) => personId !== e.target.value);
    }
    setPeopleToRemove(checkedPeople);
  };

  return (
    <table className="table-clickable govuk-table">
      <thead className="govuk-table__head">
        <tr className="govuk-table__row" role="row">
          <th
            width={1}
            className="govuk-table__header  multiple-choice--hod"
          />
          <th className="govuk-table__header">Last name</th>
          <th className="govuk-table__header">First name</th>
        </tr>
      </thead>

      <tbody className="govuk-table__body">
        {peopleData.map((person) => {
          return (
            <tr className="govuk-table__row" key={person.id} role="row">
              <td className="govuk-table__cell multiple-choice--hod" role="cell">
                <div className="govuk-checkboxes__item">
                  <input
                    type="checkbox"
                    className="govuk-checkboxes__input"
                    value={person.id}
                    onChange={handleCheckboxes}
                    name="people"
                    checked={peopleToRemove.includes(person.id)}
                  />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor={person.id}>&nbsp;</label>
                </div>
              </td>
              <td className="govuk-table__cell" role="cell">
                <span className="responsive-table__heading" aria-hidden="true">
                  Last name
                </span>
                {person.lastName}
              </td>
              <td className="govuk-table__cell" role="cell">
                <span className="responsive-table__heading" aria-hidden="true">
                  Pleasure craft type
                </span>
                {person.firstName}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PeopleTable;
