import React, { useState, useEffect } from 'react';

// App imports
import { getData } from '@utils/apiHooks';
import { formatUIDate } from '@utils/date';
import { VOYAGE_REPORT_URL } from '@constants/ApiConstants';
import { FORM_STEPS } from '@constants/ClientConstants';


const PeopleSummary = ({ voyageId, source }) => {
  const [manifestData, setManifestData] = useState();


  useEffect(() => {
    getData(`${VOYAGE_REPORT_URL}/${voyageId}/people`, location.pathname)
      .then((resp) => { setManifestData(resp.items); });
  }, []);

  if (!manifestData) { return null; }
  return (
    <>
      <table className="govuk-table">
        <thead className="govuk-table__head">
          <tr className="govuk-table__row">
            <th className="govuk-table__header" scope="col">Last name</th>
            <th className="govuk-table__header" scope="col">First name</th>
            <th className="govuk-table__header" scope="col">Date of birth</th>
            <th className="govuk-table__header" scope="col">Travel document number</th>
            <th className="govuk-table__header" scope="col">Nationality</th>
            <th className="govuk-table__header" scope="col">Type</th>
          </tr>
        </thead>
        {manifestData.map((person) => {
          return (
            <tbody className="govuk-table__body" key={person.id}>
              <tr className="govuk-table__row">
                <td className="govuk-table__cell">{person.lastName}</td>
                <td className="govuk-table__cell">{person.firstName}</td>
                <td className="govuk-table__cell">{formatUIDate(person.dateOfBirth)}</td>
                <td className="govuk-table__cell">{person.documentNumber}</td>
                <td className="govuk-table__cell">{person.nationality}</td>
                <td className="govuk-table__cell">{person.peopleType.name === 'Skipper' ? 'Skipper' : person.peopleType.name === 'Passenger' ? 'Unpaid Crew' : 'Paid Crew'}</td>
              </tr>

              <tr className="govuk-table__row">
                <td className="govuk-table__cell" colSpan={6}>
                  <div>
                    <details data-module="govuk-details">
                      <summary className="govuk-details__summary">
                        <span className="govuk-details__summary-text">
                          Further information
                        </span>
                      </summary>
                      <div className="panel panel-border-narrow" id="details-content-2" aria-hidden="true">
                        <table className="govuk-table" width="100%">
                          <tbody className="govuk-table__body">
                            <tr className="govuk-table__row">
                              <td className="govuk-table__cell">Gender</td>
                              <td className="govuk-table__cell">{(person.gender).charAt(0).toUpperCase() + person.gender.slice(1)}</td>
                            </tr>
                            <tr className="govuk-table__row">
                              <td className="govuk-table__cell">Place of birth</td>
                              <td className="govuk-table__cell">{person.placeOfBirth}</td>
                            </tr>
                            <tr className="govuk-table__row">
                              <td className="govuk-table__cell">Travel document type</td>
                              <td className="govuk-table__cell">{person.documentType}</td>
                            </tr>
                            <tr className="govuk-table__row">
                              <td className="govuk-table__cell">Travel document issuing state</td>
                              <td className="govuk-table__cell">{person.documentIssuingState}</td>
                            </tr>
                            <tr className="govuk-table__row">
                              <td className="govuk-table__cell">Travel document expiry date</td>
                              <td className="govuk-table__cell">{formatUIDate(person.documentExpiryDate)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </details>
                  </div>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
      {source === FORM_STEPS.VOYAGE && (
      <div className="govuk-form-group">
        <label className="govuk-label" htmlFor="totalPersonsOnBoard">Total persons on board</label>
        <input
          className="govuk-input govuk-input--width-3"
          id="totalPersonsOnBoard"
          name="name"
          value={manifestData.length}
          readOnly
        />
      </div>
      )}
    </>
  );
};

export default PeopleSummary;
