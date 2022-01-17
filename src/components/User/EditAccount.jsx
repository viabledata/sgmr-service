import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

// App imports
import UserContext from '../UserContext';
import { USER_URL } from '../../constants/ApiConstants';
import { VALID_INTERNATIONAL_MOBILE_REGEX } from '../Forms/validationRules';
import Auth from '../../lib/Auth';
import FormError from '../Voyage/FormError';

const EditAccount = () => {
  document.title = 'Edit account';

  const history = useHistory();
  // Calling the user from context
  const { user, setUser } = useContext(UserContext);

  // Prepopulating the form with user info
  const [formData, setFormData] = useState(
    {
      firstName: user.firstName,
      lastName: user.lastName,
      mobileNumber: user.mobileNumber,
    } || {},
  );
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
      if (!(elem.field in formData) || formData[elem.field] === '') {
        tempObj[elem.field] = elem.message;
      } else {
        tempObj[elem.field] = null;
      }
      if (!(VALID_INTERNATIONAL_MOBILE_REGEX.test(formData.mobileNumber))) {
        tempObj.mobileNumber = 'You must enter a valid phone number e.g. 07700 900982, +33 63998 010101';
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
    setErrors({});
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkRequiredFields()) {
      axios.patch(USER_URL, formData, {
        headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
      })
        .then((resp) => setUser(resp.data))
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
            <Link className="govuk-breadcrumbs__link" to="/account">Account</Link>
          </li>
          <li className="govuk-breadcrumbs__list-item" aria-current="page">Edit account</li>
        </ol>
      </div>
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
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
                      {Object.entries(errors).map((elem) => (
                        <li key={elem.id}>
                          {elem[0] !== 'title'
                            && <a href={`#${elem[0]}`}>{elem[1]}</a>}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div id="firstName" className={`govuk-form-group ${errors.firstName ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label govuk-label--m" htmlFor="firstName">
                  First name
                </label>
                <FormError error={errors.firstName} />
                <input
                  className="govuk-input"
                  name="firstName"
                  id="firstName"
                  type="text"
                  value={formData.firstName || ''}
                  onChange={handleChange}
                />
              </div>

              <div id="lastName" className={`govuk-form-group ${errors.lastName ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label govuk-label--m" htmlFor="lastName">
                  Last name
                </label>
                <FormError error={errors.lastName} />
                <input
                  className="govuk-input"
                  name="lastName"
                  id="lastName"
                  type="text"
                  value={formData.lastName || ''}
                  onChange={handleChange}
                />
              </div>

              <div id="mobileNumber" className={`govuk-form-group ${errors.mobileNumber ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label govuk-label--m" htmlFor="mobileNumber">
                  Telephone number
                </label>
                <FormError error={errors.mobileNumber} />
                <input
                  className="govuk-input"
                  name="mobileNumber"
                  id="mobileNumber"
                  type="text"
                  value={formData.mobileNumber || ''}
                  onChange={handleChange}
                />
              </div>

              <div id="submitBlock">
                <button
                  className="govuk-button"
                  type="submit"
                  data-module="govuk-button"
                  onClick={handleSubmit}
                >
                  Save changes
                </button>
              </div>

              <p>
                <Link to="/account" className="govuk-link govuk-link--no-visited-state" onClick={clearFormData}>Exit without saving</Link>
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
          <Link className="govuk-button govuk-button--warning" to="/account/delete">
            Delete this account
          </Link>
        </p>
      </main>
    </div>

  );
};

export default EditAccount;
