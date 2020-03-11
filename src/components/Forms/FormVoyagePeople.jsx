import React from 'react';
import { Link } from 'react-router-dom';

const FormVoyagePeople = ({ handleSubmit, handleChange, data }) => {

  return (
    <section>
      <h1 className="govuk-heading-xl">Manifest details</h1>
      <h2 className="govuk-heading-l">Saved people</h2>
      <p className="govuk-body-l">Add the details of people you have saved previously</p>
      <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />

      <h2 className="govuk-heading-l">New person</h2>
      <p><Link to='/people/save-person'>Add a new person to the report</Link></p>
      <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />

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

export default FormVoyagePeople;
