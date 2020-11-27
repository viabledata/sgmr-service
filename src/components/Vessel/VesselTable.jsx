import React from 'react';
import { Link } from 'react-router-dom';

const VesselTable = ({ vesselData, checkboxes, link, handleCheckboxes }) => {
  return (
    <table className="table-clickable govuk-table">
      <thead className="govuk-table__head">
        <tr className="govuk-table__row">
          {checkboxes === 'true' && (
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
        {vesselData.map((vessel) => {
          return (
            <tr className="govuk-table__row" key={vessel.id}>
              {checkboxes === 'true' && (
              <td className="govuk-table__cell multiple-choice--hod">
                <div className="govuk-checkboxes__item">
                  <input
                    type="checkbox"
                    className="govuk-checkboxes__input jsCheckbox"
                    id={vessel.id}
                    onChange={(e) => handleCheckboxes(e)}
                    name="vessel"
                  />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor={vessel.id}>&nbsp;</label>
                </div>
              </td>
              )}
              {link === 'true'
                && (
                <td className="govuk-table__cell">
                  <Link to={`/vessels/${vessel.id}`}>
                    {vessel.vesselName}
                  </Link>
                </td>
                ) }
              {link !== 'true' && <td className="govuk-table__cell">{vessel.vesselName}</td> }
              <td className="govuk-table__cell">{vessel.vesselType}</td>
              <td className="govuk-table__cell">{vessel.moorings}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default VesselTable;
