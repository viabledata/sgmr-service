import React from 'react';
import FormError from '../../components/Voyage/FormError';

const FormPleasureCraft = ({
  handleSubmit, handleChange, formData, errors, sourceForm, vesselId,
}) => {
  const vesselTypeOther = formData.vesselType !== undefined && formData.vesselType !== 'sailingBoat' && formData.vesselType !== 'motorboat';
  return (
    <section>
      <div id="vesselName" className={`govuk-form-group ${errors.vesselName ? 'govuk-form-group--error' : ''}`}>
        <label className="govuk-label" htmlFor="vesselName">
          Name of pleasure craft
        </label>
        <FormError error={errors.vesselName} />
        <input
          className="govuk-input"
          name="vesselName"
          type="text"
          value={formData.vesselName || ''}
          onChange={handleChange}
        />
      </div>

      <div id="vesselType" className={`govuk-form-group ${errors.vesselType ? 'govuk-form-group--error' : ''}`}>
        <label className="govuk-label" htmlFor="vesselType">
          Type of pleasure craft
        </label>
        <div className="govuk-radios" data-module="govuk-radios">
          <FormError error={errors.vesselType} />
          <div className="govuk-radios__item">
            <input
              className="govuk-radios__input"
              id="vesselType-1"
              name="vesselType"
              type="radio"
              value="sailingBoat"
              checked={formData.vesselType === 'sailingBoat' ? 'checked' : ''}
              onChange={(e) => handleChange(e)}
            />
            <label className="govuk-label govuk-radios__label" htmlFor="vesselType-1">
              Sailing boat
            </label>
          </div>
          <div className="govuk-radios__item">
            <input
              className="govuk-radios__input"
              id="vesselType-2"
              name="vesselType"
              type="radio"
              value="motorboat"
              checked={formData.vesselType === 'motorboat' ? 'checked' : ''}
              onChange={(e) => handleChange(e)}
            />
            <label className="govuk-label govuk-radios__label" htmlFor="vesselType-2">
              Motorboat
            </label>
          </div>
          <div className="govuk-radios__item">
            <input
              className="govuk-radios__input"
              id="vesselType-3"
              name="vesselType"
              type="radio"
              value="other"
              checked={formData.vesselType === vesselTypeOther ? 'checked' : ''}
              onChange={(e) => handleChange(e)}
            />
            <label className="govuk-label govuk-radios__label" htmlFor="vesselType-3">
              Other
            </label>
          </div>
          {vesselTypeOther && (
            <div className="govuk-form-group">
              <label className="govuk-label" htmlFor="vesselType-other">
                Please specify
                <input
                  className="govuk-input"
                  name="vesselType"
                  type="text"
                  value={vesselTypeOther ? formData.vesselType : ''}
                  onChange={handleChange}
                />
              </label>
            </div>
          )}
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

export default FormPleasureCraft;
