import React, { useState, useEffect } from 'react';

// app imports
import CreateVessel from 'CreateVessel';

const FormVessels = () => {
  // Update data from localStorage if it exists
  const [formData, setFormData] = useState(JSON.parse(localStorage.getItem('formData')) || {});
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
  const handleErrors = (e, errorText) => {
    // If field value is empty, add error : if field has value, removeError
    !e.target.value ? setErrors({ ...errors, [e.target.name]: errorText }) : removeError(e.target.name);
  };

  // Clear formData from localStorage
  // As localStorage updates whenever there is a change to the value of formData or errors, it clears the field data as part of the set function
  const clearFormData = (e) => {
    setFormData({});
    setErrors({ title: null });
  };

  // Handle Submit, including clearing localStorage
  const handleSubmit = (e) => {
    e.preventDefault();
    clearFormData();
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
            <form>

              {Object.keys(errors).length > 1 && (
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
