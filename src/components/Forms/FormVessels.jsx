import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

// app imports
import Auth from 'Auth';
import { apiPath } from 'config';
import CreateVessel from 'CreateVessel';

const FormVessels = () => {
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname.slice(1);
  const urlParams = location.search.split('source=');
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
  // const getFieldsToSubmit = () => {
  //   const dataSubmit = {
  //     name: formData.name,
  //     vesselType: formData.vesselType,
  //     vesselBase: formData.vesselBase,
  //     registration: formData.registration,
  //   };
  //   return dataSubmit;
  // };

  // Handle Submit, including clearing localStorage
  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkRequiredFields() === false) {
      axios.post(`${apiPath}/user/vessels`, formData, {
        headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
      })
        .then(() => {
          // If this is the new vessel form then take user to vessels page, otherwise leave the user here
          if (urlParams[1] === 'vessels') {
            clearFormData();
            history.push('/vessels');
          }
        })
        .catch((err) => {
          if (err.response) {
            if (err.response) {
              switch (err.response.status) {
                case 400: setErrors({ ...errors, CreateVessel: 'This vessel already exists' }); break;
                case 422: history.push(`/sign-in?source=${path}`); break;
                case 405: history.push(`/sign-in?source=${path}`); break;
                default: setErrors({ ...errors, CreateVessel: 'Something went wrong' });
              }
            }
          }
        });
    } else {
      // This means there are errors, so jump user to the error box
      history.push('#CreateVessel');
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
    <>
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
      {urlParams[1] === 'vessels'
        && <p>
          <a href="/vessels" className="govuk-link govuk-link--no-visited-state" onClick={(e) => clearFormData(e)}>Exit without saving</a>
        </p>
      }
    </>
  );
};

export default FormVessels;
