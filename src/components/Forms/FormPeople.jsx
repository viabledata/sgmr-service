import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

// app imports
import { apiPath } from 'config';
import CreatePerson from 'CreatePerson';

const FormPeople = (props) => {
  const history = useHistory();
  const [formData, setFormData] = useState(JSON.parse(localStorage.getItem('formData')) || {});
  const [errors, setErrors] = useState(JSON.parse(localStorage.getItem('errors')) || {});

  const validationRules = [
    {
      field: 'firstName',
      rule: 'required',
      message: 'You must enter a first name',
    },
    {
      field: 'lastName',
      rule: 'required',
      message: 'You must enter a last name',
    },
    {
      field: 'peopleType',
      rule: 'required',
      message: 'You must enter a person type',
    },
    {
      field: 'documentType',
      rule: 'required',
      message: 'You must select a document type',
    },
    {
      field: 'documentNumber',
      rule: 'required',
      message: 'You must enter a document number',
    },
    {
      field: 'documentIssuingState',
      rule: 'required',
      message: 'You must enter the document issuing state',
    },
    {
      field: 'documentExpiryDate',
      rule: 'required',
      message: 'You must enter an expiry date',
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

  // Format date fields
  const formatDateField = (year, month, day) => {
    if (!year || !month || !day || year.length < 4 || month > 12 || month < 1 || day > 31 || day < 1) {
      setErrors({ ...errors, documentExpiryDate: 'You must enter a valid date' });
    } else {
      const newDate = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD').format('YYYY-M-D');
      setFormData({ ...formData, documentExpiryDate: newDate });
      removeError('documentExpiryDate');
    }
  };

  // Clear formData from localStorage
  const clearFormData = (e) => {
    setFormData({});
    setErrors({ });
  };

  // Handle Submit, including clearing localStorage
  const handleSubmit = (e) => {
    e.preventDefault();
    // Format date
    formatDateField(formData.documentExpiryDateYear, formData.documentExpiryDateMonth, formData.documentExpiryDateDay);
    if (checkRequiredFields() === false) {
      axios.patch(`${apiPath}/user/people`, formData)
        .then((resp) => {
          console.log(resp);
          history.goBack(); // Return to page you came from
          clearFormData();
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response);
          }
        });
    };
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
            <form>

              {Object.keys(errors).length > 0 && (
                <div className="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabIndex="-1" data-module="govuk-error-summary">
                  <h2 className="govuk-error-summary__title" >
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

              <CreatePerson
                handleSubmit={(e) => handleSubmit(e)}
                handleChange={(e) => handleChange(e)}
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

export default FormPeople;
