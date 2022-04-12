import React, { useEffect, useState } from 'react';

import axios from 'axios';

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import { NATIONALITIES_URL } from '../constants/ApiConstants';
import Auth from '../lib/Auth';

const CountryField = ({
  onConfirm = () => {}, fieldName, defaultValue,
}) => {
  const [countryList, setCountryList] = useState([]);
  const [countryEntered, setCountryEntered] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const optionData = React.useRef({});

  const fetchCountries = (query) => {
    if (query.length >= 2) {
      axios.get(`${NATIONALITIES_URL}?label=${encodeURIComponent(query)}`, {
        headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
      })
        .then((resp) => {
          setCountryList(resp.data);
        })
        .catch((err) => {
          if (err.response) {
            setCountryList([]);
          }
        });
    }
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    fetchCountries(event.target.value);
  };

  const handleCountrySelection = (country) => {
    setSearchTerm(country.label);
    setCountryEntered(country.value);
    setCountryList([]);
  };

  useEffect(() => {
    onConfirm(countryEntered);
  }, [countryEntered]);

  useEffect(() => {
    setSearchTerm(defaultValue || '');
  }, [defaultValue]);

  return (
    <Combobox
      id="countryCombobox"
      aria-label="Begin typing for country selections to appear"
      autocomplete={false}
      onSelect={(value) => {
        // O(1) lookup for data
        const data = optionData.current[value];
        handleCountrySelection(data);
      }}
    >
      <ComboboxInput
        id="countryCombobox-input"
        className="govuk-input"
        name={`autocomplete${fieldName}`}
        onChange={handleSearchTermChange}
        value={searchTerm}
      />
      {countryList.length > 0 && (
      <ComboboxPopover className="shadow-popup">
        {countryList.length > 0 ? (
          <ComboboxList className="comboBoxListItem">
            {countryList.slice(0, 10).map((country) => {
              optionData.current[country.label] = {
                label: country.label,
                value: country.value,
              };
              return (
                <ComboboxOption
                  role="option"
                  key={country.value}
                  value={country.label}
                />
              );
            })}
          </ComboboxList>
        ) : (
          <ComboboxList className="comboBoxListItem">
            No results found
          </ComboboxList>
        )}
      </ComboboxPopover>
      )}
    </Combobox>
  );
};

export default CountryField;
