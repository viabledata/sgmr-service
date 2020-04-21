import React, { useState } from 'react';

// App imports
import { getData } from '@utils/apiHooks';
import VesselTable from '@components/Vessel/VesselTable';

const FormVessels = () => {
  const [vesselData, setVesselData] = useState();
  // Get vessel data

  // Display as checkboxes
  // Handle checkboxes
  // Handle 'add to report' to populate vessel form below
  // Display vessel form
  // Save and continue saves to this voyage only (does not update vessel)

  return (
    <section>
      <h1 className="govuk-heading-xl">Vessel details</h1>
      <h2 className="govuk-heading-l">Saved vessels</h2>
      <p className="govuk-body-l">Add the details of a vessel you have saved previously to the report</p>
      <VesselTable
        vesselData={vesselData}
        sourceForm="voyage"
      />
    </section>
  );
};

export default FormVessels;
