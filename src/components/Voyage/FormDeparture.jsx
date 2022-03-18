import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';

import axios from 'axios';
import Auth from '../../lib/Auth';
import { FORM_STEPS } from '../../constants/ClientConstants';
import { COUNTRIES_URL } from '../../constants/ApiConstants';
import FormError from './FormError';
import PortField from '../PortField';

let countries = [];

const FormDeparture = ({
  handleSubmit, handleChange, updateFieldValue, updatePortFields, data, errors, voyageId,
}) => {
  const [searchTerm, setSearchTerm] = useState(data.departureCountry || '');

  const fetchCountries = (query) => {
    if (query.length < 3) {
      countries = [];
    } else {
      axios.get(`${COUNTRIES_URL}?name=${encodeURIComponent(query)}`, {
        headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
      })
        .then((resp) => {
          countries = resp.data.data;
        })
        .catch((err) => {
          if (err.response) {
            countries = [];
          }
        });
    }
  };

  const handleSelect = (e) => {
    updateFieldValue('departureCountry', e);
    console.log(e);
    setSearchTerm(e);
    countries = [];
  };

  const handleComboboxInputChange = (e) => {
    updateFieldValue('departureCountry', null);
    setSearchTerm(e.target.value);
  };

  document.title = 'Intended departure details';

  if (!data) { return null; }
  return (
    <section>
      <h1 className="govuk-heading-xl">Intended departure details</h1>
      <p className="govuk-body-l">
        Provide the intended departure details for the voyage. You can update these details if your voyage plan changes because of the weather or an emergency on board.
      </p>

      <div id="departureDate" className={`govuk-form-group ${errors.departureDate ? 'govuk-form-group--error' : ''}`}>
        <fieldset className="govuk-fieldset" role="group" aria-describedby="dob-hint">
          <legend className="govuk-fieldset__legend">
            <label className="govuk-label govuk-label--m" htmlFor="departureDate">
              Departure date
            </label>
            <FormError error={errors.departureDate} />
          </legend>
          <div className="govuk-hint">
            For example, 20 2 2020
          </div>
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
          <div className="govuk-hint">
            For example, 17 30
          </div>
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

      <div id="departureCountry" className={`govuk-form-group ${errors.departureCountry ? 'govuk-form-group--error' : ''}`}>
        <FormError error={errors.departureCountry} />
        <label className="govuk-label govuk-label--m" htmlFor="country-input">
          Country of departure
        </label>
        <Combobox
          aria-label="Country of Registration"
          onSelect={(e) => handleSelect(e)}
        >
          <ComboboxInput
            id="country-input"
            className="govuk-input"
            name="departureCountry"
            value={searchTerm}
            onChange={(e) => handleComboboxInputChange(e)}
          />
          {fetchCountries(searchTerm)}
          {countries && (
          <ComboboxPopover className="shadow-popup">
            {countries.length > 0 ? (
              <ComboboxList className="comboBoxListItem">
                {countries.slice(0, 10).map((country) => (
                  <ComboboxOption
                    key={country.iso31661alpha3}
                    value={`${country.name}`}
                  />
                ))}
              </ComboboxList>
            ) : (
              <span />
            )}
          </ComboboxPopover>
          )}
        </Combobox>
      </div>

      <div id="departureLocation" className={`govuk-form-group ${errors.departureLocation ? 'govuk-form-group--error' : ''}`}>
        <FormError error={errors.departureLocation} />

        <div className="govuk-form-group">
          <label className="govuk-label govuk-label--m" htmlFor="departurePort">
            Name of departure port or location
          </label>
          <div className="govuk-hint">
            For example MDL Hamble Point Marina
          </div>
          <PortField
            defaultValue={data.departurePort}
            fieldName="departurePort"
            country={data.departureCountry}
            onConfirm={(result) => {
              updatePortFields(true, { name: result.name, unlocode: result.unlocode });
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
      <p className="govuk-body">
        <Link to="/voyage-plans" className="govuk-link govuk-link--no-visited-state" onClick={(e) => handleSubmit(e, FORM_STEPS.DEPARTURE_SAVE_AND_EXIT, voyageId)}>
          Save and come back later
        </Link>
      </p>
    </section>
  );
};

export default FormDeparture;
