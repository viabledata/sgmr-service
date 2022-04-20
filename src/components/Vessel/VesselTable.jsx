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
                  <input
                    type="checkbox"
                    className="govuk-checkboxes__input jsCheckbox"
                    id={vessel.id}
                    data-testid={vessel.id}
                    onChange={(e) => handleCheckboxes(e)}
                    name="vessel"
                  />
                  <span className="govuk-label govuk-checkboxes__label">&nbsp;</span>
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
                    className="govuk-link"
                    to={{
                      pathname: '/pleasure-crafts/edit-pleasure-craft/page-1',
                      state: { pleasureCraftId: vessel.id, source: 'edit' },
                    }}
                    aria-label={`Edit ${vessel.vesselType} named ${vessel.vesselName}`}
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
                <label htmlFor={vessel.id}>{vessel.vesselName}</label>
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
