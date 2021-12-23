import React, { useState, useEffect } from 'react';

// App imports
import { getData } from '@utils/apiHooks';
import { VESSELS_URL } from '@constants/ApiConstants';
import VesselTable from '@components/Vessel/VesselTable';

const SectionTableVessels = () => {
  document.title = "Vessels";
  
  const [vesselData, setVesselData] = useState();

  const storeData = () => {
    getData(`${VESSELS_URL}?pagination=false`, 'vessels')
      .then((resp) => { setVesselData(resp.vessels); });
  };


  useEffect(() => {
    storeData();
  }, []);


  if (!vesselData) { return null; }
  return (
    <section>
      <div className="govuk-grid-column-full">
        <hr className="govuk-section-break govuk-section-break--visible govuk-section-break--xl govuk-!-margin-top-0" />
      </div>
      <div className="govuk-width-container">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-full">
            <h2 className="govuk-heading-l">
              Saved vessels
            </h2>
            <VesselTable
              vesselData={vesselData}
              sourceForm="vessels"
              checkboxes="false"
              link="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionTableVessels;
