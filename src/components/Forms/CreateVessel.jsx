import React from 'react';

const CreateVessel = ({
  handleSubmit, handleChange, data, errors,
}) => {
  const checkIfVoyageForm = location.pathname.toLowerCase().indexOf('voyage') === -1;

  return (
    <section>
      <div id="vesselName" className={`govuk-form-group ${errors.vesselName ? 'govuk-form-group--error' : ''}`}>
        <label className="govuk-label" htmlFor="vesselName">
          Vessel name
        </label>
        {errors.vesselName
          && (
          <span className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span>
            {' '}
            {errors.vesselName}
          </span>
          )}
        <span className="govuk-hint">For example Baroness</span>
        <input
          className="govuk-input"
          name="vesselName"
          type="text"
          value={data.vesselName || ''}
          onChange={handleChange}
        />
      </div>

      <div id="vesselType" className={`govuk-form-group ${errors.vesselType ? 'govuk-form-group--error' : ''}`}>
        <label className="govuk-label" htmlFor="vesselType">
          Vessel type
        </label>
        {errors.vesselType
          && (
          <span className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span>
            {' '}
            {errors.vesselType}
          </span>
          )}
        <span className="govuk-hint">For example Yacht or Sailboat</span>
        <input
          className="govuk-input"
          name="vesselType"
          type="text"
          value={data.vesselType || ''}
          onChange={handleChange}
        />
      </div>

      <div id="moorings" className={`govuk-form-group ${errors.moorings ? 'govuk-form-group--error' : ''}`}>
        <label className="govuk-label" htmlFor="moorings">
          Usual moorings
        </label>
        <span className="govuk-hint">A description, UNLOCODE or set of Coordinates for where the vessel is usually moored</span>
        {errors.moorings
          && (
          <span className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span>
            {' '}
            {errors.moorings}
          </span>
          )}
        <input
          className="govuk-input"
          name="moorings"
          type="text"
          value={data.moorings || ''}
          onChange={handleChange}
        />
      </div>

      <div id="registration" className={`govuk-form-group ${errors.registration ? 'govuk-form-group--error' : ''}`}>
        <label className="govuk-label" htmlFor="registration">
          Registration number
        </label>
        {errors.registration
          && (
          <span className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span>
            {' '}
            {errors.registration}
          </span>
          )}
        <input
          className="govuk-input"
          name="registration"
          type="text"
          value={data.registration || ''}
          onChange={handleChange}
        />
      </div>

      <div id="hullIdentificationNumber" className="govuk-form-group">
        <label className="govuk-label" htmlFor="hullIdentificationNumber">
          Hull identification number
        </label>
        <input
          className="govuk-input"
          name="hullIdentificationNumber"
          type="text"
          value={data.hullIdentificationNumber || ''}
          onChange={handleChange}
        />
      </div>

      <div id="callsign" className="govuk-form-group">
        <label className="govuk-label" htmlFor="callsign">
          Callsign
        </label>
        <input
          className="govuk-input"
          name="callsign"
          type="text"
          value={data.callsign || ''}
          onChange={handleChange}
        />
      </div>

      <div id="vesselNationality" className="govuk-form-group">
        <label className="govuk-label" htmlFor="vesselNationality">
          Vessel nationality
        </label>
        <input
          className="govuk-input"
          name="vesselNationality"
          type="text"
          value={data.vesselNationality || ''}
          onChange={handleChange}
        />
      </div>

      <div id="vesselBase" className="govuk-form-group">
        <label className="govuk-label" htmlFor="vesselBase">
          Port of registry
        </label>
        <input
          className="govuk-input"
          name="vesselBase"
          type="text"
          value={data.vesselBase || ''}
          onChange={handleChange}
        />
      </div>

      {checkIfVoyageForm
        && (
        <div id="submitBlock">
          <button
            className="govuk-button"
            data-module="govuk-button"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
        )}
    </section>
  );
};

export default CreateVessel;
