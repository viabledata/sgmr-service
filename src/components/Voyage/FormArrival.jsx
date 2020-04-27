import React from 'react';

const FormArrival = ({
  handleSubmit, handleChange, data, errors, voyageId,
}) => {
  if (!data) { return (null); }
  return (
    <section>
      <h1 className="govuk-heading-xl">Arrival details</h1>
      <p className="govuk-body-l">Provide the arrival details of the voyage</p>

      <div id="arrivalDate" className={`govuk-form-group ${errors.arrivalDate ? 'govuk-form-group--error' : ''}`}>
        <fieldset className="govuk-fieldset" role="group" aria-describedby="dob-hint">
          <legend className="govuk-fieldset__legend">
            <label className="govuk-label" htmlFor="arrivalDate">
              Arrival date
            </label>
            {errors.arrivalDate
              && (
              <span className="govuk-error-message">
                <span className="govuk-visually-hidden">Error:</span>
                {errors.arrivalDate}
              </span>
              )}
          </legend>
          <span className="govuk-hint">
            For example, 20 2 2020
          </span>
          <div className="govuk-date-input">
            <div className="govuk-date-input__item">
              <div className="govuk-form-group">
                <label className="govuk-label govuk-date-input__label" htmlFor="arrivalDateDay">
                  Day
                </label>
                <input
                  className="govuk-input govuk-date-input__input govuk-input--width-2"
                  name="arrivalDateDay"
                  type="text"
                  maxLength={2}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  value={data.arrivalDateDay || ''}
                  onChange={(handleChange)}
                />
              </div>
            </div>
            <div className="govuk-date-input__item">
              <div className="govuk-form-group">
                <label className="govuk-label govuk-date-input__label" htmlFor="arrivalDateMonth">
                  Month
                </label>
                <input
                  className="govuk-input govuk-date-input__input govuk-input--width-2"
                  name="arrivalDateMonth"
                  type="text"
                  maxLength={2}
                  autoComplete="bday-month"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  value={data.arrivalDateMonth || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="govuk-date-input__item">
              <div className="govuk-form-group">
                <label className="govuk-label govuk-date-input__label" htmlFor="arrivalDateYear">
                  Year
                </label>
                <input
                  className="govuk-input govuk-date-input__input govuk-input--width-4"
                  name="arrivalDateYear"
                  type="text"
                  maxLength={4}
                  autoComplete="bday-year"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  value={data.arrivalDateYear || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </fieldset>
      </div>

      <div id="arrivalTime" className={`govuk-form-group ${errors.arrivalTime ? 'govuk-form-group--error' : ''}`}>
        <fieldset className="govuk-fieldset" role="group" aria-describedby="arrivalTime-hint">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
            <label className="govuk-label govuk-label" htmlFor="arrivalTime">
              Arrival time (UTC)
            </label>
            {errors.arrivalTime
              && (
              <span className="govuk-error-message">
                <span className="govuk-visually-hidden">Error:</span>
                {errors.arrivalTime}
              </span>
              )}
          </legend>
          <span className="govuk-hint">
            For example, 17 30
          </span>
          <div className="govuk-date-input">
            <div className="govuk-date-input__item">
              <div className="govuk-form-group">
                <label className="govuk-label govuk-date-input__label" htmlFor="arrivalTimeHour">
                  Hour
                </label>
                <input
                  className="govuk-input govuk-date-input__input govuk-input--width-2"
                  name="arrivalTimeHour"
                  type="text"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  maxLength={2}
                  value={data.arrivalTimeHour || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="govuk-date-input__item">
              <div className="govuk-form-group">
                <label className="govuk-label govuk-date-input__label" htmlFor="arrivalTimeMinute">
                  Minute
                </label>
                <input
                  className="govuk-input govuk-date-input__input govuk-input--width-2"
                  name="arrivalTimeMinute"
                  type="text"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  maxLength={2}
                  value={data.arrivalTimeMinute || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </fieldset>
      </div>

      <div id="arrivalPort" className={`govuk-form-group ${errors.firstName ? 'govuk-form-group--error' : ''}`}>
        <label className="govuk-label govuk-label--m" htmlFor="arrivalPort">
          Arrival port
        </label>
        <span className="govuk-hint">
          The name or UNLOCODE of the port, for example Monaco or MC MON. Enter ‘ZZZZ’ if not known
        </span>
        <input
          className="govuk-input"
          name="arrivalPort"
          type="text"
          value={data.arrivalPort || ''}
          onChange={handleChange}
        />
      </div>

      <div id="arrivalCoordinates" className={`govuk-form-group ${errors.firstName ? 'govuk-form-group--error' : ''}`}>
        <fieldset className="govuk-fieldset" role="group" aria-describedby="arrivalCoordinates-hint">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
            <label className="govuk-label govuk-label--m" htmlFor="arrivalCoordinates">
              Arrival coordinates
            </label>
            <span className="govuk-hint">
              If port is ‘ZZZZ’, provide decimal coordinates to 6 places
            </span>
          </legend>
          <div className={`govuk-form-group ${errors.firstName ? 'govuk-form-group--error' : ''}`}>
            <label className="govuk-label govuk-date-input__label" htmlFor="arrivalLat">
              Latitude
            </label>
            <span className="govuk-hint">
              For example 51.507493
            </span>
            <input
              className="govuk-input govuk-date-input__input"
              name="arrivalLat"
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              value={data.arrivalLat || ''}
              onChange={handleChange}
            />
          </div>
          <div className={`govuk-form-group ${errors.firstName ? 'govuk-form-group--error' : ''}`}>
            <label className="govuk-label govuk-date-input__label" htmlFor="arrivalLong">
              Longitude
            </label>
            <span className="govuk-hint">
              For example 51.507493
            </span>
            <input
              className="govuk-input govuk-date-input__input"
              name="arrivalLong"
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              value={data.arrivalLong || ''}
              onChange={handleChange}
            />
          </div>
        </fieldset>
      </div>

      <button
        type="button"
        className="govuk-button"
        data-module="govuk-button"
        onClick={(e) => handleSubmit(e, 'arrival', voyageId)}
      >
        Save and continue
      </button>
    </section>
  );
};
export default FormArrival;
