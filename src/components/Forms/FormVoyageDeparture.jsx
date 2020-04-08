import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isDateValid } from '@utils/date';
import { updateVoyageReportRoutine } from '@state/voyage';

const FormVoyageDeparture = ({
  handleSubmit, handleChange, data, updateVoyageReportAction, setErrors, removeError, errors,
}) => {
  useEffect(() => {
    if (isDateValid(data.documentExpiryDateYear, data.documentExpiryDateMonth, data.documentExpiryDateDay)) {
      removeError('documentExpiryDate');
    } else {
      setErrors({ ...errors, documentExpiryDate: 'You must enter a valid date' });
    }
  }, []);

  return (
    <section>
      <h1 className="govuk-heading-xl">Departure details</h1>
      <p className="govuk-body-l">Provide the departure details of the voyage</p>

      <div id="departureDate" className="govuk-form-group">
        <fieldset className="govuk-fieldset" role="group" aria-describedby="departureDate-hint">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
            <label className="govuk-label govuk-label--m" htmlFor="departureDate">
              Departure date
            </label>
          </legend>
          <span className="govuk-hint">
            For example, 20 2 2020
          </span>
          <div className="govuk-date-input">
            <div className="govuk-date-input__item">
              <div className="govuk-form-group">
                <label className="govuk-label govuk-date-input__label" htmlFor="departureDateDay">
                  Day
                </label>
                <input
                  className="govuk-input govuk-date-input__input govuk-input--width-2"
                  name="departureDateDay"
                  type="text"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  maxLength={2}
                  value={data.departureDateDay || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="govuk-date-input__item">
              <div className="govuk-form-group">
                <label className="govuk-label govuk-date-input__label" htmlFor="departureDateMonth">
                  Month
                </label>
                <input
                  className="govuk-input govuk-date-input__input govuk-input--width-2"
                  name="departureDateMonth"
                  type="text"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  maxLength={2}
                  value={data.departureDateMonth || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="govuk-date-input__item">
              <div className="govuk-form-group">
                <label className="govuk-label govuk-date-input__label" htmlFor="departureDateYear">
                  Year
                </label>
                <input
                  className="govuk-input govuk-date-input__input govuk-input--width-4"
                  name="departureDateYear"
                  type="text"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  maxLength={4}
                  value={data.departureDateYear || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </fieldset>
      </div>

      <div id="departureTime" className="govuk-form-group">
        <fieldset className="govuk-fieldset" role="group" aria-describedby="departureTime-hint">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
            <label className="govuk-label govuk-label--m" htmlFor="departureTime">
              Departure time (UTC)
            </label>
          </legend>
          <span className="govuk-hint">
            For example, 17 30
          </span>
          <div className="govuk-date-input">
            <div className="govuk-date-input__item">
              <div className="govuk-form-group">
                <label className="govuk-label govuk-date-input__label" htmlFor="departureTimeHour">
                  Hour
                </label>
                <input
                  className="govuk-input govuk-date-input__input govuk-input--width-2"
                  name="departureTimeHour"
                  type="text"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  maxLength={2}
                  value={data.departureTimeHour || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="govuk-date-input__item">
              <div className="govuk-form-group">
                <label className="govuk-label govuk-date-input__label" htmlFor="departureTimeMinute">
                  Minute
                </label>
                <input
                  className="govuk-input govuk-date-input__input govuk-input--width-2"
                  name="departureTimeMinute"
                  type="text"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  maxLength={2}
                  value={data.departureTimeMinute || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </fieldset>
      </div>

      <div id="departurePort" className="govuk-form-group">
        <label className="govuk-label govuk-label--m" htmlFor="departurePort">
          Departure port
        </label>
        <span className="govuk-hint">
          The name or UNLOCODE of the port, for example Monaco or MC MON. Enter ‘ZZZZ’ if not known
        </span>
        <input
          className="govuk-input"
          name="departurePort"
          type="text"
          value={data.departurePort || ''}
          onChange={handleChange}
        />
      </div>

      <div id="departureCoordinates" className="govuk-form-group">
        <fieldset className="govuk-fieldset" role="group" aria-describedby="departureCoordinates-hint">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
            <label className="govuk-label govuk-label--m" htmlFor="departureCoordinates">
              Departure coordinates
            </label>
            <span className="govuk-hint">
              If port is ‘ZZZZ’, provide decimal coordinates to 6 places
            </span>
          </legend>
          <div className="govuk-form-group">
            <label className="govuk-label govuk-date-input__label" htmlFor="departureLat">
              Latitude
            </label>
            <span className="govuk-hint">
              For example 51.507493
            </span>
            <input
              className="govuk-input govuk-date-input__input"
              name="departureLat"
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              value={data.departureLat || ''}
              onChange={handleChange}
            />
          </div>
          <div className="govuk-form-group">
            <label className="govuk-label govuk-date-input__label" htmlFor="departureLong">
              Longitude
            </label>
            <span className="govuk-hint">
              For example 51.507493
            </span>
            <input
              className="govuk-input govuk-date-input__input"
              name="departureLong"
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              value={data.departureLong || ''}
              onChange={handleChange}
            />
          </div>
        </fieldset>
      </div>

      <button
        type="button"
        className="govuk-button"
        data-module="govuk-button"
        onClick={(e) => handleSubmit(e, updateVoyageReportAction, 'departure')}
      >
        Save and continue
      </button>
    </section>
  );
};

FormVoyageDeparture.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  removeError: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  errors: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  updateVoyageReportAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  updateVoyageReportAction: (formData) => dispatch(updateVoyageReportRoutine.request(formData)),
});
export default connect(null, mapDispatchToProps)(FormVoyageDeparture);
