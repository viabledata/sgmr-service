import React from 'react';

import { FORM_STEPS } from '../../constants/ClientConstants';
import FormError from './FormError';
import PortField from '../PortField';

const FormDeparture = ({
  handleSubmit, handleChange, updateFieldValue, data, errors, voyageId,
}) => {
  document.title = 'Departure details';

  if (!data) { return null; }
  return (
    <section>
      <h1 className="govuk-heading-xl">Departure details</h1>
      <p className="govuk-body-l">You can update these details if your plans change, for example, due to bad weather</p>

      <div id="departureDate" className={`govuk-form-group ${errors.departureDate ? 'govuk-form-group--error' : ''}`}>
        <fieldset className="govuk-fieldset" role="group" aria-describedby="dob-hint">
          <legend className="govuk-fieldset__legend">
            <label className="govuk-label govuk-label--m" htmlFor="departureDate">
              Departure date
            </label>
            <FormError error={errors.departureDate} />
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
                  id="departureDateDay"
                  name="departureDateDay"
                  type="text"
                  maxLength={2}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  value={data.departureDateDay || ''}
                  onChange={(handleChange)}
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
                  id="departureDateMonth"
                  name="departureDateMonth"
                  type="text"
                  maxLength={2}
                  autoComplete="bday-month"
                  pattern="[0-9]*"
                  inputMode="numeric"
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
                  id="departureDateYear"
                  name="departureDateYear"
                  type="text"
                  maxLength={4}
                  autoComplete="bday-year"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  value={data.departureDateYear || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </fieldset>
      </div>

      <div id="departureTime" className={`govuk-form-group ${errors.departureTime ? 'govuk-form-group--error' : ''}`}>
        <fieldset className="govuk-fieldset" role="group" aria-describedby="departureTime-hint">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
            <label className="govuk-label govuk-label--m" htmlFor="departureTime">
              Estimated departure time (UTC)
            </label>
            <FormError error={errors.departureTime} />
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
                  id="departureTimeHour"
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
                  id="departureTimeMinute"
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

      <div id="departureLocation" className={`govuk-form-group ${errors.departureLocation ? 'govuk-form-group--error' : ''}`}>
        <FormError error={errors.departureLocation} />

        <div className="govuk-form-group">
          <label className="govuk-label govuk-label--m" htmlFor="departurePort">
            Departure point
          </label>
          <span className="govuk-hint">
            You can enter a port, marina or anchorage name
          </span>
          <PortField
            defaultValue={data.departurePort}
            onConfirm={(result) => {
              updateFieldValue('departurePort', result.unlocode || result.name);
            }}
          />
        </div>
      </div>

      <button
        type="button"
        className="govuk-button"
        data-module="govuk-button"
        onClick={(e) => handleSubmit(e, FORM_STEPS.DEPARTURE, voyageId)}
      >
        Save and continue
      </button>
    </section>
  );
};

export default FormDeparture;
