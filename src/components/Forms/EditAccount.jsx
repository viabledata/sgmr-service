import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


const EditAccount = (props) => {
  const history = useHistory();
  const [formData, setFormData] = useState(JSON.parse(localStorage.getItem('formData')) || {});
  // const [errors, setErrors] = useState(JSON.parse(localStorage.getItem('errors')) || { title: null });

  // Update form info to state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // // Handle errors [for empty fields]
  // const removeError = (fieldName) => {
  //   const tempArr = { ...errors };
  //   const key = fieldName;
  //   delete tempArr[key];
  //   setErrors(tempArr);
  // };
  // const handleErrors = (e, errorText, groupField) => {
  //   // If field value is empty, add error : if field has value, removeError
  //   const name = !groupField ? e.target.name : groupField;
  //   !e.target.value ? setErrors({ ...errors, [name]: errorText }) : removeError(name);
  // };

  // Clear formData from localStorage
  // As localStorage updates whenever there is a change to the value of formData or errors, it clears the field data as part of the set function
  const clearFormData = (e) => {
    setFormData({});
    // setErrors({ title: null });
  };

  // Handle Submit, including clearing localStorage
  const handleSubmit = (e) => {
    // Combine date fields into required format before submit
    e.preventDefault();
    clearFormData();
    history.goBack(); // Return to page you came from
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
            <a className="govuk-breadcrumbs__link" href="/people">Account</a>
          </li>
          <li className="govuk-breadcrumbs__list-item" aria-current="page">Edit account</li>
        </ol>
      </div>
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-xl">Edit account</h1>
            <p className="govuk-body-l">Edit the details of your account</p>
            <form>

              {/* {Object.keys(errors).length > 1 && (
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
              )} */}

              <CreatePerson
                handleSubmit={(e) => handleSubmit(e)}
                handleChange={(e) => handleChange(e)}
                data={formData}
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

export default EditAccount;
