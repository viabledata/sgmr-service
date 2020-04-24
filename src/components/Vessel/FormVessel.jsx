import React from 'react';

const FormVessel = ({
  handleSubmit, handleChange, data, formData, errors, sourceForm, clearLocalStorage
}) => {
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
          value={formData.vesselName || data.vesselName || ''}
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
          value={formData.vesselType || data.vesselType || ''}
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
          value={formData.moorings || data.moorings || ''}
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
          value={formData.registration || data.registration || ''}
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
          value={formData.hullIdentificationNumber || data.hullIdentificationNumber || ''}
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
          value={formData.callsign || data.callsign || ''}
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
          value={formData.vesselNationality || data.vesselNationality || ''}
          onChange={handleChange}
        />
      </div>

      <div id="portOfRegistry" className="govuk-form-group">
        <label className="govuk-label" htmlFor="portOfRegistry">
          Port of registry
        </label>
        <input
          className="govuk-input"
          name="portOfRegistry"
          type="text"
          value={formData.portOfRegistry || data.portOfRegistry || ''}
          onChange={handleChange}
        />
      </div>

      {sourceForm !== 'voyage'
        && (
          <>
            <div id="submitBlock">
              <button
                type="submit"
                className="govuk-button"
                data-module="govuk-button"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
            <p>
              <a href="/vessels" className="govuk-link govuk-link--no-visited-state" onClick={(e) => clearLocalStorage(e)}>Exit without saving</a>
            </p>
          </>
        )}


    </section>
  );
};

export default FormVessel;
