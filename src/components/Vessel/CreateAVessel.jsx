import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import axios from 'axios';

// App imports
import Auth from 'Auth';
import FormVessel from 'FormVessel';
import scrollToTopOnError from 'scrollToTopOnError';
import { VESSELS_URL } from 'Constants/ApiConstants';
import { VESSELS_PAGE_URL } from 'Constants/ClientConstants';
import { vesselValidationRules } from 'validation';

const CreateAVessel = () => {
  const history = useHistory();
  const location = useLocation();
  const checkIfNotVoyageForm = location.pathname.toLowerCase().indexOf('voyage') === -1;
  const path = location.pathname.slice(1);
  const urlParams = location.search.split('source=');
  const [formData, setFormData] = useState(JSON.parse(localStorage.getItem('formData')) || {});
  const [errors, setErrors] = useState(JSON.parse(localStorage.getItem('errors')) || { });


  // Clear form field errors
  const removeError = (fieldName) => {
    const errorList = { ...errors };
    const key = fieldName;
    delete errorList[key];
    setErrors(errorList);
  };


  // Update form data as user enters it
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    removeError(e.target.name);
  };


  // Check fields that are required exist
  const areFieldsValid = (dataToValidate) => {
    const fieldsErroring = {};

    vesselValidationRules.map((rule) => {
      if (!(rule.inputField in dataToValidate) || formData[rule.inputField] === '') {
        fieldsErroring[rule.inputField] = rule.message;
      }
    });

    setErrors(fieldsErroring);
    scrollToTopOnError(fieldsErroring);
    return Object.keys(fieldsErroring).length > 0;
  };


  // Clear formData from localStorage
  const clearLocalStorage = () => {
    setFormData({});
    setErrors({ });
  };


  // Handle Submit, including clearing localStorage
  const handleSubmit = (e) => {
    e.preventDefault();

    // Test for any errors
    if (!areFieldsValid(formData)) {
      axios.post(VESSELS_URL, formData, {
        headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
      })
        .then(() => {
          // If this is not the voyage form then take user to vessels page, otherwise leave the user here
          if (checkIfNotVoyageForm) {
            clearLocalStorage();
            history.push(VESSELS_PAGE_URL);
          }
        })
        .catch((err) => {
          if (err.response) {
            switch (err.response.status) {
              case 400:
                setErrors({ ...errors, CreateAVessel: 'This vessel already exists' });
                scrollToTopOnError('CreateAVessel');
                break;
              case 422: history.push(`/sign-in?source=${path}`); break;
              case 405: history.push(`/sign-in?source=${path}`); break;
              default: history.push(`/sign-in?source=${location}`);
            }
          }
        });
    }
  };

  // Update localStorage to persist data if user refreshes the page
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
            <a className="govuk-breadcrumbs__link" href="/vessels">Vessels</a>
          </li>
          <li className="govuk-breadcrumbs__list-item" aria-current="page">Save vessel</li>
        </ol>
      </div>
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-xl">Save vessel</h1>
            <p className="govuk-body-l">Please enter the following information. This information can be re-used when submitting an Advanced Voyage Report.</p>
            <form id="CreateAVessel">
              {Object.keys(errors).length > 0 && (
              <div className="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabIndex="-1" data-module="govuk-error-summary">
                <h2 className="govuk-error-summary__title">
                  There is a problem
                </h2>
                {errors.CreateAVessel
                    && (
                    <span className="govuk-error-message">
                      <span className="govuk-visually-hidden">Error:</span>
                      {errors.CreateAVessel}
                    </span>
                    )}
              </div>
              )}
              <FormVessel
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                data={formData}
                errors={errors}
              />
              {urlParams[1] === 'vessels'
                && (
                <p>
                  <Link to={VESSELS_PAGE_URL} className="govuk-link govuk-link--no-visited-state" onClick={clearLocalStorage}>Exit without saving</Link>
                </p>
                )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateAVessel;
