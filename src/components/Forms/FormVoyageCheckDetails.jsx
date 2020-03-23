import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

// App imports
import { VOYAGE_REPORT_URL } from 'Constants/ApiConstants';
import Auth from 'Auth';

const FormVoyageCheckDetails = () => {
  const location = useLocation();
  const history = useHistory();
  const voyageId = '';
  const [voyageData, setVoyageData] = useState([]);
  const [peopleData, setPeopleData] = useState([]);
  const [voyageReference, setVoyageReference] = useState([]);

  const getVoyageData = () => {
    axios.get(`${VOYAGE_REPORT_URL}/${voyageId}`, {
      headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
    })
      .then((resp) => {
        setVoyageData(resp.data);
      })
      .catch((err) => {
        if (err.response) {
          switch (err.response.status) {
            case 422: history.push(`/sign-in?source=${location}`); break;
            default: history.push(`/sign-in?source=${location}`); break;
          }
        }
      });
  };

  const getPeopleData = () => {
    axios.get(`${VOYAGE_REPORT_URL}/${voyageId}/people?pagination=false`, {
      headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
    })
      .then((resp) => {
        setPeopleData(resp.data.people);
      })
      .catch((err) => {
        if (err.response) {
          switch (err.response.status) {
            case 422: history.push(`/sign-in?source=${location}`); break;
            default: history.push(`/sign-in?source=${location}`); break;
          }
        }
      });
  };

  const handleVoyageSubmit = (e) => {
    e.preventDefault();
    const submitData = { status: 'Submitted' };
    axios.patch(`${VOYAGE_REPORT_URL}/${voyageId}`, submitData, {
      headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
    })
      .then((resp) => {
        setVoyageReference(resp.data);
        history.push('/save-voyage/voyage-submitted');
      })
      .catch((err) => {
        if (err.response) {
          switch (err.response.status) {
            case 422: history.push(`/sign-in?source=${location.pathname}`); break;
            default: history.push(`/sign-in?source=${location.pathname}`); break;
          }
        }
      });
  };

  useEffect(() => {
    getVoyageData();
    getPeopleData();
  }, []);


  return (
    <section>

      <h1 className="govuk-heading-xl">
        Check all the information provided before submitting your Advanced Voyage Report
      </h1>

      <dl className="govuk-summary-list govuk-!-margin-bottom-9">
        <div className="govuk-summary-list__row">
          <dt className="govuk-heading-m">Departure details</dt>
          <dd className="govuk-summary-list__value">
            <Link to="page-1">
              Change
              <span className="govuk-visually-hidden"> Change</span>
            </Link>
          </dd>
        </div>
      </dl>
      <dl className="govuk-summary-list govuk-!-margin-bottom-9">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Departure date</dt>
          <dd className="govuk-summary-list__value">{moment(voyageData.departureDate, 'YYYY-M-D').format('DD/MM/YYYY')}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Departure time</dt>
          <dd className="govuk-summary-list__value">{voyageData.departureTime}</dd>

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
            <Link to="page-2">
              Change
              <span className="govuk-visually-hidden"> Change</span>
            </Link>
          </dd>
        </div>
      </dl>
      <dl className="govuk-summary-list govuk-!-margin-bottom-9">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Arrival date</dt>
          <dd className="govuk-summary-list__value">{moment(voyageData.arrivalDate, 'YYYY-M-D').format('DD/MM/YYYY')}</dd>

        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Arrival time</dt>
          <dd className="govuk-summary-list__value">{voyageData.arrivalTime}</dd>

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
            <Link to="page-3">
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
          <dt className="govuk-summary-list__key">Vessel type</dt>
          <dd className="govuk-summary-list__value">{voyageData.vesselType}</dd>

        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Usual moorings</dt>
          <dd className="govuk-summary-list__value">{voyageData.mooring}</dd>

        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Registration number</dt>
          <dd className="govuk-summary-list__value">{voyageData.registrationNumber}</dd>

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
          <dd className="govuk-summary-list__value">{voyageData.vesselBase}</dd>

        </div>
      </dl>
      <dl className="govuk-summary-list govuk-!-margin-bottom-9">
        <div className="govuk-summary-list__row">
          <dt className="govuk-heading-m">Manifest details</dt>
          <dd className="govuk-summary-list__value">
            <Link to="page-4">
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
        {peopleData.map((elem) => {
          return (
            <tbody className="govuk-table__body" key={elem.id}>
              <tr className="govuk-table__row">
                <td className="govuk-table__cell">{elem.firstName}</td>
                <td className="govuk-table__cell">{elem.lastName}</td>
                <td className="govuk-table__cell">{moment(elem.dateOfBirth, 'YYYY-M-D').format('DD/MM/YYYY')}</td>
                <td className="govuk-table__cell">{elem.documentNumber}</td>
                <td className="govuk-table__cell">{elem.nationality}</td>
                <td className="govuk-table__cell">{elem.peopleType.name}</td>
              </tr>

              <tr className="govuk-table__row">
                <td className="govuk-table__cell" colSpan="6">
                  <div>
                    <details role="group">
                      <summary role="button" aria-controls="details-content-2" aria-expanded="false" title={`Further information for ${elem.firstName} ${elem.lastName}`}>
                        <span className="summary">Further information</span>
                      </summary>
                      <div className="panel panel-border-narrow" id="details-content-2" aria-hidden="true">
                        <table className="govuk-table" width="100%">
                          <tbody className="govuk-table__body">
                              <tr className="govuk-table__row">
                                <td className="govuk-table__cell">Gender</td>
                                <td className="govuk-table__cell">{elem.gender}</td>
                              </tr>
                              <tr className="govuk-table__row">
                                <td className="govuk-table__cell">Place of birth</td>
                                <td className="govuk-table__cell">{elem.placeOfBirth}</td>
                              </tr>
                              <tr className="govuk-table__row">
                                <td className="govuk-table__cell">Travel document type</td>
                                <td className="govuk-table__cell">{elem.documentType}</td>
                              </tr>
                              <tr className="govuk-table__row">
                                <td className="govuk-table__cell">Travel document issuing state</td>
                                <td className="govuk-table__cell">{elem.documentIssuingState}</td>
                              </tr>
                              <tr className="govuk-table__row">
                                <td className="govuk-table__cell">Travel document expiry date</td>
                                <td className="govuk-table__cell">{moment(elem.documentExpiryDate, 'YYYY-M-D').format('DD/MM/YYYY')}</td>
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
            <a href="create-report-responsible-person.html">
              Change
              <span className="govuk-visually-hidden"> Change</span>
            </a>
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
            {`${voyageData.responsibleAddressLine1}, ${voyageData.responsibleAddressLine2}, ${voyageData.responsibleTown}, ${voyageData.responsiblePostcode}`}
          </dd>
        </div>
      </dl>
      <h2 className="govuk-heading-m">Submit your Advanced Voyage Report</h2>
      <p>By submitting this Advanced Voyage Report you are confirming that, to the best of your knowledge, the information you are providing is correct and you have the explicit permission of the persons named in this report to submit information on their behalf.</p>
      <button
        className="govuk-button"
        data-module="govuk-button"
        onClick={(e) => handleVoyageSubmit(e)}
      >
        Accept and submit report
      </button>
    </section>
  );
};

export default FormVoyageCheckDetails;
