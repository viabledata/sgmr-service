import React, { useState, useEffect } from 'react';

// App imports
import { getData } from '@utils/apiHooks';
import { PEOPLE_URL } from '@constants/ApiConstants';
import FormPerson from '@components/People/FormPerson';
import PeopleManifest from '@components/Voyage/PeopleManifest';
import PeopleTable from '@components/People/PeopleTable';

const FormVoyagePeople = ({
  handleSubmit, handleChange, handleCheckboxes, handleAddButton, voyageId, errors, formData,
}) => {
  const [peopleData, setPeopleData] = useState();


  const storePeopleData = () => {
    getData(PEOPLE_URL)
      .then((resp) => setPeopleData(resp));
  };


  useEffect(() => {
    storePeopleData();
  }, []);


  return (
    <section>
      <h1 className="govuk-heading-xl">People on board</h1>
      <h2 className="govuk-heading-l">Saved people</h2>
      <p className="govuk-body-l">Add the details of people you have saved previously</p>
      {peopleData && (
        <PeopleTable
          peopleData={peopleData}
          sourceForm="voyage"
          checkboxes="true"
          link="false"
          handleCheckboxes={handleCheckboxes}
        />
      )}

      <PeopleManifest />

      <button
        type="button"
        className="govuk-button"
        data-module="govuk-button"
        onClick={(e) => handleSubmit(e, 'people', voyageId)}
      >
        Save and continue
      </button>
    </section>
  );
};

export default FormVoyagePeople;
