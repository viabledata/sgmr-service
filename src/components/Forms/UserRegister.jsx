import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const UserRegister = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState(JSON.parse(localStorage.getItem('errors')) || { title: null });

  // Update form info to state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle errors [for empty fields]
  const removeError = (fieldName) => {
    const tempArr = { ...errors };
    const key = fieldName;
    delete tempArr[key];
    setErrors(tempArr);
  };
  const handleErrors = (e, errorText, groupField) => {
    // If field value is empty, add error : if field has value, removeError
    const name = !groupField ? e.target.name : groupField;
    !e.target.value ? setErrors({ ...errors, [name]: errorText }) : removeError(name);
  };

  // Handle Submit, including clearing localStorage
  const handleSubmit = (e) => {
    // Combine date fields into required format before submit
    e.preventDefault();
    history.goBack(); // Return to page you came from
  };

  // Update localStorage to hold page data (errors only on this form)
  useEffect(() => {
    localStorage.setItem('errors', JSON.stringify(errors));
  }, [errors]);

  return (
    <div id="pageContainer" className="govuk-width-container ">
      <a className="govuk-back-link" onClick={(e) => {
        e.preventDefault();
        history.goBack();
      }}>
        Back
      </a>
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-xl">Save a person</h1>
            <p className="govuk-body-l">Provide the details of the person you want to add to your list of saved people.</p>
            <form>

              {Object.keys(errors).length > 1 && (
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

              <div id="givenName" className={`govuk-form-group ${errors.givenName ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label govuk-label--m" htmlFor="givenName">
                  Given name
                </label>
                <input
                  className="govuk-input"
                  name="givenName"
                  type="text"
                  value={formData.givenName || ''}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleErrors(e, 'You must enter your given name')}
                  onKeyPress={(e) => handleErrors(e)}
                />
              </div>

              <div id="surname" className={`govuk-form-group ${errors.surname ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label govuk-label--m" htmlFor="surname">
                  Surname
                </label>
              <input
                  className="govuk-input"
                  name="surname"
                  type="text"
                  value={formData.surname || ''}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleErrors(e, 'You must enter your surname')}
                  onKeyPress={(e) => handleErrors(e)}
                />
              </div>

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

export default UserRegister;
