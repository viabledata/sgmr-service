import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import FormVoyageArrival from 'FormVoyageArrival';
import FormVoyageCheckDetails from 'FormVoyageCheckDetails';
import FormVoyageDeparture from 'FormVoyageDeparture';
import FormVoyagePeople from 'FormVoyagePeople';
import FormVoyageResponsiblePerson from 'FormVoyageResponsiblePerson';
import FormVoyageVessel from 'FormVoyageVessel';

const FormVoyage = () => {
  const location = useLocation();
  const history = useHistory();
  const maxPages = 6;
  let [pageNum, setPageNum] = useState(1);
  const [formData, setFormData] = useState(JSON.parse(localStorage.getItem('formData')) || {});
  const [errors, setErrors] = useState(JSON.parse(localStorage.getItem('errors')) || {});
  // Validation
  const removeError = (fieldName) => {
    const tempArr = { ...errors };
    const key = fieldName;
    delete tempArr[key];
    setErrors(tempArr);
  };

  const handleChange = (e) => {
    const {
      name, type, value, checked,
    } = e.target;

    switch (type) {
      case 'checkbox': {
        formData[name] = [...formData[name] || [], value]; // Create array, add current values and new value

        if (!checked) {
          formData[name] = formData[name].filter((formDataValue) => formDataValue !== value); // Remove the current value if it is not checked
        }

        setFormData({ ...formData });
        break;
      }
      default: setFormData({ ...formData, [name]: value }); break;
    }
  };

  const clearFormData = () => {
    setFormData({});
  };

  const setNextPage = () => {
    const nextPage = pageNum < maxPages ? pageNum + 1 : pageNum;
    setPageNum(nextPage);
    history.push(`/save-voyage/page-${nextPage}`);
  };

  const handleSubmit = (e, submitAction) => {
    e.preventDefault();

    submitAction && submitAction(formData);
    console.log(formData)
    setNextPage();
  };

  // Update localStorage to hold page data
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  // useEffect(() => {
  //   localStorage.setItem('errors', JSON.stringify(errors));
  // }, [errors]);

  // Set page number based on current URL
  useEffect(() => {
    const thisPage = location.pathname.split('page-');
    setPageNum(parseInt(thisPage[1], 10));
  }, [location]);




  return (
    <div id="pageContainer" className="govuk-width-container ">
      <a
        className="govuk-back-link"
        onClick={(e) => {
          e.preventDefault();
          history.goBack();
        }}
      >
        Back
      </a>
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <span className="govuk-caption-xl">{`Page ${pageNum} of ${maxPages}`}</span>
            <form>
              {pageNum === 1 && (
                <FormVoyageDeparture
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  data={formData}
                  setErrors={setErrors}
                  removeError={removeError}
                  errors={errors}
                  setFormData={setFormData}
                />
              )}
              {pageNum === 2 && (
                <FormVoyageArrival
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  data={formData}
                  setErrors={setErrors}
                  removeError={removeError}
                  errors={errors}
                  setFormData={setFormData}
                />
              )}
              {pageNum === 3 && (
                <FormVoyageVessel
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  data={formData}
                  setErrors={setErrors}
                  removeError={removeError}
                  errors={errors}
                  setFormData={setFormData}
                />
              )}
              {pageNum === 4 && (
                <FormVoyagePeople
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  data={formData}
                  setErrors={setErrors}
                  removeError={removeError}
                  errors={errors}
                  setFormData={setFormData}
                />
              )}
              {pageNum === 5 && (
                <FormVoyageResponsiblePerson
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  data={formData}
                  setErrors={setErrors}
                  removeError={removeError}
                  errors={errors}
                  setFormData={setFormData}
                />
              )}
              {pageNum === 6 && <FormVoyageCheckDetails />}
              <p>
                <a href="/reports" className="govuk-link govuk-link--no-visited-state" onClick={clearFormData}>Exit without saving</a>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FormVoyage;
