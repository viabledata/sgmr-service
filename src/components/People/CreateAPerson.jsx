import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import FormPerson from '@components/People/FormPerson';
import scrollToTopOnError from '@utils/scrollToTopOnError';
import { postData } from '@utils/apiHooks';
import { formatDate } from '@utils/date';
import { PEOPLE_URL } from '@constants/ApiConstants';
import { PEOPLE_PAGE_URL } from '@constants/ClientConstants';
import {
  personValidationRules,
  validate,
} from '@components/Forms/validationRules';
import FormError from '@components/Voyage/FormError';

const CreateAPerson = () => {
  const history = useHistory();
  const location = useLocation();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

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
  const validateForm = async (dataToValidate) => {
    const newErrors = await validate(personValidationRules, dataToValidate);

    setErrors(newErrors);
    scrollToTopOnError(newErrors);
    return Object.keys(newErrors).length > 0;
  };

  // Format data to submit
  const formatDataToSubmit = (data) => {
    return {
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!await validateForm(formData)) {
      const resp = await postData(PEOPLE_URL, formatDataToSubmit(formData), location.pathname.substring(1));
      if (resp.errors === true) {
        setErrors({ CreateAPerson: resp.message });
        scrollToTopOnError(errors);
      } else {
        history.push(PEOPLE_PAGE_URL);
      }
    }
  };

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
