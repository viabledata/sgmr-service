import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

// app imports
import Auth from 'Auth';
import FormPerson from 'FormPerson';
import scrollToTopOnError from 'scrollToTopOnError';
import { formatDate, isDateValid } from 'Utils/date';
import { PEOPLE_URL } from 'Constants/ApiConstants';
import { PEOPLE_PAGE_URL, SAVE_VOYAGE_PEOPLE_URL } from 'Constants/ClientConstants';
import { personValidationRules } from 'validation';

const CreateAPerson = () => {
  const history = useHistory();
  const location = useLocation();
  const pathName = useLocation().pathname.slice(1);
  const source = useLocation().search.split('=');
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

  


  // Handle missing required fields
  const checkRequiredFields = () => {
    const tempObj = {};
    validationRules.map((elem) => {
      (!(elem.field in formData) || formData[elem.field] === '')
        ? tempObj[elem.field] = elem.message
        : null;
    });
    setErrors(tempObj);
    return Object.keys(tempObj).length > 0;
  };


  // Clear formData from localStorage
  const clearFormData = () => {
    setFormData({});
    setErrors({ });
  };

  // Ensure we have correct formatting
  const getFieldsToSubmit = () => {
    const dataSubmit = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      documentType: formData.documentType,
      documentNumber: formData.documentNumber,
      documentExpiryDate: formatDate(formData.documentExpiryDateYear, formData.documentExpiryDateMonth, formData.documentExpiryDateDay),
      documentIssuingState: formData.documentIssuingState,
      peopleType: formData.peopleType,
      gender: formData.gender,
      dateOfBirth: formatDate(formData.dateOfBirthYear, formData.dateOfBirthMonth, formData.dateOfBirthDay),
      placeOfBirth: formData.placeOfBirth,
      nationality: formData.nationality,
    };
    return dataSubmit;
  };


  // Handle Submit, including clearing localStorage
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isDateValid(formData.documentExpiryDateYear, formData.documentExpiryDateMonth, formData.documentExpiryDateDay)) {
      removeError('documentExpiryDate');
    } else {
      setErrors({ ...errors, documentExpiryDate: 'You must enter a valid date' });
    }
    const fields = getFieldsToSubmit();

    if (!checkRequiredFields()) {
      axios.post(PEOPLE_URL, fields, {
        headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
      })
        .then(() => {
          // Only clear data if this is the people form;
          if (source[1] === 'voyage') {
            history.push(SAVE_VOYAGE_PEOPLE_URL);
          } else {
            clearFormData();
            history.push(PEOPLE_PAGE_URL);
          }
        })
        .catch((err) => {
          if (err.response) {
            switch (err.response.status) {
              case 400: setErrors({ ...errors, FormPerson: err.response.data.message }); break;
              case 401: history.push(`/sign-in?source=${location}`); break;
              case 422: history.push(`/sign-in?source=${location}`); break;
              case 405: history.push(`/sign-in?source=${location}`); break;
              default: history.push(`/sign-in?source=${location}`);
            }
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
            <a className="govuk-breadcrumbs__link" href="/people">People</a>
          </li>
          <li className="govuk-breadcrumbs__list-item" aria-current="page">Save a person</li>
        </ol>
      </div>
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-xl">Save a person</h1>
            <p className="govuk-body-l">Provide the details of the person you want to add to your list of saved people.</p>
            <form id="FormPerson">

              {Object.keys(errors).length > 0 && (
              <div className="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabIndex="-1" data-module="govuk-error-summary">
                <h2 className="govuk-error-summary__title">
                  There is a problem
                </h2>
                {errors.FormPerson
                    && (
                    <span className="govuk-error-message">
                      <span className="govuk-visually-hidden">Error:</span>
                      {errors.FormPerson}
                    </span>
                    )}
              </div>
              )}

              <FormPerson
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                data={formData}
                errors={errors}
              />

              <p>
                <a href="/people" className="govuk-link govuk-link--no-visited-state" onClick={(e) => clearFormData(e)}>Exit without saving</a>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateAPerson;
