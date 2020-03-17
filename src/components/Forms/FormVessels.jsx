import React, { useState, useEffect } from 'react';
import axios from 'axios';

// app imports
import Auth from 'Auth';
import { apiPath } from 'config';
import CreateVessel from 'CreateVessel';

const FormVessels = () => {
  // Update data from localStorage if it exists
  const [formData, setFormData] = useState(JSON.parse(localStorage.getItem('formData')) || {});
  const [errors, setErrors] = useState(JSON.parse(localStorage.getItem('errors')) || { });

  const validationRules = [
    {
      field: 'name',
      rule: 'required',
      message: 'You must enter a name',
    },
    {
      field: 'vesselType',
      rule: 'required',
      message: 'You must enter a vessel type',
    },
    {
      field: 'vesselBase',
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
      (!(elem.field in formData) || formData[elem.field] === '')
        ? tempObj[elem.field] = elem.message
        : null;
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
  const clearFormData = (e) => {
    setFormData({});
    setErrors({ });
  };

  // Ensure we have correct formatting
  const getFieldsToSubmit = () => {
    const dataSubmit = {
      name: formData.name,
      vesselType: formData.vesselType,
      vesselBase: formData.vesselBase,
      registration: formData.registration,
    };
    return dataSubmit;
  };

  // Handle Submit, including clearing localStorage
  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkRequiredFields() === false) {
      axios.post(`${apiPath}/user/vessels`, getFieldsToSubmit(), {
        headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
      })
        .then(() => {
          history.goBack(); // Return to page you came from
          clearFormData();
        })
        .catch((err) => {
          if (err.response) {
            if (err.response) {
              switch (err.response.status) {
                case 400: setErrors({ ...errors, CreateVessel: 'This vessel already exists' }); break;
                default: setErrors({ ...errors, CreateVessel: 'Something went wrong' });
              }
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
            <form id="CreateVessel">

              {Object.keys(errors).length > 0 && (
                <div className="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabIndex="-1" data-module="govuk-error-summary">
                  <h2 className="govuk-error-summary__title" id="error-summary-title">
                    There is a problem
                  </h2>
                  <div className="govuk-error-summary__body">
                    <ul className="govuk-list govuk-error-summary__list">
                      {Object.entries(errors).map((elem, i) => (
                        <li key={i}>
                          {elem[0] !== 'title'
                              && <a href={`#${elem[0]}`}>{elem[1]}</a>}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

             <CreateVessel
                handleSubmit={(e) => handleSubmit(e)}
                handleChange={(e) => handleChange(e)}
                data={formData}
                errors={errors}
              />
              <p>
                <a href="/vessels" className="govuk-link govuk-link--no-visited-state" onClick={(e) => clearFormData(e)}>Exit without saving</a>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FormVessels;
