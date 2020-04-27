import React, { useState, useEffect } from 'react';

// App imports
import { getData } from '@utils/apiHooks';
import { PEOPLE_URL } from '@constants/ApiConstants';
import PeopleTable from '@components/People/PeopleTable';

const SectionTablePeople = () => {
  const [peopleData, setPeopleData] = useState();

  const storeData = () => {
    getData(`${PEOPLE_URL}?pagination=false`)
      .then((resp) => { setPeopleData(resp); });
  };


  useEffect(() => {
    storeData();
  }, []);

  if (!peopleData) { return null; }
  return (
    <section>
      <div className="govuk-grid-column-full">
        <hr className="govuk-section-break govuk-section-break--visible govuk-section-break--xl govuk-!-margin-top-0" />
      </div>
      <div className="govuk-width-container">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-full">
            <h2 className="govuk-heading-l">
              Saved people
            </h2>
            <PeopleTable
              peopleData={peopleData}
              sourceForm="people"
              checkboxes="false"
              link="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionTablePeople;
