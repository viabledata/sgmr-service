import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// App imports
import { USER_URL } from '@constants/ApiConstants';
import Auth from '@lib/Auth';

const EditAccount = (data) => {
  const history = useHistory();
  const [formData, setFormData] = useState(JSON.parse(localStorage.getItem('data')) || {});
  const [errors, setErrors] = useState({});

  const validationRules = [
    {
      field: 'firstName',
      rule: 'required',
      message: 'You must enter your first name',
    },
    {
      field: 'lastName',
      rule: 'required',
      message: 'You must enter your last name',
    },
    {
      field: 'email',
      rule: 'required',
      message: 'You must enter your email',
    },
    {
      field: 'mobileNumber',
      rule: 'required',
      message: 'You must enter your mobile number',
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
    setErrors({});
  };

  // Handle Submit, including clearing localStorage
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkRequiredFields()) {
      axios.patch(USER_URL, formData, {
        headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
      })
        .then(() => {
          history.push('/account');
        })
        .catch((err) => {
          if (err.response) {
            switch (err.response.status) {
              case 401: history.push('/sign-in?source=account'); break;
              default: history.push('/sign-in?source=account'); break;
            }
          }
        });
    } else {
      // This means there are errors, so jump user to the error box
      history.push('#EditUser');
    }
  };


  return (
    <div className="govuk-width-container ">
      <div className="govuk-breadcrumbs">
        <ol className="govuk-breadcrumbs__list">
          <li className="govuk-breadcrumbs__list-item">
            <a className="govuk-breadcrumbs__link" href="/account">Account</a>
          </li>
          <li className="govuk-breadcrumbs__list-item" aria-current="page">Edit account</li>
        </ol>
      </div>
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-xl">Edit account</h1>
            <p className="govuk-body-l">Edit the details of your account</p>
            <form id="EditUser">

              {Object.keys(errors).length > 1 && (
                <div className="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabIndex="-1" data-module="govuk-error-summary">
                  <h2 className="govuk-error-summary__title">
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

              <div id="firstName" className="govuk-form-group">
                <label className="govuk-label govuk-label--m" htmlFor="firstName">
                  Given name
                </label>
                <input
                  className="govuk-input"
                  name="firstName"
                  type="text"
                  value={formData.firstName || ''}
                  onChange={handleChange}
                />
              </div>

              <div id="lastName" className="govuk-form-group">
                <label className="govuk-label govuk-label--m" htmlFor="lastName">
                  Surname
                </label>
                <input
                  className="govuk-input"
                  name="lastName"
                  type="text"
                  value={formData.lastName || ''}
                  onChange={handleChange}
                />
              </div>

              <div id="email" className="govuk-form-group">
                <label className="govuk-label govuk-label--m" htmlFor="email">
                  Email
                </label>
                <input
                  className="govuk-input"
                  name="email"
                  type="text"
                  value={formData.email || ''}
                  onChange={handleChange}
                />
              </div>

              <div id="mobileNumber" className="govuk-form-group">
                <label className="govuk-label govuk-label--m" htmlFor="mobileNumber">
                  Mobile number
                </label>
                <input
                  className="govuk-input"
                  name="mobileNumber"
                  type="text"
                  value={formData.mobileNumber || ''}
                  onChange={handleChange}
                />
              </div>

              <div id="submitBlock">
                <button
                  className="govuk-button"
                  data-module="govuk-button"
                  onClick={handleSubmit}
                >
                  Save changes
                </button>
              </div>

              <p>
                <a href="/account" className="govuk-link govuk-link--no-visited-state" onClick={clearFormData}>Exit without saving</a>
              </p>
            </form>
          </div>
        </div>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-full">
            <hr className="govuk-section-break govuk-section-break--visible govuk-section-break--xl govuk-!-margin-top-0" />
          </div>
        </div>

        <h2 className="govuk-heading-m">Delete account</h2>
        <p className="govuk-body-l">Delete this account and stop using the service.</p>
        <p>
          <a href="/" className="govuk-link govuk-link--no-visited-state" onClick={(e) => deleteUser(e)}>Delete this account</a>
        </p>
      </main>
    </div>

  );
};

export default EditAccount;
