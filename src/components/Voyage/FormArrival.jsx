import React from 'react';

import { FORM_STEPS } from '../../constants/ClientConstants';
import FormError from './FormError';
import PortField from '../PortField';

const FormArrival = ({
  handleSubmit, handleChange, updateFieldValue, data, errors, voyageId,
}) => {
  document.title = 'Arrival details';

  if (!data) { return null; }
  return (
    <section>
      <h1 className="govuk-heading-xl">Arrival details</h1>
      <p className="govuk-body-l">You can update these details if your plans change, for example, due to bad weather</p>

      <div id="arrivalDate" className={`govuk-form-group ${errors.arrivalDate ? 'govuk-form-group--error' : ''}`}>
        <fieldset className="govuk-fieldset" role="group" aria-describedby="dob-hint">
          <legend className="govuk-fieldset__legend">
            <label className="govuk-label govuk-label--m" htmlFor="arrivalDate">
              Arrival date
            </label>
            <FormError error={errors.arrivalDate} />
          </legend>
          <div className="govuk-hint">
            For example, 20 2 2020
          </div>
          <div className="govuk-date-input">
            <div className="govuk-date-input__item">
              <div className="govuk-form-group">
                <label className="govuk-label govuk-date-input__label" htmlFor="arrivalDateDay">
                  Day
                </label>
                <input
                  className="govuk-input govuk-date-input__input govuk-input--width-2"
                  name="arrivalDateDay"
                  id="arrivalDateDay"
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
                  id="arrivalDateMonth"
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
                  id="arrivalDateYear"
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
            <label className="govuk-label govuk-label--m" htmlFor="arrivalTime">
              Estimated arrival time (UTC)
            </label>
            <FormError error={errors.arrivalTime} />
          </legend>
          <div className="govuk-hint">
            For example, 17 30
          </div>
          <div className="govuk-date-input">
            <div className="govuk-date-input__item">
              <div className="govuk-form-group">
                <label className="govuk-label govuk-date-input__label" htmlFor="arrivalTimeHour">
                  Hour
                </label>
                <input
                  className="govuk-input govuk-date-input__input govuk-input--width-2"
                  name="arrivalTimeHour"
                  id="arrivalTimeHour"
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
                  id="arrivalTimeMinute"
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

      <div id="arrivalLocation" className={`govuk-form-group ${errors.arrivalLocation ? 'govuk-form-group--error' : ''}`}>
        <FormError error={errors.arrivalLocation} />
        <div className={`govuk-form-group ${errors.arrivalPort ? 'govuk-form-group--error' : ''}`}>
          <label className="govuk-label govuk-label--m" htmlFor="arrivalPort">
            Arrival point
          </label>

          <div className="govuk-hint">
            You can enter a port, marina or anchorage name
          </div>
          <PortField
            defaultValue={data.arrivalPort}
            fieldName="arrivalPort"
            onConfirm={(result) => {
              updateFieldValue('arrivalPort', result.unlocode || result.name);
            }}
          />
        </div>
      </div>

      <button
        type="button"
        className="govuk-button"
        data-module="govuk-button"
        onClick={(e) => handleSubmit(e, FORM_STEPS.ARRIVAL, voyageId)}
      >
        Save and continue
      </button>
    </section>
  );
};
export default FormArrival;
