import React from 'react';

const VesselTable = (data) => {
  // console.log(sourceForm)
  console.log(data);
  return (
    <table className="table-clickable govuk-table">
      <thead className="govuk-table__head">
        <tr className="govuk-table__row">
          {data.checkboxes === 'true' && (
          <th className="govuk-table__header">
              &nbsp;
          </th>
          )}
          <th className="govuk-table__header">Vessel name</th>
          <th className="govuk-table__header">Vessel type</th>
          <th className="govuk-table__header">Usual moorings</th>
        </tr>
      </thead>
      <tbody className="govuk-table__body">
        <tr className="govuk-table__row">
          {data.checkboxes === 'true' && (
          <td className="govuk-table__cell multiple-choice--hod">
            <div className="govuk-checkboxes__item">
              <input type="checkbox" className="govuk-checkboxes__input jsCheckbox" id="radio-1" />
              <label className="govuk-label govuk-checkboxes__label" htmlFor="radio-1">&nbsp;</label>
            </div>
          </td>
          )}
          <td className="govuk-table__cell">Baroness</td>
          <td className="govuk-table__cell">Yacht</td>
          <td className="govuk-table__cell">Lee-on-Solent</td>
        </tr>
      </tbody>
    </table>
  );
};

export default VesselTable;
