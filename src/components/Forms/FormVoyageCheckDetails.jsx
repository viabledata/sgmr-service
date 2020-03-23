import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';



import { submitVoyageReportRoutine } from 'State/voyage';

const getVesselInfo = ({
  vesselName,
  vesselType,
  moorings,
  registration,
  hullIdentificationNumber,
  callsign,
  vesselNationality,
  vesselBase,
}) => ({
  vesselName,
  vesselType,
  moorings,
  registration,
  hullIdentificationNumber,
  callsign,
  vesselNationality,
  vesselBase,
});

const FormVoyageCheckDetails = ({
  data, submitVoyageReportAction, people, vessels,
}) => {
  const shouldShowPeople = people.list && data.people;
  const peopleList = (shouldShowPeople && people.list.filter((person) => data.people.find((chosenPerson) => person.id === chosenPerson))) || [];
  const [vessel] = (vessels.list && data.vessels && vessels.list.filter((singleVessel) => data.vessels === singleVessel.id)) || [getVesselInfo(data)];
  const shouldFormatDepartureDate = data.departureDateYear && data.departureDateMonth && data.departureDateDay;
  const shouldFormatArrivalDate = data.arrivalDateYear && data.arrivalDateMonth && data.arrivalDateDay;

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

          <dd className="govuk-summary-list__value">
            {
            shouldFormatDepartureDate && moment()
              .year(data.departureDateYear)
              .month(data.departureDateMonth)
              .date(data.departureDateDay)
              .format('DD/MM/YYYY')
            }
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Departure time</dt>
          <dd className="govuk-summary-list__value">
            {[data.departureTimeHour, data.departureTimeMinute].filter(Boolean).join(':')}
          </dd>

        </div>

        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Departure port latitude</dt>
          <dd className="govuk-summary-list__value">{data.departureLat}</dd>

        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Departure port longitude</dt>
          <dd className="govuk-summary-list__value">{data.departureLong}</dd>

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
          <dd className="govuk-summary-list__value">
            {
            shouldFormatArrivalDate && moment()
              .year(data.arrivalDateYear)
              .month(data.arrivalDateMonth)
              .date(data.arrivalDateDay)
              .format('DD/MM/YYYY')
          }
          </dd>

        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Arrival time</dt>
          <dd className="govuk-summary-list__value">
            {[data.arrivalTimeHour, data.arrivalTimeMinute].filter(Boolean).join(':')}
          </dd>

        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Arrival port latitude</dt>
          <dd className="govuk-summary-list__value">{data.arrivalLat}</dd>

        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Arrival port longitude</dt>
          <dd className="govuk-summary-list__value">{data.arrivalLong}</dd>

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
          <dd className="govuk-summary-list__value">{vessel.vesselName}</dd>

          </div>
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Usual moorings</dt>
            <dd className="govuk-summary-list__value">{vessel.moorings}</dd>

          </div>
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Registration number</dt>
            <dd className="govuk-summary-list__value">{vessel.registration}</dd>

        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Vessel type</dt>
          <dd className="govuk-summary-list__value">{vessel.vesselType}</dd>

        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Hull identification number</dt>
          <dd className="govuk-summary-list__value">{vessel.hullIdentificationNumber}</dd>


        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Callsign</dt>
          <dd className="govuk-summary-list__value">{vessel.callsign}</dd>

        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Vessel nationality</dt>
          <dd className="govuk-summary-list__value">{vessel.vesselNationality}</dd>

        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Port of registry</dt>
          <dd className="govuk-summary-list__value">{vessel.vesselBase}</dd>

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
        {shouldShowPeople && peopleList.map((person) => {
          return (
            <tbody className="govuk-table__body" key={person.id}>
              <tr className="govuk-table__row">
                <td className="govuk-table__cell">{person.lastName}</td>
                <td className="govuk-table__cell">{person.firstName}</td>
                <td className="govuk-table__cell">{moment(person.dateOfBirth, 'YYYY-M-D').format('DD/MM/YYYY')}</td>
                <td className="govuk-table__cell">{person.documentNumber}</td>
                <td className="govuk-table__cell">{person.nationality}</td>
                <td className="govuk-table__cell">{person.peopleType.name}</td>
              </tr>

              <tr className="govuk-table__row">
                <td className="govuk-table__cell" colSpan={6}>
                  <div>
                    <details>
                      <summary role="button" aria-controls="details-content-2" aria-expanded="false" title={`Further information for ${person.firstName} ${person.lastName}`}>
                        <span className="summary">Further information</span>
                      </summary>
                      <div className="panel panel-border-narrow" id="details-content-2" aria-hidden="true">
                        <table className="govuk-table" width="100%">
                          <tbody className="govuk-table__body">
                            <tr className="govuk-table__row">
                              <td className="govuk-table__cell">Gender</td>
                              <td className="govuk-table__cell">{person.gender}</td>
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
                              <td className="govuk-table__cell">{person.documentExpiryDate && moment(person.documentExpiryDate, 'YYYY-M-D').format('DD/MM/YYYY')}</td>
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
          <dd className="govuk-summary-list__value">{data.responsibleGivenName}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Surname</dt>
          <dd className="govuk-summary-list__value">{data.responsibleSurname}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            Contact telephone number
          </dt>
          <dd className="govuk-summary-list__value">{data.responsibleContactNo}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Address</dt>
          <dd className="govuk-summary-list__value">
            {([data.responsibleAddressLine1, data.responsibleAddressLine2, data.responsibleTown, data.responsibleCounty, data.responsiblePostcode].filter(Boolean).join(', \n'))}
          </dd>
        </div>
      </dl>
      <h2 className="govuk-heading-m">Submit your Advanced Voyage Report</h2>
      <p>By submitting this Advanced Voyage Report you are confirming that, to the best of your knowledge, the information you are providing is correct and you have the explicit permission of the persons named in this report to submit information on their behalf.</p>
      <button
        type="button"
        className="govuk-button"
        data-module="govuk-button"
        onClick={submitVoyageReportAction}
      >
        Accept and submit report
      </button>
    </section>
  );
};

FormVoyageCheckDetails.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  people: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  vessels: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  submitVoyageReportAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ people, vessels }) => ({ people, vessels });
const mapDispatchToProps = (dispatch) => ({
  submitVoyageReportAction: (formData) => dispatch(submitVoyageReportRoutine.request(formData)),
});
export default connect(mapStateToProps, mapDispatchToProps)(FormVoyageCheckDetails);
