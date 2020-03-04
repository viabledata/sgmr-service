import React from 'react';

// currently only works for Vessels due to hard coded data below. Will review when get to people

const SectionTable = ({ page, pageData }) => {
  return (
    <div className="govuk-width-container">
      <div className="govuk-grid-column-full">
        <h2 className="govuk-heading-l">Saved {pageData.pageHeading.toLowerCase()}</h2>
        <table className="govuk-table">
            <thead className="govuk-table__head">
                <tr className="govuk-table__row">
                    <th className="govuk-table__header" scope="col">Vessel name</th>
                    <th className="govuk-table__header" scope="col">Vessel type</th>
                    <th className="govuk-table__header" scope="col">Usual moorings</th>
                </tr>
            </thead>
            <tbody className="govuk-table__body">
                <tr className="govuk-table__row">
                    <td className="govuk-table__cell" scope="row"><a href="#" className="govuk-link" title="Edit details for Baroness">Baroness</a>
                    </td><td className="govuk-table__cell">Yacht</td>
                    <td className="govuk-table__cell">Lee-on-solent</td>
                </tr>
                <tr className="govuk-table__row">
                    <td className="govuk-table__cell" scope="row"><a href="#" className="govuk-link" title="Edit details for Serenity">Serenity</a>
                    </td><td className="govuk-table__cell">Yacht</td>
                    <td className="govuk-table__cell">Dover</td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default SectionTable;
