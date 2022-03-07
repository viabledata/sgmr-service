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

let ports = [];

function fetchPorts(query) {
  if (query.length < 3) {
    ports = [];
  }
  axios.get(`${PORTS_URL}?name=${encodeURIComponent(query)}`, {
    headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
  })
    .then((resp) => {
      ports = resp.data;
    })
    .catch((err) => {
      if (err.response) {
        ports = [];
      }
    });
}

const PortField = ({
  onConfirm = () => {}, fieldName, defaultValue = '', ...props
}) => {
  const [portEntered, setPortEntered] = useState('');
  const [searchTerm, setSearchTerm] = useState(defaultValue || '');
  const [otherValue, setOtherValue] = useState('');

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const togglePortField = (other, value) => {
    if (other) {
      setOtherValue('');
    } else {
      setSearchTerm('');
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

  return (
    <>
      <Combobox
        id="portsCombobox"
        data-testid="portContainer"
        aria-label="Ports"
        onSelect={(e) => handlePortSelection(e)}
        name={fieldName}
        {...props}
      >
        <ComboboxInput
          className="govuk-input"
          data-testid="port"
          onChange={handleSearchTermChange}
          value={searchTerm}
        />
        {fetchPorts(searchTerm)}
        {ports && (
          <ComboboxPopover className="shadow-popup">
            {ports.length > 0 ? (
              <ComboboxList className="comboBoxListItem">
                {ports.slice(0, 10).map((port) => {
                  const str = port.unlocode === '' ? `${port.name}` : `${port.name} (${port.unlocode})`;
                  return <ComboboxOption role="option" key={str} value={str} />;
                })}
              </ComboboxList>
            ) : (
              <span style={{ display: 'none' }}>
                No results found
              </span>
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
