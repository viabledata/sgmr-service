import React, { useState, useEffect } from 'react';

const FormVessels = () => {
  // to do
  // breadcrumbs





  // need to use JSON. as we want to store an object within a local storage object
  const [formData, setFormData] = useState(JSON.parse(localStorage.getItem('formData')) || {});
  const [errors, setErrors] = useState(JSON.parse(localStorage.getItem('errors')) || { title: null });

  // ==== Update form info to state
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //= === Handle errors [for empty fields]
  const removeError = fieldName => {
    const tempArr = { ...errors };
    const key = fieldName;
    delete tempArr[key];
    setErrors(tempArr);
  };
  const handleErrors = (e, errorText) => {
    // if field value is empty, add error : if field has value, removeError
    // eslint-disable-next-line no-unused-expressions
    !e.target.value ? setErrors({ ...errors, [e.target.name]: errorText }) : removeError(e.target.name);
  };

  // ==== Clear formData from localStorage
  // as localStorage updates whenever there is a change to the value of formData or errors, it clears the field data as part of the set function
  const clearFormData = e => {
    if (e) { e.preventDefault(); }
    setFormData({});
    setErrors({ title: null }); // using a default structure here for now -- need to look at if statement in remove error/setError cause they currently spread errors
  };

  //= === Handle Submit, including clearing localStorage
  const handleSubmit = e => {
    e.preventDefault();
    clearFormData();
  };

  //= === Update localStorage to hold page data
  // this is done seperately to handle change as it needs to update when the formData value changes, not when the input field changes
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('errors', JSON.stringify(errors));
  }, [errors]);


  return (
    <div>
      {/* GDS STANDARD TEMPLATE */}
      <div className="govuk-width-container">
        <a href="#back" className="govuk-back-link">Back</a>
        <main className="govuk-main-wrapper">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <h1 className="govuk-heading-xl">Form - Concept Testing</h1>
              <p className="govuk-body">Inputs should keep values on page refresh</p>

              {/* PAGE LEVEL ERRORS */}
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

              {/* FORM */}
              <form>

                {/* FORM FIELD */}
                <div id="form-group" className={`govuk-form-group ${errors.userName ? 'govuk-form-group--error' : ''}`}>
                  <label className="govuk-label" htmlFor="userName">
                    Enter your name
                  </label>
                  {errors.userName
                    && (
                      <span id="errorUserName" className="govuk-error-message">
                        <span className="govuk-visually-hidden">Error:</span> {errors.userName}
                      </span>
                    )}
                  <input
                    className={`govuk-input ${errors.userName ? 'govuk-input--error' : ''}`}
                    id="userName"
                    name="userName"
                    type="text"
                    value={formData.userName || ''}
                    onChange={e => handleChange(e)}
                    onBlur={e => handleErrors(e, 'You must enter your name')}
                    onKeyPress={e => handleErrors(e)}
                  />
                </div>

                {/* FORM FIELD */}
                <div className={`govuk-form-group ${errors.userDetail ? 'govuk-form-group--error' : ''}`}>
                  <label className="govuk-label" htmlFor="userDetail">
                    Tell us about yourself
                  </label>
                  <span id="more-detail-hint" className="govuk-hint">
                    Do you play sports, like music, something else?
                  </span>
                  {errors.userDetail && true
                    && (
                      <span id="some-text-error" className="govuk-error-message">
                        <span className="govuk-visually-hidden">Error:</span> {errors.userDetail}
                      </span>
                    )}
                  <textarea
                    className={`govuk-textarea ${errors.userDetail ? 'govuk-textarea--error' : ''}`}
                    id="userDetail"
                    name="userDetail"
                    rows="5"
                    aria-describedby="user-detail-hint"
                    value={formData.userDetail || ''}
                    onChange={e => handleChange(e)}
                    onBlur={e => handleErrors(e, 'You must write something about yourself')}
                    onKeyPress={e => handleErrors(e)}
                  />
                </div>

                {/* BUTTONS */}
                <button
                  className="govuk-button"
                  data-module="govuk-button"
                  onClick={e => handleSubmit(e)}
                >
                  Save and continue
                </button>
                <button onClick={e => clearFormData(e)}>CLEAR FORM FIELDS</button>

              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FormVessels;
