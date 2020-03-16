import React, { useState, useEffect } from 'react';

// app imports
import CreateVessel from 'CreateVessel';

const FormVessels = () => {
  // Update data from localStorage if it exists
  const [formData, setFormData] = useState(JSON.parse(localStorage.getItem('formData')) || {});
  // const [errors, setErrors] = useState(JSON.parse(localStorage.getItem('errors')) || { title: null });

  // // Handle errors
  // const removeError = (fieldName) => {
  //   const tempArr = { ...errors };
  //   const key = fieldName;
  //   delete tempArr[key];
  //   setErrors(tempArr);
  // };

  // const handleErrors = (e, errorText, groupField) => {
  //   // For fields with multiple inputs in a single group
  //   const name = !groupField ? e.target.name : groupField;
  //   // Error onBlur if field is blank
  //   if (!e.target.value) { setErrors({ ...errors, [name]: errorText }); }
  //   // Error onBlur if condition not met
  //   switch (e.target.name) {
  //     case 'email': (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) ? removeError('email') : setErrors({ ...errors, email: errorText }); break;
  //     case 'confirmEmail':
  // formData.email.toLowerCase() === formData.confirmEmail.toLowerCase() ? removeError('confirmEmail') : setErrors({ ...errors, confirmEmail: errorText }); break;
  //     case 'confirmPassword': formData.password === formData.confirmPassword ? removeError('confirmPassword') : setErrors({ ...errors, confirmPassword: errorText }); break;
  //     default: null;
  //   }
  // };

  // Update form info to state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // removeError(e.target.name);
  };

  // Clear formData from localStorage
  const clearFormData = (e) => {
    setFormData({});
    // setErrors({ title: null });
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

  // useEffect(() => {
  //   localStorage.setItem('errors', JSON.stringify(errors));
  // }, [errors]);

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

              {/* {Object.keys(errors).length > 1 && (
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
              )} */}

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
