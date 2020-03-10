import React from 'react';

// app imports
import CreateNewVessel from 'CreateNewVessel';

const FormVoyageVessel = ({ handleSubmit, handleChange, data }) => {
  return (
    <section>
      <h1 className="govuk-heading-xl">Vessel details</h1>
      <h2 className="govuk-heading-l">Saved vessels</h2>
      <p className="govuk-body-l">Add the details of a vessel you have saved previously to the report</p>


      <h2 className="govuk-heading-l">New vessel</h2>
      <p className="govuk-body-l">Add the details of a new vessel you have not already saved</p>
      <CreateNewVessel
        handleSubmit={(e) => handleSubmit(e)}
        handleChange={(e) => handleChange(e)}
        data={data}
      />

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

export default FormVoyageVessel;
