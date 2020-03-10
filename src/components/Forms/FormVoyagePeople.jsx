import React from 'react';

// app imports
import CreateNewPerson from 'CreateNewPerson';

const FormVoyagePeople = ({ handleSubmit, handleChange, data }) => {
  return (
    <section>
      <h1 className="govuk-heading-xl">Manifest details</h1>
      <h2 className="govuk-heading-l">Saved people</h2>
      <p className="govuk-body-l">Add the details of people you have saved previously</p>


      <h2 className="govuk-heading-l">New person</h2>
      <CreateNewPerson
        handleSubmit={(e) => handleSubmit(e)}
        handleChange={(e) => handleChange(e)}
        data={data}
        className="govuk-body-l"
      >Add a new person to the report</CreateNewPerson>

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
