import React, { useState, useEffect } from 'react';


const FormVessels = () => {
  // Update data from localStorage if it exists
  const [formData, setFormData] = useState(JSON.parse(localStorage.getItem('formData')) || {});
  const [errors, setErrors] = useState(JSON.parse(localStorage.getItem('errors')) || { title: null });

  // Update form info to state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle errors [for empty fields]
  const removeError = (fieldName) => {
    const tempArr = { ...errors };
    const key = fieldName;
    delete tempArr[key];
    setErrors(tempArr);
  };
  const handleErrors = (e, errorText) => {
    // If field value is empty, add error : if field has value, removeError
    !e.target.value ? setErrors({ ...errors, [e.target.name]: errorText }) : removeError(e.target.name);
  };

  // Clear formData from localStorage
  // As localStorage updates whenever there is a change to the value of formData or errors, it clears the field data as part of the set function
  const clearFormData = (e) => {
    setFormData({});
    setErrors({ title: null });
  };

  // Handle Submit, including clearing localStorage
  const handleSubmit = (e) => {
    e.preventDefault();
    clearFormData();
  };

  // Update localStorage to hold page data
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('errors', JSON.stringify(errors));
  }, [errors]);

  return (
    <div className="govuk-width-container ">
      <div className="govuk-breadcrumbs">
        <ol className="govuk-breadcrumbs__list">
          <li className="govuk-breadcrumbs__list-item">
            <a className="govuk-breadcrumbs__link" href="/vessels">Vessels</a>
          </li>
          <li className="govuk-breadcrumbs__list-item" aria-current="page">Save vessel</li>
        </ol>
      </div>
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-xl">Save vessel</h1>
            <p className="govuk-body-l">Please enter the following information. This information can be re-used when submitting an Advanced Voyage Report.</p>
            <form>

              {Object.keys(errors).length > 1 && (
                <div className="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabIndex="-1" data-module="govuk-error-summary">
                  <h2 className="govuk-error-summary__title" id="error-summary-title">
                    There is a problem
                  </h2>
                  <div className="govuk-error-summary__body">
                    <ul className="govuk-list govuk-error-summary__list">
                      {Object.entries(errors).map((elem, i) => (
                        <li key={i}>
                          {elem[0] !== 'title'
                              && <a href={`#${elem[0]}`}>{elem[1]}</a>}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div id="form-group" className={`govuk-form-group ${errors.name ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label" htmlFor="name">
                  Vessel name
                </label>
                {errors.name
                  && (
                    <span id="errorname" className="govuk-error-message">
                      <span className="govuk-visually-hidden">Error:</span> {errors.name}
                    </span>
                  )}
                  <span className="govuk-hint">For example Baroness</span>
                <input
                  className={`govuk-input ${errors.name ? 'govuk-input--error' : ''}`}
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleErrors(e, 'You must enter your vessel name')}
                  onKeyPress={(e) => handleErrors(e)}
                />
              </div>

              <div id="form-group" className={`govuk-form-group ${errors.vesselType ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label" htmlFor="vesselType">
                  Vessel type
                </label>
                {errors.vesselType
                  && (
                    <span id="errorvesselType" className="govuk-error-message">
                      <span className="govuk-visually-hidden">Error:</span> {errors.vesselType}
                    </span>
                  )}
                  <span className="govuk-hint">For example Yacht or Sailboat</span>
                <input
                  className={`govuk-input ${errors.vesselType ? 'govuk-input--error' : ''}`}
                  id="vesselType"
                  name="vesselType"
                  type="text"
                  value={formData.vesselType || ''}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleErrors(e, 'You must enter your vessel type')}
                  onKeyPress={(e) => handleErrors(e)}
                />
              </div>

              <div id="form-group" className={`govuk-form-group ${errors.usualMoorings ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label" htmlFor="usualMoorings">
                   Usual moorings
                </label>
                {errors.usualMoorings
                  && (
                    <span id="errorusualMoorings" className="govuk-error-message">
                      <span className="govuk-visually-hidden">Error:</span> {errors.usualMoorings}
                    </span>
                  )}
                  <span className="govuk-hint">A description, UNLOCODE or set of Coordinates for where the vessel is usually moored</span>
                <input
                  className={`govuk-input ${errors.usualMoorings ? 'govuk-input--error' : ''}`}
                  id="usualMoorings"
                  name="usualMoorings"
                  type="text"
                  value={formData.usualMoorings || ''}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleErrors(e, 'You must enter your usual mooring')}
                  onKeyPress={(e) => handleErrors(e)}
                />
              </div>

              <div id="form-group" className={`govuk-form-group ${errors.registration ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label" htmlFor="registration">
                  Registration number
                </label>
                {errors.registration
                  && (
                    <span id="errorregistration" className="govuk-error-message">
                      <span className="govuk-visually-hidden">Error:</span> {errors.registration}
                    </span>
                  )}
                <input
                  className={`govuk-input ${errors.registration ? 'govuk-input--error' : ''}`}
                  id="registration"
                  name="registration"
                  type="text"
                  value={formData.registration || ''}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleErrors(e, 'You must enter your registration number')}
                  onKeyPress={(e) => handleErrors(e)}
                />
              </div>

              <div id="form-group" className={`govuk-form-group ${errors.hullId ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label" htmlFor="hullId">
                  Hull identification number
                </label>
                {errors.hullId
                  && (
                    <span id="errorhullId" className="govuk-error-message">
                      <span className="govuk-visually-hidden">Error:</span> {errors.hullId}
                    </span>
                  )}
                <input
                  className={`govuk-input ${errors.hullId ? 'govuk-input--error' : ''}`}
                  id="hullId"
                  name="hullId"
                  type="text"
                  value={formData.hullId || ''}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleErrors(e, 'You must enter your hull identification number')}
                  onKeyPress={(e) => handleErrors(e)}
                />
              </div>

              <div id="form-group" className={`govuk-form-group ${errors.callsign ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label" htmlFor="callsign">
                  Callsign
                </label>
                {errors.callsign
                  && (
                    <span id="errorcallsign" className="govuk-error-message">
                      <span className="govuk-visually-hidden">Error:</span> {errors.callsign}
                    </span>
                  )}
                <input
                  className={`govuk-input ${errors.callsign ? 'govuk-input--error' : ''}`}
                  id="callsign"
                  name="callsign"
                  type="text"
                  value={formData.callsign || ''}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleErrors(e, 'You must enter your callsign')}
                  onKeyPress={(e) => handleErrors(e)}
                />
              </div>

              <div id="form-group" className={`govuk-form-group ${errors.vesselNationality ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label" htmlFor="vesselNationality">
                  Vessel nationality
                </label>
                {errors.vesselNationality
                  && (
                    <span id="errorvesselNationality" className="govuk-error-message">
                      <span className="govuk-visually-hidden">Error:</span> {errors.vesselNationality}
                    </span>
                  )}
                <input
                  className={`govuk-input ${errors.vesselNationality ? 'govuk-input--error' : ''}`}
                  id="vesselNationality"
                  name="vesselNationality"
                  type="text"
                  value={formData.vesselNationality || ''}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleErrors(e, 'You must enter your vessel nationality')}
                  onKeyPress={(e) => handleErrors(e)}
                />
              </div>

              <div id="form-group" className={`govuk-form-group ${errors.colourOfHull ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label" htmlFor="colourOfHull">
                  Colour of hull
                </label>
                {errors.colourOfHull
                  && (
                    <span id="errorcolourOfHull" className="govuk-error-message">
                      <span className="govuk-visually-hidden">Error:</span> {errors.colourOfHull}
                    </span>
                  )}
                <input
                  className={`govuk-input ${errors.colourOfHull ? 'govuk-input--error' : ''}`}
                  id="colourOfHull"
                  name="colourOfHull"
                  type="text"
                  value={formData.colourOfHull || ''}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleErrors(e, 'You must enter the colour of your hull')}
                  onKeyPress={(e) => handleErrors(e)}
                />
              </div>

              <div id="form-group" className={`govuk-form-group ${errors.lengthMeters ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label" htmlFor="lengthMeters">
                  Length (meters)
                </label>
                {errors.lengthMeters
                  && (
                    <span id="errorlengthMeters" className="govuk-error-message">
                      <span className="govuk-visually-hidden">Error:</span> {errors.lengthMeters}
                    </span>
                  )}
                <input
                  className={`govuk-input ${errors.lengthMeters ? 'govuk-input--error' : ''}`}
                  id="lengthMeters"
                  name="lengthMeters"
                  type="text"
                  value={formData.lengthMetres || ''}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleErrors(e, 'You must enter the length in meters')}
                  onKeyPress={(e) => handleErrors(e)}
                />
              </div>

              <div id="form-group" className={`govuk-form-group ${errors.portOfRegistry ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label" htmlFor="portOfRegistry">
                  Port of registry
                </label>
                {errors.portOfRegistry
                  && (
                    <span id="errorportOfRegistry" className="govuk-error-message">
                      <span className="govuk-visually-hidden">Error:</span> {errors.portOfRegistry}
                    </span>
                  )}
                <input
                  className={`govuk-input ${errors.portOfRegistry ? 'govuk-input--error' : ''}`}
                  id="portOfRegistry"
                  name="portOfRegistry"
                  type="text"
                  value={formData.portOfRegistry || ''}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleErrors(e, 'You must enter your port of registry')}
                  onKeyPress={(e) => handleErrors(e)}
                />
              </div>

              <div id="form-group" className={`govuk-form-group ${errors.vesselBuiltDate ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label" htmlFor="vesselBuiltDate">
                  What year was the vessel built?
                </label>
                {errors.vesselBuiltDate
                  && (
                    <span id="errorvesselBuiltDate" className="govuk-error-message">
                      <span className="govuk-visually-hidden">Error:</span> {errors.vesselBuiltDate}
                    </span>
                  )}
                  <span className="govuk-hint">For example, 2007</span>
                  <div className="govuk-date-input">
                    <div className="govuk-date-input__item">
                      <div className="govuk-form-group">
                        <label className="govuk-label govuk-date-input__label" htmlFor="vesselBuiltDate">
                          Year
                        </label>
                        <input
                          className={`govuk-input govuk-date-input__input govuk-input--width-4 ${errors.vesselBuiltDate ? 'govuk-input--error' : ''}`}
                          id="vesselBuiltDate"
                          name="vesselBuiltDate"
                          type="text"
                          pattern="[0-9]*"
                          inputMode="numeric"
                          value={formData.vesselBuiltDate || ''}
                          onChange={(e) => handleChange(e)}
                          onBlur={(e) => handleErrors(e, 'You must enter the year your vessel was built')}
                          onKeyPress={(e) => handleErrors(e)}
                        />
                      </div>
                    </div>
                  </div>
              </div>

              <div id="form-group" className={`govuk-form-group ${errors.vesselBuiltIn ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label" htmlFor="vesselBuiltIn">
                  Where was the vessel built?
                </label>
                {errors.vesselBuiltIn
                  && (
                    <span id="errorvesselBuiltIn" className="govuk-error-message">
                      <span className="govuk-visually-hidden">Error:</span> {errors.vesselBuiltIn}
                    </span>
                  )}
                  <span className="govuk-hint">Where was the vessel constructed</span>
                <input
                  className={`govuk-input ${errors.vesselBuiltIn ? 'govuk-input--error' : ''}`}
                  id="vesselBuiltIn"
                  name="vesselBuiltIn"
                  type="text"
                  value={formData.vesselBuiltIn || ''}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleErrors(e, 'You must enter where your vessel was built')}
                  onKeyPress={(e) => handleErrors(e)}
                />
              </div>

              <button
                className="govuk-button"
                data-module="govuk-button"
                onClick={(e) => handleSubmit(e)}
              >
                Save
              </button>
              <div>
                <a href="/vessels" className="govuk-link govuk-link--no-visited-state" onClick={(e) => clearFormData(e)}>Exit without saving</a>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>

  );
};

export default FormVessels;
