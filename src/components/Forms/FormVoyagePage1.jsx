import React from 'react';
// currently no error handling on Voyage forms, can replicate what Vessels have if needed

const FormVoyagePage1 = ({ handleSubmit, handleChange, data }) => {
  return (
    <>
    <div id="givenName" className="govuk-form-group">
      <label className="govuk-label  govuk-label--m" htmlFor="givenName">
        Given name
      </label>
      <input
        className="govuk-input"
        name="givenName"
        type="text"
        value={data.givenName || ''}
        onChange={(e) => handleChange(e)}
      />
    </div>
    <button
      className="govuk-button"
      data-module="govuk-button"
      onClick={(e) => handleSubmit(e)}
    >
      Save and continue
    </button>
    </>
  );
};

export default FormVoyagePage1;
