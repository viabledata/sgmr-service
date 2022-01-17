import React, { useState, useEffect } from 'react';

// App imports
import { getData } from '@utils/apiHooks';
import { VESSELS_URL } from '@constants/ApiConstants';
import { FORM_STEPS } from '@constants/ClientConstants';
import FormVessel from '@components/Vessel/FormVessel';
import VesselTable from '@components/Vessel/VesselTable';

const FormVessels = ({
  handleSubmit, handleChange, handleCheckboxes, handleAddVesselButton, voyageId, errors, formData,
}) => {
  document.title = 'Pleasure craft details';

  const [vesselData, setVesselData] = useState();

  const storeVesselData = () => {
    getData(VESSELS_URL)
      .then((resp) => setVesselData(resp.items));
  };

  useEffect(() => {
    storeVesselData();
  }, []);

  return (
    <section>
      <h1 className="govuk-heading-xl">Pleasure craft details</h1>
      <h2 className="govuk-heading-l">Saved pleasure crafts</h2>
      <p className="govuk-body-l">Add the details of a pleasure craft you have saved previously to the voyage plan</p>
      {vesselData && (
      <VesselTable
        vesselData={vesselData}
        sourceForm="voyage"
        checkboxes="true"
        link="false"
        handleCheckboxes={handleCheckboxes}
      />
      )}
      <button
        type="button"
        className="govuk-button"
        data-module="govuk-button"
        onClick={(e) => handleAddVesselButton(e)}
      >
        Add to voyage plan
      </button>
      <h2 className="govuk-heading-l">New pleasure craft</h2>
      <p className="govuk-body-l">
        Add the details of a new pleasure craft you have not already saved
      </p>
      <FormVessel
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        voyageId={voyageId}
        data={formData}
        formData={formData}
        errors={errors}
        sourceForm="voyage"
      />
      <button
        type="button"
        className="govuk-button"
        data-module="govuk-button"
        onClick={(e) => handleSubmit(e, FORM_STEPS.VESSEL, voyageId)}
      >
        Save and continue
      </button>
    </section>
  );
};

export default FormVessels;
