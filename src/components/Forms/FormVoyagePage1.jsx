import React from 'react';
// currently no error handling on Voyage forms, can replicate what Vessels have if needed

const FormVoyagePage1 = ({ handleSubmit, handleChange, data }) => {
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
          <div className="govuk-date-input" >
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
                  maxLength="2"
                  value={data.departureDateDay || ''}
                  onChange={(e) => handleChange(e)}
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
                  maxLength="2"
                  value={data.departureDateMonth || ''}
                  onChange={(e) => handleChange(e)}
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
                  maxLength="4"
                  value={data.departureDateYear || ''}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
          </div>
        </fieldset>
      </div>

      <button
        className="govuk-button"
        data-module="govuk-button"
        onClick={(e) => handleSubmit(e)}
      >
        Save and continue
      </button>
    </section>
  );
};

export default FormVoyagePage1;
