import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

// app imports
import Auth from '@lib/Auth';
import FormPerson from '@components/People/FormPerson';
import scrollToTopOnError from '@utils/scrollToTopOnError';
import { postData } from '@utils/apiHooks';
import { formatDate, isDateValid, isDateBefore } from '@utils/date';
import { PEOPLE_URL } from '@constants/ApiConstants';
import { PEOPLE_PAGE_URL, SAVE_VOYAGE_PEOPLE_URL } from '@constants/ClientConstants';
import { personValidationRules } from '@components/Forms/validationRules';
import FormError from '@components/Voyage/FormError';

const CreateAPerson = () => {
  const history = useHistory();
  const location = useLocation();
  const source = location.search.split('=');
  const [formData, setFormData] = useState(JSON.parse(localStorage.getItem('formData')) || {});
  const [errors, setErrors] = useState(JSON.parse(localStorage.getItem('errors')) || {});


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


  // Update form data as user enters it
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    removeError(e.target.name);
  };


  // Check fields that are required exist & fields with rules match
  const areFieldsValid = (dataToValidate) => {
    const fieldsErroring = {};

    // Required fields must not be null
    personValidationRules.map((rule) => {
      (!(rule.inputField in dataToValidate) || formData[rule.inputField] === '')
        ? fieldsErroring[rule.errorDisplayId] = rule.message
        : null;
    });

    // DoB must be valid and not in the future
    if (dataToValidate.dateOfBirthYear || dataToValidate.dateOfBirthMonth || dataToValidate.dateOfBirthDay) {
      if (!(isDateValid(dataToValidate.dateOfBirthYear, dataToValidate.dateOfBirthMonth, dataToValidate.dateOfBirthDay))
      || !(isDateBefore(dataToValidate.dateOfBirthYear, dataToValidate.dateOfBirthMonth, dataToValidate.dateOfBirthDay))) {
        fieldsErroring.dateOfBirth = 'You must enter a valid date of birth';
      }
    }
    // Expiry Date must be valid and in the future
    if (dataToValidate.documentExpiryDateYear || dataToValidate.documentExpiryDateMonth || dataToValidate.documentExpiryDateDay) {
      if (!(isDateValid(dataToValidate.documentExpiryDateYear, dataToValidate.documentExpiryDateMonth, dataToValidate.documentExpiryDateDay))
      || isDateBefore(dataToValidate.documentExpiryDateYear, dataToValidate.documentExpiryDateMonth, dataToValidate.documentExpiryDateDay)) {
        fieldsErroring.documentExpiryDate = 'You must enter a valid document expiry date';
      }
    }
    setErrors(fieldsErroring);
    scrollToTopOnError(fieldsErroring);
    return Object.keys(fieldsErroring).length > 0;
  };

  // Clear formData from localStorage
  const clearLocalStorage = () => {
    setFormData({});
    setErrors({ });
  };

  // Format data to submit
  const formatDataToSubmit = (data) => {
    const dataSubmit = {
      firstName: data.firstName,
      lastName: data.lastName,
      documentType: data.documentType,
      documentNumber: data.documentNumber,
      documentExpiryDate: formatDate(data.documentExpiryDateYear, data.documentExpiryDateMonth, data.documentExpiryDateDay),
      documentIssuingState: data.documentIssuingState,
      peopleType: data.peopleType,
      gender: data.gender,
      dateOfBirth: formatDate(data.dateOfBirthYear, data.dateOfBirthMonth, data.dateOfBirthDay),
      placeOfBirth: data.placeOfBirth,
      nationality: data.nationality,
    };
    return dataSubmit;
  };


  // Handle Submit, including clearing localStorage
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!areFieldsValid(formData)) {
      postData(PEOPLE_URL, formatDataToSubmit(formData), location.pathname.substring(1))
        .then((resp) => {
          if (resp.errors === true) {
            setErrors({ CreateAPerson: resp.message });
            scrollToTopOnError(errors);
          } else {
            history.push(PEOPLE_PAGE_URL);
          }
        });
    }
  };

  // Update localStorage to hold page data
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('errors', JSON.stringify(errors));
  }, [errors]);


  return (
    <div className="govuk-width-container ">
      <div className="govuk-breadcrumbs">
        <ol className="govuk-breadcrumbs__list">
          <li className="govuk-breadcrumbs__list-item">
            <a className="govuk-breadcrumbs__link" href={PEOPLE_PAGE_URL}>People</a>
          </li>
          <li className="govuk-breadcrumbs__list-item" aria-current="page">Save a person</li>
        </ol>
      </div>
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-xl">Save a person</h1>
            <p className="govuk-body-l">Provide the details of the person you want to add to your list of saved people.</p>
            <form id="CreateAPerson">

              {Object.keys(errors).length > 0 && (
              <div className="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabIndex="-1" data-module="govuk-error-summary">
                <h2 className="govuk-error-summary__title">
                  There is a problem
                </h2>
                <FormError error={errors.CreateAPerson} />
              </div>
              )}

              <FormPerson
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                clearLocalStorage={clearLocalStorage}
                data={formData}
                formData={formData}
                errors={errors}
              />

            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateAPerson;
