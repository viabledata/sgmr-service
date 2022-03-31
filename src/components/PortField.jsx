import React, { useEffect, useState } from 'react';

import axios from 'axios';

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import { PORTS_URL } from '../constants/ApiConstants';
import Auth from '../lib/Auth';

const PortField = ({
  onConfirm = () => {}, fieldName, defaultValue,
}) => {
  const [portList, setPortList] = useState([]);
  const [portEntered, setPortEntered] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [otherValue, setOtherValue] = useState('');

  const fetchPorts = (query) => {
    if (query.length >= 2) {
      axios.get(`${PORTS_URL}?name=${encodeURIComponent(query)}`, {
        headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
      })
        .then((resp) => {
          setPortList(resp.data);
        })
        .catch((err) => {
          if (err.response) {
            setPortList([]);
          }
        });
    }
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    fetchPorts(event.target.value);
  };

  const togglePortField = (isSelectorField, value) => {
    if (isSelectorField) {
      setOtherValue(''); // user selects from the autoselect
      setPortList([]);
    } else {
      setSearchTerm(''); // user is typing in the 'other' field
      setOtherValue(value);
      setPortEntered({ name: value, unlocode: null });
    }
  };

  const handlePortSelection = (port) => {
    let portUnlocode = null;

    setSearchTerm(port);
    // Use a regex to separate the unlocode from the port name e.g. Dover (GB DVR) -> Dover as port name and GB DVR as unlocode
    if (/\(([^)]+)\)/.test(port)) {
      portUnlocode = port.match(/\(([^)]+)\)/)[1];
      port = port.replace(` (${portUnlocode})`, '');
    }
    setPortEntered({ name: port, unlocode: portUnlocode });
    togglePortField(true);
  };

  useEffect(() => {
    onConfirm(portEntered);
  }, [portEntered]);

  useEffect(() => {
    setSearchTerm(defaultValue || '');
  }, [defaultValue]);

  return (
    <>
      <Combobox
        id="portsCombobox"
        data-testid="portContainer"
        aria-label="Begin typing for port selections to appear"
        onSelect={(e) => handlePortSelection(e)}
      >
        <ComboboxInput
          id="autocomplete"
          className="govuk-input"
          data-testid="port"
          name={`autocomplete${fieldName}`}
          onChange={handleSearchTermChange}
          value={searchTerm}
        />
        {portList.length > 0 && (
          <ComboboxPopover className="shadow-popup">
            {portList.length > 0 ? (
              <ComboboxList className="comboBoxListItem">
                {portList.slice(0, 10).map((port) => {
                  const str = port.unlocode === '' ? `${port?.name}` : `${port.name} (${port.unlocode})`;
                  return <ComboboxOption role="option" key={str} value={str} />;
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
      <details className="govuk-details" data-module="govuk-details">
        <summary className="govuk-details__summary">
          <span className="govuk-details__summary-text">
            I cannot find the location in the list
          </span>
        </summary>
        <div className="govuk-details__text" data-testid="portOther">
          <label className="govuk-label govuk-label--m" htmlFor={`${fieldName}other`}>
            Other location (please specify)
          </label>
          <div className="govuk-hint">
            Please enter the location if it&apos;s not available in the dropdown
          </div>
          <input
            id="portOtherInput"
            className="govuk-input"
            name={`${fieldName}other`}
            type="text"
            value={otherValue}
            onChange={(e) => togglePortField(false, e.target.value)}
            data-testid="portOtherInput"
          />
        </div>
      </details>

    </>
  );
};

export default PortField;
