import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  PEOPLE_URL,
  VOYAGE_REPORT_URL,
  VOYAGE_STATUSES,
} from '../../constants/ApiConstants';
import { FORM_STEPS } from '../../constants/ClientConstants';
import { getData, patchData } from '../../utils/apiHooks';
import scrollToTopOnError from '../../utils/scrollToTopOnError';
import sortNames from '../../utils/sortData';
import PeopleTable from './PeopleTable';
import { formatPerson } from './VoyageFormDataFormatting';

const FormVoyagePeople = ({
  voyageId, setErrors, createNextPage,
}) => {
  document.title = 'People on your voyage';

  const [savedPeople, setSavedPeople] = useState([]);
  const [peopleToAdd, setPeopleToAdd] = useState([]);

  const handleAddPeopleButton = async () => {
    if (!peopleToAdd.length) {
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

  const fetchSavedPeople = async () => {
    const userSavedPeopleLocal = await getData(PEOPLE_URL);
    setSavedPeople(sortNames(userSavedPeopleLocal));
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
          ? "Select people you've saved previously to add to this voyage plan, or "
          : "You don't have any saved people on your account, "}
        <Link
          to={{
            pathname: '/people/save-person/page-1',
            state: { source: 'voyage' },
          }}
          aria-label="Save a new person"
        >
          add a new person
        </Link>
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
    </section>
  );
};

export default FormVoyagePeople;
