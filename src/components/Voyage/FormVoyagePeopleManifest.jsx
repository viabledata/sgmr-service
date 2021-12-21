import React, { useEffect, useState } from 'react';

import { deleteItem, getData } from '../../utils/apiHooks';
import { VOYAGE_REPORT_URL } from '../../constants/ApiConstants';
import { FORM_STEPS } from '../../constants/ClientConstants';
import PeopleTable from './PeopleTable';
import scrollToTopOnError from '../../utils/scrollToTopOnError';

const FormVoyagePeopleManifest = ({
  handleSubmit, voyageId, setPageNum, setErrors,
}) => {
  document.title = 'People on the manifest';

  const [peopleData, setPeopleData] = useState([]);
  const [makeChanges, setMakeChanges] = useState(false);
  const [removeButtonDisabled, setRemoveButtonDisabled] = useState(true);
  const [peopleToRemove, setPeopleToRemove] = useState([]);

  const handlePeopleSelectionChange = (peopleToRemoveLocal) => {
    setRemoveButtonDisabled(!peopleToRemoveLocal.length);
    setPeopleToRemove(peopleToRemoveLocal);
  };

  const handleRemovePeopleButton = async (e) => {
    e.preventDefault();
    setPeopleData(peopleData.filter((person) => !peopleToRemove.includes(person.id)));
    await Promise.all(
      peopleToRemove.map((personId) => deleteItem(
        `${VOYAGE_REPORT_URL}/${voyageId}/people/${personId}`,
      )),
    );
  };

  const storePeopleData = async () => {
    const voyagePeople = await getData(`${VOYAGE_REPORT_URL}/${voyageId}/people`);
    setPeopleData(voyagePeople.items);
  };

  useEffect(() => {
    if (voyageId) {
      storePeopleData();
    }
  }, [voyageId]);

  const handleMakeChanges = (e) => {
    setErrors([]);
    setMakeChanges(e.currentTarget.value === 'yes');
  };

  return (
    <section>
      <h1 className="govuk-heading-xl">People on the manifest</h1>

      <p className="govuk-body-l">
        {peopleData.length
          ? 'The people you have selected for this voyage are:'
          : 'There are no people on the manifest.'}
      </p>

      {!!peopleData.length && (
        <>
          <PeopleTable
            voyageId={voyageId}
            source="voyage"
            peopleData={peopleData}
            onSelectionChange={handlePeopleSelectionChange}
          />

          <button
            id="removePerson"
            className={`govuk-button govuk-button--warning ${removeButtonDisabled ? 'govuk-button--disabled' : ''}`}
            disabled={removeButtonDisabled}
            aria-disabled={removeButtonDisabled ? 'true' : 'false'}
            data-module="govuk-button"
            onClick={handleRemovePeopleButton}
          >
            Remove person
          </button>
        </>
      )}

      <div className="govuk-form-group">
        <fieldset
          className="govuk-fieldset"
          aria-describedby="confirm-people-hint"
        >
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--s">
            <h1 className="govuk-fieldset__heading govuk-!-font-weight-regular">
              Would you like to make further changes?
            </h1>
          </legend>

          <div className="govuk-radios govuk-radios--inline">
            <div className="govuk-radios__item">
              <input
                className="govuk-radios__input"
                id="confirm-people-yes"
                name="confirm-people"
                type="radio"
                value="yes"
                onChange={handleMakeChanges}
                checked={makeChanges}
              />
              <label
                className="govuk-label govuk-radios__label"
                htmlFor="confirm-people-yes"
              >
                Yes
              </label>
            </div>
            <div className="govuk-radios__item">
              <input
                className="govuk-radios__input"
                id="confirm-people-no"
                name="confirm-people"
                type="radio"
                value="no"
                onChange={handleMakeChanges}
                checked={!makeChanges}
              />
              <label
                className="govuk-label govuk-radios__label"
                htmlFor="confirm-people-no"
              >
                No
              </label>
            </div>
          </div>
        </fieldset>
      </div>

      <button
        type="button"
        className="govuk-button"
        data-module="govuk-button"
        onClick={(e) => {
          if (!peopleData.length && !makeChanges) {
            setErrors({ voyageForm: 'You need to add at least one person to your voyage' });
            scrollToTopOnError('voyageForm');
          } else {
            handleSubmit(e, FORM_STEPS.PEOPLE_MANIFEST, voyageId, { makeChanges });
          }
        }}
      >
        Save and continue
      </button>
    </section>
  );
};

export default FormVoyagePeopleManifest;
