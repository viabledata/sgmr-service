import React, { useEffect, useState } from 'react';

// App imports
import { getData, patchData } from '@utils/apiHooks';
import {
  PEOPLE_URL,
  VOYAGE_REPORT_URL,
  VOYAGE_STATUSES,
} from '@constants/ApiConstants';
import { FORM_STEPS } from '@constants/ClientConstants';
import PeopleTable from '@components/Voyage/PeopleTable';
import scrollToTopOnError from '@utils/scrollToTopOnError';
import { formatPerson } from '@components/Voyage/VoyageFormDataFormatting';

const FormVoyagePeople = ({
  voyageId, setErrors, setNextPage, setPageNum,
}) => {
  const [savedPeople, setSavedPeople] = useState([]);
  const [peopleToAdd, setPeopleToAdd] = useState([]);

  const handleLinkToNewPersonForm = (e) => {
    e.preventDefault();
    setPageNum('4b');
  };

  const handleAddPeopleButton = async () => {
    const voyagePeople = await getData(`${VOYAGE_REPORT_URL}/${voyageId}/people`);
    if (!peopleToAdd.length && !voyagePeople.items.length) {
      setErrors({ voyageForm: 'You need to add at least one person to your voyage' });
      scrollToTopOnError('voyageForm');
    } else {
      const people = await Promise.all(
        peopleToAdd.map((personId) => getData(`${PEOPLE_URL}/${personId}`)),
      );
      await patchData(
        `${VOYAGE_REPORT_URL}/${voyageId}`,
        {
          status: VOYAGE_STATUSES.DRAFT,
          people: people.map(formatPerson),
        },
      );
      setNextPage(FORM_STEPS.PEOPLE);
    }
  };

  const fetchSavedPeople = async () => {
    const userSavedPeopleLocal = await getData(PEOPLE_URL);
    setSavedPeople(userSavedPeopleLocal);
  };

  const handlePeopleSelectionChange = (selectedPeople) => {
    setPeopleToAdd(selectedPeople);
  };

  useEffect(() => {
    if (voyageId) {
      fetchSavedPeople();
    }
  }, [voyageId]);

  return (
    <section>
      <h1 className="govuk-heading-xl">Who will be on board for this voyage</h1>

      <p className="govuk-body-l">
        {savedPeople
          ? "Select people you've saved previously to add to this report, or "
          : "You don't have any saved people on your account, "}
        <a
          href="#"
          className="govuk-link govuk-link--no-visited-state"
          onClick={(e) => handleLinkToNewPersonForm(e, voyageId)}
        >
          add a new person
        </a>
      </p>

      {savedPeople && (
        <>
          <PeopleTable
            voyageId={voyageId}
            source="voyage"
            peopleData={savedPeople}
            onSelectionChange={handlePeopleSelectionChange}
          />
          <button
            type="button"
            className="govuk-button"
            data-module="govuk-button"
            onClick={(e) => handleAddPeopleButton(e)}
          >
            Add to report and continue
          </button>
        </>
      )}
    </section>
  );
};

export default FormVoyagePeople;
