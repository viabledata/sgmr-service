import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// App imports
import { VOYAGE_REPORT_URL } from '@constants/ApiConstants';
import { getData } from '@utils/apiHooks';
import { formatUIDate } from '@utils/date';

const FormCheck = (voyageId) => {
  const [voyageData, setVoyageData] = useState();
  const [voyagePeopleData, setVoyagePeopleData] = useState();

  const storeVoyageData = () => {
    getData(`${VOYAGE_REPORT_URL}/${voyageId.voyageId}`)
      .then((resp) => {
        if (!resp.errors) {
          setVoyageData(resp);
        }
      });
  };

  const storeVoyagePeopleData = () => {
    getData(`${VOYAGE_REPORT_URL}/${voyageId.voyageId}/people`)
      .then((resp) => {
        if (!resp.errors) {
          setVoyagePeopleData(resp.items);
        }
      });
  };

  useEffect(() => {
    storeVoyageData();
    storeVoyagePeopleData();
    localStorage.removeItem('errors');
  }, []);


  if (!voyageData || !voyagePeopleData) { return null; }
  return (
    <section>
      <h1 className="govuk-heading-xl">
        Check all the information provided before submitting your Advanced Voyage Report
      </h1>

      <dl className="govuk-summary-list govuk-!-margin-bottom-9">
        <div className="govuk-summary-list__row">
          <dt className="govuk-heading-m">Departure details</dt>
          <dd className="govuk-summary-list__value">
            <Link to={{
              pathname: 'page-1',
              state: { voyageId: voyageData.id },
            }}
            >
              Change
              <span className="govuk-visually-hidden"> Change</span>
            </Link>
          </dd>
        </div>
      </dl>
      <dl className="govuk-summary-list govuk-!-margin-bottom-9">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Departure date</dt>

          <dd className="govuk-summary-list__value">
            {formatUIDate(voyageData.departureDate)}
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Departure time</dt>
          <dd className="govuk-summary-list__value">
            {voyageData.departureTime}
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Departure port</dt>
          <dd className="govuk-summary-list__value">{voyageData.departurePort}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Departure port latitude</dt>
          <dd className="govuk-summary-list__value">{voyageData.departureLat}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Departure port longitude</dt>
          <dd className="govuk-summary-list__value">{voyageData.departureLong}</dd>
        </div>
      </dl>
      <dl className="govuk-summary-list govuk-!-margin-bottom-9">
        <div className="govuk-summary-list__row">
          <dt className="govuk-heading-m">Arrival details</dt>
          <dd className="govuk-summary-list__value">
            <Link to={{
              pathname: 'page-2',
              state: { voyageId: voyageData.id },
            }}
            >
              Change
              <span className="govuk-visually-hidden"> Change</span>
            </Link>
          </dd>
        </div>
      </dl>
      <dl className="govuk-summary-list govuk-!-margin-bottom-9">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Arrival date</dt>
          <dd className="govuk-summary-list__value">
            {formatUIDate(voyageData.arrivalDate)}
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Arrival time</dt>
          <dd className="govuk-summary-list__value">
            {voyageData.arrivalTime}
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Arrival port</dt>
          <dd className="govuk-summary-list__value">{voyageData.arrivalPort}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Arrival port latitude</dt>
          <dd className="govuk-summary-list__value">{voyageData.arrivalLat}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Arrival port longitude</dt>
          <dd className="govuk-summary-list__value">{voyageData.arrivalLong}</dd>
        </div>
      </dl>
      <dl className="govuk-summary-list govuk-!-margin-bottom-9">
        <div className="govuk-summary-list__row">
          <dt className="govuk-heading-m">Vessel details</dt>
          <dd className="govuk-summary-list__value">
            <Link to={{
              pathname: 'page-3',
              state: { voyageId: voyageData.id },
            }}
            >
              Change
              <span className="govuk-visually-hidden"> Change</span>
            </Link>
          </dd>
        </div>
      </dl>

      <dl className="govuk-summary-list govuk-!-margin-bottom-9">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Vessel name</dt>
          <dd className="govuk-summary-list__value">{voyageData.vesselName}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Usual moorings</dt>
          <dd className="govuk-summary-list__value">{voyageData.moorings}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Registration number</dt>
          <dd className="govuk-summary-list__value">{voyageData.registration}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Vessel type</dt>
          <dd className="govuk-summary-list__value">{voyageData.vesselType}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Hull identification number</dt>
          <dd className="govuk-summary-list__value">{voyageData.hullIdentificationNumber}</dd>


        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Callsign</dt>
          <dd className="govuk-summary-list__value">{voyageData.callsign}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Vessel nationality</dt>
          <dd className="govuk-summary-list__value">{voyageData.vesselNationality}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Port of registry</dt>
          <dd className="govuk-summary-list__value">{voyageData.portOfRegistry}</dd>
        </div>
      </dl>

      <dl className="govuk-summary-list govuk-!-margin-bottom-9">
        <div className="govuk-summary-list__row">
          <dt className="govuk-heading-m">Details of persons on board</dt>
          <dd className="govuk-summary-list__value">
            <Link to={{
              pathname: 'page-4',
              state: { voyageId: voyageData.id },
            }}
            >
              Change
              <span className="govuk-visually-hidden"> Change</span>
            </Link>
          </dd>
        </div>
      </dl>
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


      <dl className="govuk-summary-list govuk-!-margin-bottom-9">
        <div className="govuk-summary-list__row">
          <dt className="govuk-heading-m">
            Responsible person details
          </dt>
          <dd className="govuk-summary-list__value">
            <Link to={{
              pathname: 'page-5',
              state: { voyageId: voyageData.id },
            }}
            >
              Change
              <span className="govuk-visually-hidden"> Change</span>
            </Link>
          </dd>
        </div>
      </dl>
      <dl className="govuk-summary-list govuk-!-margin-bottom-9">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Given name</dt>
          <dd className="govuk-summary-list__value">{voyageData.responsibleGivenName}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Surname</dt>
          <dd className="govuk-summary-list__value">{voyageData.responsibleSurname}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            Contact telephone number
          </dt>
          <dd className="govuk-summary-list__value">{voyageData.responsibleContactNo}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Address</dt>
          <dd className="govuk-summary-list__value">
            {([voyageData.responsibleAddressLine1, voyageData.responsibleAddressLine2, voyageData.responsibleTown, voyageData.responsibleCounty, voyageData.responsiblePostcode].filter(Boolean).join(', \n'))}
          </dd>
        </div>
      </dl>
      <h2 className="govuk-heading-m">Submit your Advanced Voyage Report</h2>
      <p>By submitting this Advanced Voyage Report you are confirming that, to the best of your knowledge, the information you are providing is correct and you have the explicit permission of the persons named in this report to submit information on their behalf.</p>
      <button
        type="button"
        className="govuk-button"
        data-module="govuk-button"
      >
        Accept and submit report
      </button>
      <button
        type="button"
        className="govuk-button govuk-button--warning govuk-body govuk!-margin-top-3 block-button"
        data-module="govuk-button"

      >
        Cancel voyage
      </button>
    </section>
  );
};

export default FormCheck;
