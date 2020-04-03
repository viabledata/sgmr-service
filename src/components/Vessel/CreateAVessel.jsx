import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

// app imports
import Auth from 'Auth';
import { VESSELS_URL } from 'Constants/ApiConstants';
import FormVessel from 'FormVessel';

const CreateAVessel = () => {
  const history = useHistory();
  const location = useLocation();
  const checkIfNotVoyageForm = location.pathname.toLowerCase().indexOf('voyage') === -1;
  const path = location.pathname.slice(1);
  const urlParams = location.search.split('source=');
  const [formData, setFormData] = useState(JSON.parse(localStorage.getItem('formData')) || {});
  const [errors, setErrors] = useState(JSON.parse(localStorage.getItem('errors')) || { });

  const validationRules = [
    {
      field: 'vesselName',
      rule: 'required',
      message: 'You must enter a name',
    },
    {
      field: 'vesselType',
      rule: 'required',
      message: 'You must enter a vessel type',
    },
    {
      field: 'moorings',
      rule: 'required',
      message: 'You must enter a usual mooring',
    },
    {
      field: 'registration',
      rule: 'required',
      message: 'You must enter the registration',
    },
  ];

  // Validation
  const removeError = (fieldName) => {
    const tempArr = { ...errors };
    const key = fieldName;
    delete tempArr[key];
    setErrors(tempArr);
  };
  // Handle missing required fields
  const checkRequiredFields = () => {
    const tempObj = {};
    validationRules.map((elem) => {
      if (!(elem.field in formData) || formData[elem.field] === '') {
        tempObj[elem.field] = elem.message;
      }
    });
    setErrors(tempObj);
    return Object.keys(tempObj).length > 0;
  };

  // Update form info to state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    removeError(e.target.name);
  };

  // Clear formData from localStorage
  const clearFormData = () => {
    setFormData({});
    setErrors({ });
  };

  // Handle Submit, including clearing localStorage
  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkRequiredFields() === false) {
      axios.post(VESSELS_URL, formData, {
        headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
      })
        .then(() => {
          // If this is not the voyage form then take user to vessels page, otherwise leave the user here
          if (checkIfNotVoyageForm) {
            clearFormData();
            history.push('/vessels');
          }
        })
        .catch((err) => {
          if (err.response) {
            switch (err.response.status) {
              case 400: setErrors({ ...errors, CreateVessel: 'This vessel already exists' }); break;
              case 422: history.push(`/sign-in?source=${path}`); break;
              case 405: history.push(`/sign-in?source=${path}`); break;
              default: history.push(`/sign-in?source=${location}`);
            }
          }
        });
    }
  };

  // Update localStorage/states
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
                <h2 className="govuk-error-summary__title" id="error-summary-title">
                  There is a problem
                </h2>
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
          <a href="/vessels" className="govuk-link govuk-link--no-visited-state" onClick={clearFormData}>Exit without saving</a>
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
