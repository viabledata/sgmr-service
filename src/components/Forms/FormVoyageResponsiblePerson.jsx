import React from 'react';

const FormVoyageResponsiblePerson = ({ handleSubmit, handleChange, data }) => {
  return (
    <section>
      <h1 className="govuk-heading-xl">Responsible person</h1>
      <p className="govuk-body-l">Provide the details of the person responsible for this voyage. By default this is the Skipper, but could be the vessel owner if this is a charter.</p>

      <div id="responsibleGivenName" className="govuk-form-group">
        <label className="govuk-label govuk-label--m" htmlFor="responsibleGivenName">
          Given name
        </label>
        <input
          className="govuk-input"
          name="responsibleGivenName"
          type="text"
          value={data.responsibleGivenName || ''}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div id="responsibleSurname" className="govuk-form-group">
        <label className="govuk-label govuk-label--m" htmlFor="responsibleSurname">
          Surname
        </label>
        <input
          className="govuk-input"
          name="responsibleSurname"
          type="text"
          value={data.responsibleSurname || ''}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div id="responsibleContactNo" className="govuk-form-group">
        <label className="govuk-label govuk-label--m" htmlFor="responsibleContactNo">
          Contact telephone number
        </label>
          <span className="govuk-hint">
          Include international dialling code, for example +44
          </span>
        <input
          className="govuk-input"
          name="responsibleContactNo"
          type="text"
          value={data.responsibleContactNo || ''}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <fieldset className="govuk-fieldset">
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">Address</legend>
        <div id="responsibleAddressLine1" className="govuk-form-group">
          <label className="govuk-label" htmlFor="responsibleAddressLine1">
            House number / building and street
            <span className="govuk-visually-hidden">line 1 of 2</span>
          </label>
          <input
            className="govuk-input"
            name="responsibleAddressLine1"
            type="text"
            value={data.responsibleAddressLine1 || ''}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div id="responsibleAddressLine2" className="govuk-form-group">
          <label className="govuk-label" htmlFor="responsibleAddressLine2">
            <span className="govuk-visually-hidden">Building and street line 2 of 2</span>
          </label>
          <input
            className="govuk-input"
            name="responsibleAddressLine2"
            type="text"
            value={data.responsibleAddressLine2 || ''}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div id="responsibleTown" className="govuk-form-group">
          <label className="govuk-label" htmlFor="responsibleTown">Town or city</label>
          <input
            className="govuk-input govuk-!-width-two-thirds"
            name="responsibleTown"
            type="text"
            value={data.responsibleTown || ''}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div id="responsiblePostcode" className="govuk-form-group">
          <label className="govuk-label" htmlFor="responsiblePostcode">Postcode or ZIP</label>
          <input
            className="govuk-input govuk-input--width-10"
            name="responsiblePostcode"
            type="text"
            value={data.responsiblePostcode || ''}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </fieldset>

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

export default FormVoyageResponsiblePerson;
