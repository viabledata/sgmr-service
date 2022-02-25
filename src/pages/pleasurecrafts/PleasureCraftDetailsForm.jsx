import React from 'react';
import FormError from '../../components/Voyage/FormError';

const PleasureCraftDetailsForm = ({
  handleSubmit, handleChange, formData, errors, sourceForm, vesselId,
}) => {
  const hasRegistration = formData.registration !== undefined;
  const hasMMSI = formData.mmsi !== undefined;
  const hasCallsign = formData.callsign !== undefined;

  return (
    <section>
      <div id="registration" className={`govuk-form-group ${errors.registration ? 'govuk-form-group--error' : ''}`}>
        <label className="govuk-label" htmlFor="registration">
          Does this pleasure craft have a registration number?
        </label>
        <div className="govuk-radios" data-module="govuk-radios">
          <FormError error={errors.registration} />
          <div className="govuk-radios__item">
            <input
              className="govuk-radios__input"
              id="registration-1"
              name="registration"
              type="radio"
              value="yes"
              checked={formData.hasRegistration === 'yes' ? 'checked' : ''}
              onChange={(e) => handleChange(e)}
            />
            <label className="govuk-label govuk-radios__label" htmlFor="registration-1">
              Yes
            </label>
          </div>
          {hasRegistration && (
            <div className="govuk-form-group">
              <label className="govuk-label" htmlFor="registration-2">
                Registration number
                <input
                  className="govuk-input"
                  name="registration-2"
                  type="text"
                  value={hasRegistration ? formData.registration : ''}
                  onChange={handleChange}
                />
              </label>
              <label className="govuk-label" htmlFor="nationality">
                Country of registration
                <input
                  className="govuk-input"
                  name="nationality"
                  type="text"
                  value={hasRegistration ? formData.nationality : ''}
                  onChange={handleChange}
                />
              </label>
            </div>
          )}
          <div className="govuk-radios__item">
            <input
              className="govuk-radios__input"
              id="pleasure-craft-registration-number-4"
              name="pleasure-craft-registration-number"
              type="radio"
              value="no"
              checked={formData.hasRegistration === 'no' ? 'checked' : ''}
              onChange={(e) => handleChange(e)}
            />
            <label className="govuk-label govuk-radios__label" htmlFor="pleasure-craft-registration-number-4">
              No
            </label>
          </div>
        </div>
      </div>

      <div id="ais" className={`govuk-form-group ${errors.ais ? 'govuk-form-group--error' : ''}`}>
        <label className="govuk-label" htmlFor="vesselType">
          Does this pleasure craft have an Automatic Identification System (AIS)?
        </label>
        <div className="govuk-radios" data-module="govuk-radios">
          <FormError error={errors.ais} />
          <div className="govuk-radios__item">
            <input
              className="govuk-radios__input"
              id="pleasure-craft-ais"
              name="pleasure-craft-ais"
              type="radio"
              value="yes"
              checked={formData.hasAIS === 'yes' ? 'checked' : ''}
              onChange={(e) => handleChange(e)}
            />
            <label className="govuk-label govuk-radios__label" htmlFor="pleasure-craft-ais">
              Yes
            </label>
          </div>
          <div className="govuk-radios__item">
            <input
              className="govuk-radios__input"
              id="pleasure-craft-ais-2"
              name="pleasure-craft-ais"
              type="radio"
              value="no"
              checked={formData.hasAIS === 'no' ? 'checked' : ''}
              onChange={(e) => handleChange(e)}
            />
            <label className="govuk-label govuk-radios__label" htmlFor="pleasure-craft-ais-2">
              No
            </label>
          </div>
        </div>
      </div>

      <div id="mmsi" className={`govuk-form-group ${errors.mmsi ? 'govuk-form-group--error' : ''}`}>
        <label className="govuk-label" htmlFor="mmsi">
          Does this pleasure craft have a Maritime Mobile Service Identify number (MMSI)?
        </label>
        <div className="govuk-radios" data-module="govuk-radios">
          <FormError error={errors.mmsi} />
          <div className="govuk-radios__item">
            <input
              className="govuk-radios__input"
              id="pleasure-craft-mmsi"
              name="pleasure-craft-mmsi"
              type="radio"
              value="yes"
              checked={formData.hasMMSI === 'yes' ? 'checked' : ''}
              onChange={(e) => handleChange(e)}
            />
            <label className="govuk-label govuk-radios__label" htmlFor="pleasure-craft-mmsi">
              Yes
            </label>
          </div>
          {hasMMSI && (
            <div className="govuk-form-group">
              <label className="govuk-label" htmlFor="mmsi">
                MMSI number
                <input
                  className="govuk-input"
                  name="mmsi"
                  type="text"
                  value={hasMMSI ? formData.MMSI : ''}
                  onChange={handleChange}
                />
              </label>
            </div>
          )}
          <div className="govuk-radios__item">
            <input
              className="govuk-radios__input"
              id="pleasure-craft-mmsi-3"
              name="pleasure-craft-mmsi"
              type="radio"
              value="no"
              checked={formData.hasMMSI === 'no' ? 'checked' : ''}
              onChange={(e) => handleChange(e)}
            />
            <label className="govuk-label govuk-radios__label" htmlFor="pleasure-craft-mmsi-3">
              No
            </label>
          </div>
        </div>
      </div>

      <div id="callsign" className={`govuk-form-group ${errors.callsign ? 'govuk-form-group--error' : ''}`}>
        <label className="govuk-label" htmlFor="callsign">
          Does this pleasure craft have a callsign?
        </label>
        <div className="govuk-radios" data-module="govuk-radios">
          <FormError error={errors.callsign} />
          <div className="govuk-radios__item">
            <input
              className="govuk-radios__input"
              id="pleasure-craft-callsign"
              name="pleasure-craft-callsign"
              type="radio"
              value="yes"
              checked={formData.hasCallsign === 'yes' ? 'checked' : ''}
              onChange={(e) => handleChange(e)}
            />
            <label className="govuk-label govuk-radios__label" htmlFor="pleasure-craft-callsign">
              Yes
            </label>
          </div>
          {hasCallsign && (
            <div className="govuk-form-group">
              <label className="govuk-label" htmlFor="callsign">
                Call sign
                <input
                  className="govuk-input"
                  name="callsign"
                  type="text"
                  value={hasCallsign ? formData.callsign : ''}
                  onChange={handleChange}
                />
              </label>
            </div>
          )}
          <div className="govuk-radios__item">
            <input
              className="govuk-radios__input"
              id="pleasure-craft-callsign-2"
              name="pleasure-craft-callsign"
              type="radio"
              value="no"
              checked={formData.hasCallsign === 'no' ? 'checked' : ''}
              onChange={(e) => handleChange(e)}
            />
            <label className="govuk-label govuk-radios__label" htmlFor="pleasure-craft-callsign-2">
              No
            </label>
          </div>
        </div>
      </div>

      {sourceForm !== 'voyage'
        && (
          <>
            <div id="submitBlock" className="govuk-button-group">
              <button
                type="submit"
                className="govuk-button"
                data-module="govuk-button"
                onClick={handleSubmit}
              >
                Save and continue
              </button>
              {vesselId
                && (
                <a className="govuk-button govuk-button--warning" href={`/pleasure-crafts/${vesselId}/delete`}>
                  Delete this pleasure craft
                </a>
                )}
            </div>
            <p className="govuk-body">
              <a href="/pleasure-crafts" className="govuk-link govuk-link--no-visited-state">Exit without saving</a>
            </p>
          </>
        )}
    </section>
  );
};

export default PleasureCraftDetailsForm;
