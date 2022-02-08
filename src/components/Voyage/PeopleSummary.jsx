import React, { useState, useEffect } from 'react';

// App imports
import { VOYAGE_REPORT_URL } from '../../constants/ApiConstants';
import { FORM_STEPS } from '../../constants/ClientConstants';
import { getData } from '../../utils/apiHooks';
import { formatUIDate } from '../../utils/date';
import Details from '../Details';

const PeopleSummary = ({ voyageId, source }) => {
  const [manifestData, setManifestData] = useState();

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
    getData(`${VOYAGE_REPORT_URL}/${voyageId}/people`, location.pathname)
      .then((resp) => { setManifestData(resp.items); });
  }, []);

  if (!manifestData) { return null; }
  return (
    <>
      <table className="govuk-table">
        <thead className="govuk-table__head">
          <tr className="govuk-table__row" role="row">
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
              <tr className="govuk-table__row" role="row">
                <td className="govuk-table__cell" role="cell">
                  <span className="responsive-table__heading" aria-hidden="true">
                    Last name
                  </span>
                  {person.lastName}
                </td>
                <td className="govuk-table__cell" role="cell">
                  <span className="responsive-table__heading" aria-hidden="true">
                    First name
                  </span>
                  {person.firstName}
                </td>
                <td className="govuk-table__cell" role="cell">
                  <span className="responsive-table__heading" aria-hidden="true">
                    Date of birth
                  </span>
                  {formatUIDate(person.dateOfBirth)}
                </td>
                <td className="govuk-table__cell" role="cell">
                  <span className="responsive-table__heading" aria-hidden="true">
                    Travel document number
                  </span>
                  {person.documentNumber}
                </td>
                <td className="govuk-table__cell" role="cell">
                  <span className="responsive-table__heading" aria-hidden="true">
                    Nationality
                  </span>
                  {person.nationality}
                </td>
                <td className="govuk-table__cell" role="cell">
                  <span className="responsive-table__heading" aria-hidden="true">
                    Type
                  </span>
                  {getPersonType(person.peopleType.name)}
                </td>
              </tr>

              <tr className="govuk-table__row" role="row">
                <td className="govuk-table__cell" colSpan={6} role="cell">
                  <div>
                    <Details summary="Further information">
                      <table className="govuk-table" width="100%">
                        <tbody className="govuk-table__body">
                          <tr className="govuk-table__row" role="row">
                            <td className="govuk-table__cell" role="cell">Gender</td>
                            <td className="govuk-table__cell" role="cell">{(person.gender).charAt(0).toUpperCase() + person.gender.slice(1)}</td>
                          </tr>
                          <tr className="govuk-table__row" role="row">
                            <td className="govuk-table__cell" role="cell">Place of birth</td>
                            <td className="govuk-table__cell" role="cell">{person.placeOfBirth}</td>
                          </tr>
                          <tr className="govuk-table__row" role="row">
                            <td className="govuk-table__cell" role="cell">Travel document type</td>
                            <td className="govuk-table__cell" role="cell">{person.documentType}</td>
                          </tr>
                          <tr className="govuk-table__row" role="row">
                            <td className="govuk-table__cell" role="cell">Travel document issuing state</td>
                            <td className="govuk-table__cell" role="cell">{person.documentIssuingState}</td>
                          </tr>
                          <tr className="govuk-table__row" role="row">
                            <td className="govuk-table__cell" role="cell">Travel document expiry date</td>
                            <td className="govuk-table__cell" role="cell">{formatUIDate(person.documentExpiryDate)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </Details>
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
