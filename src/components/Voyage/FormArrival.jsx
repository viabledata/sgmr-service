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

const FormArrival = ({
  handleSubmit, handleChange, updatePortFields, data, errors, voyageId,
}) => {
  const [searchTerm, setSearchTerm] = useState(data.arrivalCountry || '');

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
    setSearchTerm(e);
    countries = [];
  };

  const handleComboboxInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  document.title = 'Intended arrival details';

  if (!data) { return null; }
  return (
    <section>
      <h1 className="govuk-heading-xl">Intended arrival details</h1>
      <p className="govuk-body-l">
        Provide the intended arrival details for the voyage. You can update these details if your voyage plan changes because of the weather or an emergency on board.
      </p>

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

      <div id="arrivalCountry" className={`govuk-form-group ${errors.arrivalCountry ? 'govuk-form-group--error' : ''}`}>
        <FormError error={errors.arrivalCountry} />
        <label className="govuk-label govuk-label--m" htmlFor="country-input">
          Country of arrival
        </label>
        <Combobox
          aria-label="Country of arrival"
          onSelect={(e) => handleSelect(e)}
        >
          <ComboboxInput
            id="country-input"
            className="govuk-input"
            name="arrivalCountry"
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

      <div id="arrivalLocation" className={`govuk-form-group ${errors.arrivalLocation ? 'govuk-form-group--error' : ''}`}>
        <FormError error={errors.arrivalLocation} />
        <div className={`govuk-form-group ${errors.arrivalPort ? 'govuk-form-group--error' : ''}`}>
          <label className="govuk-label govuk-label--m" htmlFor="arrivalPort">
            Name of arrival port or location
          </label>
          <div className="govuk-hint">
            For example MDL Hamble Point Marina
          </div>
          <PortField
            defaultValue={data.arrivalPort}
            fieldName="arrivalPort"
            onConfirm={(result) => {
              updatePortFields(false, { name: result.name, unlocode: result.unlocode });
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
      <p className="govuk-body">
        <Link to="/voyage-plans" className="govuk-link govuk-link--no-visited-state" onClick={(e) => handleSubmit(e, FORM_STEPS.ARRIVAL_SAVE_AND_EXIT, voyageId)}>
          Save and come back later
        </Link>
      </p>
    </section>
  );
};
export default FormArrival;
