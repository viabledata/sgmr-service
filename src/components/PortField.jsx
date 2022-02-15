import React, { useEffect, useState } from 'react';
import Autocomplete from 'accessible-autocomplete/react';
import debounce from 'lodash.debounce';
import axios from 'axios';

import { PORTS_URL } from '../constants/ApiConstants';
import Auth from '../lib/Auth';

const source = debounce((query, populateResults) => {
  if (query.length < 3) {
    return;
  }
  axios.get(`${PORTS_URL}?name=${encodeURIComponent(query)}`, {
    headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
  })
    .then((resp) => {
      populateResults(resp.data);
    })
    .catch((err) => {
      if (err.response) {
        populateResults([]);
      }
    });
}, 300);

function inputTemplate(result) {
  if (!result) {
    return;
  }
  if (typeof result !== 'object') {
    return result;
  }
  return result.unlocode || 'ZZZD';
}

function suggestionTemplate(result) {
  if (!result) {
    return;
  }
  if (typeof result !== 'object') {
    return result;
  }
  const { name, unlocode } = result;
  return unlocode ? `${name} (${unlocode})` : name;
}

const PortField = ({
  onConfirm = () => {}, defaultValue = '', fieldName, ...props
}) => {
  const [portEntered, setPortEntered] = useState('');

  useEffect(() => {
    onConfirm(portEntered);
  }, [portEntered]);

  return (
    <>
      <Autocomplete
        id="autocomplete"
        source={source}
        onChange={(e) => setPortEntered({ name: e.target.value, unlocode: null })}
        showNoOptionsFound={false}
        minLength={3}
        defaultValue={defaultValue || ''}
        templates={{
          inputValue: inputTemplate,
          suggestion: suggestionTemplate,
        }}
        name={fieldName}
        {...props}
      />
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
            className="govuk-input"
            name={`${fieldName}other`}
            type="text"
            onChange={(e) => setPortEntered({ name: e.target.value, unlocode: null })}
            data-testid="portOtherInput"
          />
        </div>
      </details>
    </>
  );
};

export default PortField;
