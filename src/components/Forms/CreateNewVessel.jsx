import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CreateNewVessel = ({ handleSubmit, handleChange, data }) => {
  const checkIfVoyageForm = location.pathname.toLowerCase().indexOf('voyage') === -1;

  return (
    <section>
      <div id="vesselType" className="govuk-form-group">
        <label className="govuk-label" htmlFor="vesselType">
          Vessel type
        </label>
        <span className="govuk-hint">For example Yacht or Sailboat</span>
        <input
          className="govuk-input"
          name="vesselType"
          type="text"
          value={data.vesselType || ''}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div id="usualMoorings" className="govuk-form-group">
        <label className="govuk-label" htmlFor="usualMoorings">
            Usual moorings
        </label>
        <span className="govuk-hint">A description, UNLOCODE or set of Coordinates for where the vessel is usually moored</span>
        <input
          className="govuk-input"
          name="usualMoorings"
          type="text"
          value={data.usualMoorings || ''}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div id="registration" className="govuk-form-group">
        <label className="govuk-label" htmlFor="registration">
          Registration number
        </label>
        <input
          className="govuk-input"
          name="registration"
          type="text"
          value={data.registration || ''}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div id="hullId" className="govuk-form-group">
        <label className="govuk-label" htmlFor="hullId">
          Hull identification number
        </label>
        <input
          className="govuk-input"
          name="hullId"
          type="text"
          value={data.hullId || ''}
          onChange={(e) => handleChange(e)}
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
          onChange={(e) => handleChange(e)}
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
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div id="colourOfHull" className="govuk-form-group">
        <label className="govuk-label" htmlFor="colourOfHull">
          Colour of hull
        </label>
        <input
          className="govuk-input"
          name="colourOfHull"
          type="text"
          value={data.colourOfHull || ''}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div id="lengthMeters" className="govuk-form-group">
        <label className="govuk-label" htmlFor="lengthMeters">
          Length (meters)
        </label>
        <input
          className="govuk-input"
          name="lengthMeters"
          type="text"
          value={data.lengthMeters || ''}
          onChange={(e) => handleChange(e)}
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
          value={data.portOfRegistry || ''}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div id="vesselBuiltDate" className="govuk-form-group">
        <label className="govuk-label" htmlFor="vesselBuiltDate">
          What year was the vessel built?
        </label>
        <span className="govuk-hint">For example, 2007</span>
          <div className="govuk-date-input">
            <div className="govuk-date-input__item">
              <div className="govuk-form-group">
                <label className="govuk-label govuk-date-input__label" htmlFor="vesselBuiltDate">
                  Year
                </label>
                <input
                  className="govuk-input govuk-date-input__input govuk-input--width-4"
                  name="vesselBuiltDate"
                  type="text"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  maxLength="4"
                  value={data.vesselBuiltDate || ''}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
          </div>
      </div>

      <div id="vesselBuiltIn" className="govuk-form-group">
        <label className="govuk-label" htmlFor="vesselBuiltIn">
          Where was the vessel built?
        </label>
        <span className="govuk-hint">Where was the vessel constructed</span>
        <input
          className="govuk-input"
          name="vesselBuiltIn"
          type="text"
          value={data.vesselBuiltIn || ''}
          onChange={(e) => handleChange(e)}
        />
      </div>

      {checkIfVoyageForm
        && <div id="submitBlock">
          <button
            className="govuk-button"
            data-module="govuk-button"
            onClick={(e) => handleSubmit(e)}
          >
            Save
          </button>
        </div>
      }
    </section>
  );
};

export default CreateNewVessel;
