import React from 'react';
import { Link } from 'react-router-dom';

import {
  FORM_STEPS,
  SAVE_VOYAGE_ARRIVALS_URL, SAVE_VOYAGE_DEPARTURE_URL,
  SAVE_VOYAGE_PEOPLE_MANIFEST_URL,
  SAVE_VOYAGE_RESPONSIBLE_PERSON_URL,
  SAVE_VOYAGE_VESSEL_URL,
} from '../../constants/ClientConstants';
import { formatUIDate } from '../../utils/date';
import PeopleSummary from './PeopleSummary';

const FormCheck = ({
  voyageId, voyageData, handleSubmit, errors,
}) => {
  document.title = 'Check your information';

  if (!voyageData) { return null; }
  return (
    <section>
      <h1 className="govuk-heading-xl">
        Check the information provided before submitting your voyage report
      </h1>

      <div className="govuk-summary-list govuk-!-margin-bottom-9">
        <h2 className="govuk-heading-m">Departure details</h2>
      </div>
      <div className="govuk-form-group govuk-form-group--error">
        <p id="departureDate" className="govuk-error-message">{errors.departureDate}</p>
        <p id="departureTime" className="govuk-error-message">{errors.departureTime}</p>
        <p id="departurePort" className="govuk-error-message">{errors.departurePort}</p>
      </div>
      <dl className="govuk-summary-list">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Departure date</dt>

          <dd className="govuk-summary-list__value">
            {formatUIDate(voyageData.departureDate)}
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Estimated departure time</dt>
          <dd className="govuk-summary-list__value">
            {voyageData.departureTime}
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Departure point</dt>
          <dd className="govuk-summary-list__value">{voyageData.departurePort}</dd>
        </div>
      </dl>
      <div className="govuk-summary-list govuk-!-margin-bottom-9">
        <Link
          to={{
            pathname: SAVE_VOYAGE_DEPARTURE_URL,
            state: { voyageId },
          }}
        >
          Change departure details
          <span className="govuk-visually-hidden">Change departure details</span>
        </Link>
      </div>

      <div className="govuk-summary-list govuk-!-margin-bottom-9">
        <h2 className="govuk-heading-m">Arrival details</h2>
      </div>
      <div className="govuk-form-group govuk-form-group--error">
        <p id="arrivalTime" className="govuk-error-message">{errors.arrivalTime}</p>
        <p id="arrivalDate" className="govuk-error-message">{errors.arrivalDate}</p>
        <p id="arrivalPort" className="govuk-error-message">{errors.arrivalPort}</p>
      </div>
      <dl className="govuk-summary-list">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Arrival date</dt>
          <dd className="govuk-summary-list__value">
            {formatUIDate(voyageData.arrivalDate)}
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Estimated arrival time</dt>
          <dd className="govuk-summary-list__value">
            {voyageData.arrivalTime}
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Arrival point</dt>
          <dd className="govuk-summary-list__value">{voyageData.arrivalPort}</dd>
        </div>
      </dl>
      <div className="govuk-summary-list govuk-!-margin-bottom-9">
        <Link
          to={{
            pathname: SAVE_VOYAGE_ARRIVALS_URL,
            state: { voyageId },
          }}
        >
          Change arrival details
          <span className="govuk-visually-hidden">Change arrival details</span>
        </Link>
      </div>

      <div className="govuk-summary-list govuk-!-margin-bottom-9">
        <h2 className="govuk-heading-m">Pleasure craft details</h2>
      </div>
      <div className="govuk-form-group govuk-form-group--error">
        <p id="vesselName" className="govuk-error-message">{errors.vesselName}</p>
        <p id="registration" className="govuk-error-message">{errors.registration}</p>
      </div>
      <dl className="govuk-summary-list">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Pleasure craft name</dt>
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
          <dt className="govuk-summary-list__key">Pleasure craft type</dt>
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
          <dt className="govuk-summary-list__key">Pleasure craft nationality</dt>
          <dd className="govuk-summary-list__value">{voyageData.vesselNationality}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Port of registry</dt>
          <dd className="govuk-summary-list__value">{voyageData.portOfRegistry}</dd>
        </div>
      </dl>
      <div className="govuk-summary-list govuk-!-margin-bottom-9">
        <Link
          to={{
            pathname: SAVE_VOYAGE_VESSEL_URL,
            state: { voyageId },
          }}
        >
          Change pleasure craft details
          <span className="govuk-visually-hidden">Change pleasure craft details</span>
        </Link>
      </div>

      <div className="govuk-summary-list">
        <h2 className="govuk-heading-m">People on board</h2>
      </div>
      <PeopleSummary
        voyageId={voyageId}
      />
      <div className="govuk-summary-list govuk-!-margin-bottom-9">
        <Link
          to={{
            pathname: SAVE_VOYAGE_PEOPLE_MANIFEST_URL,
            state: { voyageId },
          }}
        >
          Change people on board
          <span className="govuk-visually-hidden">Change people on board</span>
        </Link>
      </div>

      <div className="govuk-summary-list govuk-!-margin-bottom-9">
        <h2 className="govuk-heading-m">Skipper&apos;s details</h2>
      </div>
      <div className="govuk-form-group govuk-form-group--error">
        <p id="responsibleGivenName" className="govuk-error-message">{errors.responsibleGivenName}</p>
      </div>
      <dl className="govuk-summary-list">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">First name</dt>
          <dd className="govuk-summary-list__value">{voyageData.responsibleGivenName}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Last name</dt>
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
            {([voyageData.responsibleAddressLine1, voyageData.responsibleAddressLine2, voyageData.responsibleTown, voyageData.responsibleCounty, voyageData.responsiblePostcode]
              .filter(Boolean).join(', \n'))}
          </dd>
        </div>
      </dl>
      <div className="govuk-summary-list govuk-!-margin-bottom-9">
        <Link
          to={{
            pathname: SAVE_VOYAGE_RESPONSIBLE_PERSON_URL,
            state: { voyageId },
          }}
        >
          Change skipper&apos;s details
          <span className="govuk-visually-hidden">Change skipper&apos;s details</span>
        </Link>
      </div>

      <h2 className="govuk-heading-m">Submit your Pleasure Craft Report</h2>
      <p>
        By submitting this voyage report you are confirming that, to the best of your knowledge,
        the information you are providing is correct and you have the explicit permission of the persons named in this report to submit information on their behalf.
      </p>
      <button
        type="button"
        className="govuk-button"
        data-module="govuk-button"
        onClick={(e) => handleSubmit(e, 'check', voyageId)}
      >
        Accept and submit report
      </button>
      <button
        type="button"
        className="govuk-button govuk-button--warning govuk-body govuk!-margin-top-3 block-button"
        data-module="govuk-button"
        onClick={((e) => handleSubmit(e, FORM_STEPS.CANCEL))}
      >
        Cancel voyage
      </button>
    </section>
  );
};

export default FormCheck;
