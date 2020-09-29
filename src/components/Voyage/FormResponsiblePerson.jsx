import React from 'react';

const FormResponsiblePerson = ({
  handleSubmit, handleChange, data, voyageId,
}) => {
  return (
    <section>
      <h1 className="govuk-heading-xl">Add the skipper's address</h1>
      <p className="govuk-body-l">Provide the details of the person responsible for this voyage. By default this is the Skipper, but could be the vessel owner if this is a charter.</p>

      <div id="responsibleGivenName" className="govuk-form-group">
        <label className="govuk-label govuk-label--m" htmlFor="responsibleGivenName">
          First name
        </label>
        <input
          className="govuk-input"
          name="responsibleGivenName"
          type="text"
          value={data.responsibleGivenName || ''}
          onChange={handleChange}
        />
      </div>

      <div id="responsibleSurname" className="govuk-form-group">
        <label className="govuk-label govuk-label--m" htmlFor="responsibleSurname">
          Last name
        </label>
        <input
          className="govuk-input"
          name="responsibleSurname"
          type="text"
          value={data.responsibleSurname || ''}
          onChange={handleChange}
        />
      </div>
      <div id="responsibleContactNo" className="govuk-form-group">
        <label className="govuk-label govuk-label--m" htmlFor="responsibleContactNo">
          Contact telephone number
        </label>
        <span className="govuk-hint">
          For international numbers include the country code
        </span>
        <input
          className="govuk-input"
          name="responsibleContactNo"
          type="text"
          value={data.responsibleContactNo || ''}
          onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
          />
        </div>
        <div id="responsibleTown" className="govuk-form-group">
          <label className="govuk-label" htmlFor="responsibleTown">Town or city</label>
          <input
            className="govuk-input govuk-!-width-two-thirds"
            name="responsibleTown"
            type="text"
            value={data.responsibleTown || ''}
            onChange={handleChange}
          />
        </div>
        <div id="responsibleCounty" className="govuk-form-group">
          <label className="govuk-label" htmlFor="responsibleCounty">County</label>
          <input
            className="govuk-input govuk-!-width-two-thirds"
            name="responsibleCounty"
            type="text"
            value={data.responsibleCounty || ''}
            onChange={handleChange}
          />
        </div>
        <div id="responsiblePostcode" className="govuk-form-group">
          <label className="govuk-label" htmlFor="responsiblePostcode">Postcode or ZIP</label>
          <input
            className="govuk-input govuk-input--width-10"
            name="responsiblePostcode"
            type="text"
            value={data.responsiblePostcode || ''}
            onChange={handleChange}
          />
        </div>
      </fieldset>

      <button
        type="button"
        className="govuk-button"
        data-module="govuk-button"
        onClick={(e) => handleSubmit(e, 'responsiblePerson', voyageId)}
      >
        Save and continue
      </button>
    </section>
  );
};

export default FormResponsiblePerson;
