import React, { useState, useEffect } from 'react';

// App imports
import { getData } from '@utils/apiHooks';
import { VESSELS_URL } from '@constants/ApiConstants';
import FormVessel from '@components/Vessel/FormVessel';
import VesselTable from '@components/Vessel/VesselTable';

const FormVessels = ({
  handleSubmit, handleChange, errors, formData,
}) => {
  const [vesselData, setVesselData] = useState();
  const [selectedVessel, setSelectedVessel] = useState();

  const storeVesselData = () => {
    getData(VESSELS_URL)
      .then((resp) => setVesselData(resp.items));
  };

  // Handle checkboxes being checked/unchecked
  const handleCheckboxes = (e) => {
    if ((e.target).checked) {
      // Get this vessel data
      getData(`${VESSELS_URL}/${e.target.id}`)
        // Overwrite checkedVesselData with this vesselData
        .then((resp) => setSelectedVessel(resp));
    }
    // Uncheck every other option
    const vesselCheckboxes = document.querySelectorAll('input[name=vessel]');
    Array.from(vesselCheckboxes).map((vessel) => {
      if (e.target.id !== vessel.id && vessel.checked) {
        vessel.checked = false;
      }
    });
  };


  // Handle 'add to report' to populate vessel form below
  const handleAdd = () => {
    // Overwrite formData with vesselData
    console.log(selectedVessel)
  };

  // Display vessel form
  // Save and continue saves to this voyage only (does not update vessel)

  useEffect(() => {
    storeVesselData();
  }, []);


  return (
    <section>
      <h1 className="govuk-heading-xl">Vessel details</h1>
      <h2 className="govuk-heading-l">Saved vessels</h2>
      <p className="govuk-body-l">Add the details of a vessel you have saved previously to the report</p>
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
        onClick={(e) => handleAdd(e)}
      >
        Add to report
      </button>
      <FormVessel
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        data={formData}
        errors={errors}
        sourceForm="voyage"
      />
    </section>
  );
};

export default FormVessels;
