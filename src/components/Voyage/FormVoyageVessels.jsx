import React, { useState, useEffect } from 'react';

// App imports
import { VESSELS_URL } from '../../constants/ApiConstants';
import { FORM_STEPS } from '../../constants/ClientConstants';
import { getData } from '../../utils/apiHooks';
import PleasureCraftForm from '../../pages/pleasurecrafts/PleasureCraftForm';
import VesselTable from '../Vessel/VesselTable';

const FormVessels = ({
  handleSubmit, handleCheckboxes, handleAddVesselButton, voyageId,
}) => {
  document.title = 'Pleasure craft details';

  const [vesselData, setVesselData] = useState();
  const [isFirstPage, setIsFirstPage] = useState(true);

  const storeVesselData = () => {
    getData(VESSELS_URL)
      .then((resp) => setVesselData(resp.items));
  };

  useEffect(() => {
    storeVesselData();
  }, []);

  const handleSaveAndContinue = (e, id) => {
    if (isFirstPage) {
      handleSubmit(e, FORM_STEPS.PLEASURE_CRAFT_FIRST, id);
      setIsFirstPage(false);
    } else {
      handleSubmit(e, FORM_STEPS.PLEASURE_CRAFT_SECOND, id);
    }
  };

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
      <PleasureCraftForm
        source="voyage"
      />
      <button
        type="button"
        className="govuk-button"
        data-module="govuk-button"
        onClick={(e) => handleSaveAndContinue(e, voyageId)}
      >
        Save and continue
      </button>
    </section>
  );
};

export default FormVessels;
