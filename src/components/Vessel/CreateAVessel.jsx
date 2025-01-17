import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

// App imports
import Auth from '../../lib/Auth';
import FormVessel from './FormVessel';
import scrollToTopOnError from '../../utils/scrollToTopOnError';
import { VESSELS_URL } from '../../constants/ApiConstants';
import { VESSELS_PAGE_URL } from '../../constants/ClientConstants';
import { vesselValidationRules } from '../Forms/validationRules';

const CreateAVessel = () => {
  document.title = 'Save pleasure craft';
  const history = useHistory();
  const location = useLocation();
  const checkIfNotVoyageForm = location.pathname.toLowerCase().indexOf('voyage') === -1;
  const path = location.pathname.slice(1);
  const [formData, setFormData] = useState(JSON.parse(sessionStorage.getItem('formData')) || {});
  const [errors, setErrors] = useState(JSON.parse(sessionStorage.getItem('errors')) || {});

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

  // Clear formData from sessionStorage
  const clearSessionStorage = () => {
    setFormData({});
    setErrors({});
  };

  // Handle Submit, including clearing sessionStorage
  const handleSubmit = (e) => {
    e.preventDefault();
    // Test for any errors
    if (!areFieldsValid(formData)) {
      axios.post(VESSELS_URL, formData, {
        headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
      })
        .then(() => {
          // If this is not the voyage form then take user to pleasure crafts page, otherwise leave the user here
          if (checkIfNotVoyageForm) {
            clearSessionStorage();
            history.push(VESSELS_PAGE_URL);
          }
        })
        .catch((err) => {
          if (err.response) {
            switch (err.response.status) {
              case 400:
                setErrors({ ...errors, CreateAVessel: 'This pleasure craft already exists' });
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

  // Update sessionStorage to persist data if user refreshes the page
  useEffect(() => {
    sessionStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    sessionStorage.setItem('errors', JSON.stringify(errors));
  }, [errors]);

  return (
    <div className="govuk-width-container ">
      <div className="govuk-breadcrumbs">
        <ol className="govuk-breadcrumbs__list">
          <li className="govuk-breadcrumbs__list-item">
            <a className="govuk-breadcrumbs__link" href="/pleasure-crafts">Pleasure crafts</a>
          </li>
          <li className="govuk-breadcrumbs__list-item" aria-current="page">Save pleasure craft</li>
        </ol>
      </div>
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-xl">Save pleasure craft</h1>
            <p className="govuk-body-l">Please enter the following information. This information can be re-used when submitting a Pleasure Craft Voyage Plan.</p>
            <form id="CreateAVessel">
              {Object.keys(errors).length >= 1 && (
                <div className="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabIndex="-1" data-module="govuk-error-summary">
                  <h2 className="govuk-error-summary__title">
                    There is a problem
                  </h2>
                  <div className="govuk-error-summary__body">
                    <ul className="govuk-list govuk-error-summary__list">
                      {Object.entries(errors).map((elem) => (
                        <li key={elem[0]}>
                          <a href={`#${elem[0]}`}>{elem[1]}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              <FormVessel
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                data=""
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

export default CreateAVessel;
