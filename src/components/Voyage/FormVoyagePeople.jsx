import React, { useEffect, useState } from 'react';

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
  handleSubmit, voyageId, setErrors, createNextPage, setPageNum,
}) => {
  document.title = 'People on your voyage';

  const [savedPeople, setSavedPeople] = useState([]);
  const [voyagePeople, setVoyagePeople] = useState([]);
  const [peopleToAdd, setPeopleToAdd] = useState([]);

  const handleLinkToNewPersonForm = (e) => {
    e.preventDefault();
    setPageNum('4b');
    setErrors({});
  };

  const handleAddPeopleButton = async () => {
    if (!peopleToAdd.length && !voyagePeople.length) {
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
      createNextPage(FORM_STEPS.PEOPLE);
    }
  };

  const fetchVoyagePeople = async () => {
    const response = await getData(`${VOYAGE_REPORT_URL}/${voyageId}/people`);
    setVoyagePeople(response.items);
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
      fetchVoyagePeople();
    }
  }, [voyageId]);

  return (
    <section>
      <h1 className="govuk-heading-xl">Who will be on board for this voyage</h1>

      <p className="govuk-body-l">
        {savedPeople
          ? "Select people you've saved previously to add to this voyage plan, or "
          : "You don't have any saved people on your account, "}
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          href="#"
          className="govuk-link govuk-link--no-visited-state"
          onClick={(e) => handleLinkToNewPersonForm(e, voyageId)}
        >
          add a new person
        </a>
      </p>

      {!!savedPeople.length && (
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
            Add to voyage plan and continue
          </button>
        </>
      )}

      {!!voyagePeople.length && (
        <>
          <p className="govuk-body-l">
            People already added to the manifest:
            <br />
            {voyagePeople.map(({ firstName, lastName }) => `${firstName} ${lastName}`).join(', ')}
          </p>
          <button
            type="button"
            className="govuk-button"
            data-module="govuk-button"
            onClick={(e) => {
              handleSubmit(e, FORM_STEPS.PEOPLE, voyageId);
            }}
          >
            Save and continue
          </button>
        </>
      )}
    </section>
  );
};

export default FormVoyagePeople;
