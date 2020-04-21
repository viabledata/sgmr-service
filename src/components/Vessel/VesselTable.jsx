import React from 'react';
import { Link } from 'react-router-dom';

const VesselTable = (data) => {
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
        {data.vesselData.map((vessel) => {
          return (
            <tr className="govuk-table__row" key={vessel.id}>
              {data.checkboxes === 'true' && (
              <td className="govuk-table__cell multiple-choice--hod">
                <div className="govuk-checkboxes__item">
                  <input type="checkbox" className="govuk-checkboxes__input jsCheckbox" id={vessel.id} />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor={vessel.id}>&nbsp;</label>
                </div>
              </td>
              )}
              {data.link === 'true'
                && (
                <td className="govuk-table__cell">
                  <Link to={{
                    pathname: '/vessels/edit-vessel',
                    state: { vesselId: vessel.id },
                  }}
                  >
                    {vessel.vesselName}
                  </Link>
                </td>
                ) }
              {data.link !== 'true' && <td className="govuk-table__cell">{vessel.vesselName}</td> }
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
