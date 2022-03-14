import React from 'react';
import { Link } from 'react-router-dom';

const VesselTable = ({
  vesselData, checkboxes, link, handleCheckboxes,
}) => {
  return (
    <table className="table-clickable govuk-table">
      <thead className="govuk-table__head">
        <tr className="govuk-table__row" role="row">
          {checkboxes === 'true' && (
          <th className="govuk-table__header">
              &nbsp;
          </th>
          )}
          <th className="govuk-table__header">Pleasure craft name</th>
          <th className="govuk-table__header">Pleasure craft type</th>
          <th className="govuk-table__header">Usual moorings</th>
        </tr>
      </thead>
      <tbody className="govuk-table__body">
        {vesselData.map((vessel) => {
          return (
            <tr className="govuk-table__row" key={vessel.id} role="row">
              {checkboxes === 'true' && (
              <td className="govuk-table__cell multiple-choice--hod" role="cell">
                <div className="govuk-checkboxes__item">
                  <label className="govuk-label govuk-checkboxes__label" htmlFor={vessel.id}>
                    <input
                      type="checkbox"
                      className="govuk-checkboxes__input jsCheckbox"
                      id={vessel.id}
                      onChange={(e) => handleCheckboxes(e)}
                      name="vessel"
                      aria-labelledby="vesselLabel"
                    />
                    <span className="govuk-visually-hidden">{vessel.vesselName}</span>
                  </label>
                </div>
              </td>
              )}
              {link === 'true'
                && (
                <td className="govuk-table__cell" role="cell">
                  <span className="responsive-table__heading" aria-hidden="true">
                    Pleasure craft name
                  </span>
                  <Link
                    to={`/pleasure-crafts/${vessel.id}`}
                    aria-label={`Edit the ${vessel.vesselType} named ${vessel.vesselName}`}
                  >
                    {vessel.vesselName}
                  </Link>
                </td>
                ) }
              {link !== 'true' && (
              <td className="govuk-table__cell" role="cell">
                <span className="responsive-table__heading" aria-hidden="true">
                  Pleasure craft name
                </span>
                <span>{vessel.vesselName}</span>
              </td>
              ) }
              <td className="govuk-table__cell" role="cell">
                <span className="responsive-table__heading" aria-hidden="true">
                  Pleasure craft type
                </span>
                {vessel.vesselType}
              </td>
              <td className="govuk-table__cell" role="cell">
                <span className="responsive-table__heading" aria-hidden="true">
                  Usual moorings
                </span>
                {vessel.moorings}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default VesselTable;
