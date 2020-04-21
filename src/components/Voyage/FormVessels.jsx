import React, { useState, useEffect } from 'react';

// App imports
import { getData } from '@utils/apiHooks';
import { VESSELS_URL } from '@constants/ApiConstants';
import VesselTable from '@components/Vessel/VesselTable';

const FormVessels = () => {
  const [vesselData, setVesselData] = useState();
  // Get vessel data
  const storeVesselData = () => {
    getData(VESSELS_URL)
      .then((resp) => setVesselData(resp.items));
  };

  // Display as checkboxes
  // Handle checkboxes
  // Handle 'add to report' to populate vessel form below
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
      />
      )}
    </section>
  );
};

export default FormVessels;
