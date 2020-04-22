import React from 'react';

// App imports

const FormVoyagePeople = ({ handleSubmit, data }) => {
  if (!data) { return (null); }
  return (
    <section>
      <h1 className="govuk-heading-xl">Temp page to allow progress</h1>

      <button
        type="button"
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
