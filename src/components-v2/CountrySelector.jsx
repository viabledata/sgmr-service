import React, { useEffect, useRef, useState } from 'react';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import { NATIONALITIES_URL } from '../constants/ApiConstants';
import { getData } from '../utils/apiHooks';

const CountrySelector = ({ onConfirm = () => {}, fieldName, defaultValue }) => {
  const [countryList, setCountryList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const searchResults = useRef({});

  const getCountryOptions = async (e) => {
    setSearchTerm(e.target.value);
    const resp = await getData(`${NATIONALITIES_URL}?label=${encodeURIComponent(e.target.value)}`);
    setCountryList(resp);
  };

  const handleCountrySelection = (country) => {
    setSearchTerm(country.label);
    onConfirm({
      target: {
        searchResult: true,
        source: 'CountrySelector',
        name: fieldName,
        countryName: country.label,
        countryISOCode: country.value,
      },
    });
    setCountryList([]);
  };

  useEffect(() => {
    setSearchTerm(defaultValue || '');
  }, [defaultValue]);

  return (
    <Combobox
      id="countryCombobox"
      aria-label="Begin typing for country selections to appear"
      onSelect={(value) => {
        handleCountrySelection(searchResults.current[value]);
      }}
    >
      <ComboboxInput
        id="countryCombobox-input"
        className="govuk-input"
        name={`autocomplete${fieldName}`}
        onChange={getCountryOptions}
        value={searchTerm}
      />
      {countryList.length > 0 && (
      <ComboboxPopover className="shadow-popup">
        <ComboboxList className="comboBoxListItem">
          {countryList.slice(0, 10).map((country) => {
            searchResults.current[country.label] = {
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
      </ComboboxPopover>
      )}
    </Combobox>
  );
};

export default CountrySelector;
