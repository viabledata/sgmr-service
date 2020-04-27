import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// App imports
import { getData } from '@utils/apiHooks';
import { PEOPLE_URL } from '@constants/ApiConstants';
import PeopleManifest from '@components/Voyage/PeopleManifest';
import PeopleTable from '@components/People/PeopleTable';

const FormVoyagePeople = ({
  handleSubmit, handleChange, handleCheckboxes, handleAddButton, handleLinkToForm, voyageId, errors, formData,
}) => {
  const [peopleData, setPeopleData] = useState();


  const storePeopleData = () => {
    getData(PEOPLE_URL)
      .then((resp) => setPeopleData(resp));
  };


  useEffect(() => {
    storePeopleData();
  }, []);

  if (!peopleData) { return null; }
  return (
    <section>
      <h1 className="govuk-heading-xl">People on board</h1>
      {!peopleData.errors && (
        <>
          <h2 className="govuk-heading-l">Saved people</h2>
          <p className="govuk-body-l">Add the details of people you have saved previously</p>
          <PeopleTable
            peopleData={peopleData}
            sourceForm="voyage"
            checkboxes="true"
            link="false"
            handleCheckboxes={handleCheckboxes}
          />
        </>
      )}

      <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
      <h2 className="govuk-heading-l">New people</h2>
      <button
        type="button"
        className="mimic-text-link"
        onClick={(e) => handleLinkToForm(e, voyageId)}
      >
        Add a new person to the Reports
      </button>

      <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
      <h2 className="govuk-heading-l">People currently on board</h2>
      <p className="govuk-body-l">
        People currently on the manifest of this report
      </p>
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
