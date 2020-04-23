import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import axios from 'axios';

// App imports
import { PEOPLE_URL } from '@constants/ApiConstants';
import { PEOPLE_PAGE_URL } from '@constants/ClientConstants';
import { personValidationRules } from '@components/Forms/validationRules';
import { getData, patchData } from '@utils/apiHooks';
import { isDateValid, isDateBefore } from '@utils/date';
import scrollToTopOnError from '@utils/scrollToTopOnError';

import Auth from '@lib/Auth';
import FormPerson from '@components/People/FormPerson';
import PeopleFormDataFormatting from '@components/People/PeopleFormDataFormatting';


const EditPerson = (props) => {
  const history = useHistory();
  const [personId, setPersonId] = useState();
  const [personData, setPersonData] = useState();
  const [formData, setFormData] = useState(JSON.parse(localStorage.getItem('formData')) || {});
  const [errors, setErrors] = useState(JSON.parse(localStorage.getItem('errors')) || {});
  console.log(errors);

  // Reformat dates & peopleType into individual items for form field display
  const reformatFields = (data) => {
    let formattedFields = { peopleType: data.peopleType.name };
    let originalData = { ...data };

    // Spread date from grouped field to individual fields
    if (data.dateOfBirth) {
      const [dateOfBirthYear, dateOfBirthMonth, dateOfBirthDay] = data.dateOfBirth.split('-');
      delete originalData.dateOfBirth;
      formattedFields = {
        ...formattedFields,
        dateOfBirthYear,
        dateOfBirthMonth,
        dateOfBirthDay,
      };
    }
    if (data.documentExpiryDate) {
      const [documentExpiryDateYear, documentExpiryDateMonth, documentExpiryDateDay] = data.documentExpiryDate.split('-');
      delete originalData.documentExpiryDate;
      formattedFields = {
        ...formattedFields,
        documentExpiryDateYear,
        documentExpiryDateMonth,
        documentExpiryDateDay,
      };
    }
    setPersonData({ ...originalData, ...formData, ...formattedFields });
  };


  // Get data to prepopulate the form for this person
  const getPersonData = () => {
    getData(`${PEOPLE_URL}/${personId}`, 'people')
      .then((resp) => {
        reformatFields(resp);
        localStorage.setItem('data', JSON.stringify(resp));
      });
  };


  // Clear formData from localStorage
  const clearLocalStorage = () => {
    setPersonData({});
    setFormData({});
    setErrors({ });
  };


  // Clear errors
  const removeError = (fieldName) => {
    const errorList = { ...errors };
    let key;

    if (fieldName.includes('dateOfBirth')) {
      key = 'dateOfBirth';
    } else if (fieldName.includes('documentExpiryDate')) {
      key = 'documentExpiryDate';
    } else {
      key = fieldName;
    }
    delete errorList[key];
    setErrors(errorList);
  };


  // Update form and vessel data if user changes any field
  const handleChange = (e) => {
    setPersonData({ ...personData, [e.target.name]: e.target.value });
    setFormData({ ...formData, [e.target.name]: e.target.value });
    removeError(e.target.name);
  };


  // Check validation
  const areFieldsValid = (dataFromForm, dataFromPerson) => {
    const fieldsErroring = {};
    // Create list of fields to test
    const dataToTest = [];

    Object.entries(dataFromPerson).map((item) => {
      if (Object.keys(dataFromForm).indexOf(item[0]) !== -1) {
        dataToTest.push({ [item[0]]: dataFromForm[item[0]] });
      } else {
        dataToTest.push({ [item[0]]: item[1] });
      }
    });

    // Check required fields are not empty
    personValidationRules.map((rule) => {
      if (!(rule.inputField in dataToTest) || dataToTest[rule.inputField] === '') {
        fieldsErroring[rule.errorDisplayId] = rule.message;
      }
    });
    // Check date fields have valid format
    if (!(isDateValid(dataToTest.documentExpiryDateYear, dataToTest.documentExpiryDateMonth, dataToTest.documentExpiryDateDay))) {
      fieldsErroring.documentExpiryDate = 'You must enter a valid date';
    }
    if (!(isDateValid(dataToTest.dateOfBirthYear, dataToTest.dateOfBirthMonth, dataToTest.dateOfBirthDay))) {
      fieldsErroring.dateOfBirth = 'You must enter a valid date';
    }
    // Date of Birth must be before today
    if (!(isDateBefore(dataToTest.dateOfBirthYear, dataToTest.dateOfBirthMonth, dataToTest.dateOfBirthDay))) {
      fieldsErroring.dateOfBirth = 'You must enter a valid date of birth date';
    }
    // Document expiry date must be after today
    if ((isDateBefore(dataToTest.documentExpiryDateYear, dataToTest.documentExpiryDateMonth, dataToTest.documentExpiryDateDay))) {
      fieldsErroring.documentExpiryDate = 'You must enter a valid document expiry date';
    }

    setErrors(fieldsErroring);
    scrollToTopOnError(fieldsErroring);
    return Object.keys(fieldsErroring).length > 0;
  };


  // Handle Submit, including clearing localStorage
  const handleSubmit = (e) => {
    e.preventDefault();
    if (areFieldsValid(formData, personData)) {
      patchData(`${PEOPLE_URL}/${personId}`, PeopleFormDataFormatting(formData))
        .then((resp) => {
          if (resp.errors) {
            setErrors({ EditPerson: resp.message });
            scrollToTopOnError('EditPerson');
          } else {
            clearLocalStorage();
            history.push(PEOPLE_PAGE_URL);
          }
        });
    }
  };


  // Triggers
  useEffect(() => {
    if (props && props.location && props.location.state && props.location.state.peopleId) {
      setPersonId(props.location.state.peopleId);
    } else if (JSON.parse(localStorage.getItem('data')).id) {
      setPersonId(JSON.parse(localStorage.getItem('data')).id);
    }
  }, []);

  useEffect(() => {
    if (personId) { getPersonData(); }
  }, [personId]);

  // Persist form data if page refreshed
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('errors', JSON.stringify(errors));
  }, [errors]);


  if (!personData) { return null; }
  return (
    <div className="govuk-width-container ">
      <div className="govuk-breadcrumbs">
        <ol className="govuk-breadcrumbs__list">
          <li className="govuk-breadcrumbs__list-item">
            <a className="govuk-breadcrumbs__link" href={PEOPLE_PAGE_URL}>People</a>
          </li>
          <li className="govuk-breadcrumbs__list-item" aria-current="page">Edit person</li>
        </ol>
      </div>
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-xl">Edit person</h1>
            <p className="govuk-body-l">Update the details of the person you want to edit.</p>
            <form id="EditPerson">

              {Object.keys(errors).length > 0 && (
                <div className="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabIndex="-1" data-module="govuk-error-summary">
                  <h2 className="govuk-error-summary__title">
                    There is a problem
                  </h2>
                  {errors.EditPerson
                    && (
                    <span className="govuk-error-message">
                      <span className="govuk-visually-hidden">Error:</span>
                      {errors.EditPerson}
                    </span>
                    )}
                </div>
              )}

              <FormPerson
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                clearLocalStorage={clearLocalStorage}
                data={personData}
                formData={formData}
                errors={errors || ''}
              />

            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default withRouter(EditPerson);
