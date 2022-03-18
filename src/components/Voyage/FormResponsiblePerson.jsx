import React from 'react';
import { FORM_STEPS } from '../../constants/ClientConstants';
import FormError from './FormError';

const FormResponsiblePerson = ({
  handleSubmit, handleChange, data, errors, voyageId,
}) => {
  document.title = "Add the skipper's address";

  return (
    <section>
      <h1 className="govuk-heading-xl">Add the skipper&apos;s address</h1>
      <p className="govuk-body-l">
        Provide the details of the person responsible for this voyage. By default this is the Skipper, but could be the pleasure craft owner if this is a charter.
      </p>

      <div id="responsibleGivenName" className={`govuk-form-group ${errors.responsibleGivenName ? 'govuk-form-group--error' : ''}`}>
        <label className="govuk-label govuk-label--m" htmlFor="responsibleGivenName">
          First name
        </label>
        <FormError error={errors.responsibleGivenName} />
        <input
          className="govuk-input"
          name="responsibleGivenName"
          type="text"
          value={data.responsibleGivenName || ''}
          onChange={handleChange}
        />
      </div>

      <div id="responsibleSurname" className={`govuk-form-group ${errors.responsibleSurname ? 'govuk-form-group--error' : ''}`}>
        <label className="govuk-label govuk-label--m" htmlFor="responsibleSurname">
          Last name
        </label>
        <FormError error={errors.responsibleSurname} />
        <input
          className="govuk-input"
          name="responsibleSurname"
          type="text"
          value={data.responsibleSurname || ''}
          onChange={handleChange}
        />
      </div>
      <div id="responsibleContactNo" className={`govuk-form-group ${errors.responsibleContactNo ? 'govuk-form-group--error' : ''}`}>
        <label className="govuk-label govuk-label--m" htmlFor="responsibleContactNo">
          Contact telephone number
        </label>
        <FormError error={errors.responsibleContactNo} />
        <div className="govuk-hint">
          For international numbers include the country code
        </div>
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
        <div id="responsibleAddressLine1" className={`govuk-form-group ${errors.responsibleAddressLine1 ? 'govuk-form-group--error' : ''}`}>
          <label className="govuk-label" htmlFor="responsibleAddressLine1">
            House number / building and street
            <span className="govuk-visually-hidden">line 1 of 2</span>
          </label>
          <FormError error={errors.responsibleAddressLine1} />
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
          <FormError error={errors.responsibleAddressLine2} />
          <input
            className="govuk-input"
            name="responsibleAddressLine2"
            type="text"
            value={data.responsibleAddressLine2 || ''}
            onChange={handleChange}
          />
        </div>
        <div id="responsibleTown" className={`govuk-form-group ${errors.responsibleTown ? 'govuk-form-group--error' : ''}`}>
          <label className="govuk-label" htmlFor="responsibleTown">Town or city</label>
          <FormError error={errors.responsibleTown} />
          <input
            className="govuk-input govuk-!-width-two-thirds"
            name="responsibleTown"
            type="text"
            value={data.responsibleTown || ''}
            onChange={handleChange}
          />
        </div>
        <div id="responsibleCounty" className={`govuk-form-group ${errors.responsibleCounty ? 'govuk-form-group--error' : ''}`}>
          <label className="govuk-label" htmlFor="responsibleCounty">Country</label>
          <FormError error={errors.responsibleCounty} />
          <input
            className="govuk-input govuk-!-width-two-thirds"
            name="responsibleCounty"
            type="text"
            value={data.responsibleCounty || ''}
            onChange={handleChange}
          />
        </div>
        <div id="responsiblePostcode" className={`govuk-form-group ${errors.responsiblePostcode ? 'govuk-form-group--error' : ''}`}>
          <label className="govuk-label" htmlFor="responsiblePostcode">Postcode or ZIP</label>
          <FormError error={errors.responsiblePostcode} />
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
        onClick={(e) => handleSubmit(e, FORM_STEPS.RESPONSIBLE_PERSON, voyageId)}
      >
        Save and continue
      </button>
    </section>
  );
};

export default FormResponsiblePerson;
