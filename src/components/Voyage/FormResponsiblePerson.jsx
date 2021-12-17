import React from 'react';
import { FORM_STEPS } from '../../constants/ClientConstants';
import FormError from './FormError';

const FormResponsiblePerson = ({
  handleSubmit, handleChange, data, errors, voyageId,
}) => {
  document.title = "Add the skipper's address";

  return (
    <section>
      <h1 className="govuk-heading-xl">Add the skipper's address</h1>
      <p className="govuk-body-l">Provide the details of the person responsible for this voyage. By default this is the Skipper, but could be the vessel owner if this is a charter.</p>

      <div className="govuk-form-group">
        <label className="govuk-label govuk-label--m" htmlFor="responsibleGivenName">
          First name
        </label>
        <FormError error={errors.responsibleGivenName} />
        <input
          className="govuk-input"
          name="responsibleGivenName"
          id="responsibleGivenName"
          type="text"
          defaultValue={data.responsibleGivenName || ''}
          onChange={handleChange}
        />
      </div>

      <div className="govuk-form-group">
        <label className="govuk-label govuk-label--m" htmlFor="responsibleSurname">
          Last name
        </label>
        <FormError error={errors.responsibleSurname} />
        <input
          className="govuk-input"
          name="responsibleSurname"
          id="responsibleSurname"
          type="text"
          defaultValue={data.responsibleSurname || ''}
          onChange={handleChange}
        />
      </div>
      <div className="govuk-form-group">
        <label className="govuk-label govuk-label--m" htmlFor="responsibleContactNo">
          Contact telephone number
        </label>
        <FormError error={errors.responsibleContactNo} />
        <span className="govuk-hint">
          For international numbers include the country code
        </span>
        <input
          className="govuk-input"
          name="responsibleContactNo"
          id="responsibleContactNo"
          type="text"
          defaultValue={data.responsibleContactNo || ''}
          onChange={handleChange}
        />
      </div>

      <fieldset className="govuk-fieldset">
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">Address</legend>
        <div className="govuk-form-group">
          <label className="govuk-label" htmlFor="responsibleAddressLine1">
            House number / building and street
            <span className="govuk-visually-hidden">line 1 of 2</span>
          </label>
          <FormError error={errors.responsibleAddressLine1} />
          <input
            className="govuk-input"
            name="responsibleAddressLine1"
            id="responsibleAddressLine1"
            type="text"
            defaultValue={data.responsibleAddressLine1 || ''}
            onChange={handleChange}
          />
        </div>
        <div className="govuk-form-group">
          <label className="govuk-label" htmlFor="responsibleAddressLine2">
            Address line 2 (optional)
            <span className="govuk-visually-hidden">Building and street line 2 of 2 (optional)</span>
          </label>
          <input
            className="govuk-input"
            name="responsibleAddressLine2"
            id="responsibleAddressLine2"
            type="text"
            defaultValue={data.responsibleAddressLine2 || ''}
            onChange={handleChange}
          />
        </div>
        <div className="govuk-form-group">
          <label className="govuk-label" htmlFor="responsibleTown">Town or city</label>
          <FormError error={errors.responsibleTown} />
          <input
            className="govuk-input govuk-!-width-two-thirds"
            name="responsibleTown"
            id="responsibleTown"
            type="text"
            defaultValue={data.responsibleTown || ''}
            onChange={handleChange}
          />
        </div>
        <div className="govuk-form-group">
          <label className="govuk-label" htmlFor="responsibleCounty">County</label>
          <FormError error={errors.responsibleCounty} />
          <input
            className="govuk-input govuk-!-width-two-thirds"
            name="responsibleCounty"
            id="responsibleCounty"
            type="text"
            defaultValue={data.responsibleCounty || ''}
            onChange={handleChange}
          />
        </div>
        <div className="govuk-form-group">
          <label className="govuk-label" htmlFor="responsiblePostcode">Postcode or ZIP</label>
          <FormError error={errors.responsiblePostcode} />
          <input
            className="govuk-input govuk-input--width-10"
            name="responsiblePostcode"
            id="responsiblePostcode"
            type="text"
            defaultValue={data.responsiblePostcode || ''}
            onChange={handleChange}
          />
        </div>
      </fieldset>

      <button
        type="button"
        className="govuk-button"
        data-module="govuk-button"
        onClick={(e) => handleSubmit(e, FORM_STEPS.RESPONSIBLE_PERSON, voyageId)}
      >
        Save and continue
      </button>
    </section>
  );
};

export default FormResponsiblePerson;
