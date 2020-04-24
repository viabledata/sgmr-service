import React from 'react';

// App imports
import { formatUIDate } from '@utils/date';


const Manifest = () => {
  // Temp data for testing
  const voyagePeopleData = [{
    id: '1',
    lastName: 'Catman',
    firstName: 'Loki',
    dateOfBirth: '2000-2-1',
    documentNumber: '123',
    nationality: 'gbr',
    peopleType: {
      name: 'Crew',
    },
    gender: 'male',
    placeOfBirth: 'London',
    documentType: 'Passport',
    documentIssuingState: 'gbr',
    documentExpiryDate: '2022-1-1',
  },
  {
    id: '2',
    lastName: 'Catman',
    firstName: 'Thor',
    dateOfBirth: '2000-2-1',
    documentNumber: '123',
    nationality: 'gbr',
    peopleType: {
      name: 'Skipper',
    },
    gender: 'male',
    placeOfBirth: 'London',
    documentType: 'Passport',
    documentIssuingState: 'gbr',
    documentExpiryDate: '2022-1-1',
  }];


  return (
    <table className="govuk-table">
      <thead className="govuk-table__head">
        <tr className="govuk-table__row">
          <th className="govuk-table__header" scope="col">Surname</th>
          <th className="govuk-table__header" scope="col">Given name</th>
          <th className="govuk-table__header" scope="col">Date of birth</th>
          <th className="govuk-table__header" scope="col">Travel document number</th>
          <th className="govuk-table__header" scope="col">Nationality</th>
          <th className="govuk-table__header" scope="col">Type</th>
        </tr>
      </thead>
      {voyagePeopleData.map((person) => {
        return (
          <tbody className="govuk-table__body" key={person.id}>
            <tr className="govuk-table__row">
              <td className="govuk-table__cell">{person.lastName}</td>
              <td className="govuk-table__cell">{person.firstName}</td>
              <td className="govuk-table__cell">{formatUIDate(person.dateOfBirth)}</td>
              <td className="govuk-table__cell">{person.documentNumber}</td>
              <td className="govuk-table__cell">{person.nationality}</td>
              <td className="govuk-table__cell">{person.peopleType.name}</td>
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
  );
};

export default Manifest;
