import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';

// App imports
import Auth from '@lib/Auth';
import FormVoyageArrival from '@components/Forms/FormVoyageArrival';
import FormVoyageCheckDetails from '@components/Forms/FormVoyageCheckDetails';
import FormVoyageDeparture from '@components/Forms/FormVoyageDeparture';
import FormVoyagePeople from '@components/Forms/FormVoyagePeople';
import FormVoyageResponsiblePerson from '@components/Forms/FormVoyageResponsiblePerson';
import FormVoyageVessel from '@components/Forms/FormVoyageVessel';
import { VOYAGE_REPORT_URL } from '@constants/ApiConstants';

const FormVoyage = () => {
  const location = useLocation();
  const history = useHistory();
  const maxPages = 6;
  let [pageNum, setPageNum] = useState(1);
  const [formData, setFormData] = useState(JSON.parse(localStorage.getItem('formData')) || {});
  const [errors, setErrors] = useState(JSON.parse(localStorage.getItem('errors')) || {});
  const peoplePage = '/save-voyage/page-4';



  const removeError = (fieldName) => {
    const errorArray = { ...errors };
    const key = fieldName;
    delete errorArray[key];
    setErrors(errorArray);
  };


  const handleChange = (e) => {
    const {
      name, type, value, checked, dataset,
    } = e.target;

    switch (type) {
      case 'checkbox': {
        if (dataset.singleOrMulti && dataset.singleOrMulti === 'single') {
          formData[name] = checked && value; // Create array, add current values and new value
        } else {
          formData[name] = [...formData[name] || [], value]; // Create array, add current values and new value

          if (!checked) {
            formData[name] = formData[name].filter((formDataValue) => formDataValue !== value); // Remove the current value if it is not checked
          }
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

  const handleSubmit = (e, submitAction, formStep) => {
    e.preventDefault();

    // Check for people page and delete any people who are now unchecked
    if (location.pathname === peoplePage) {
      const checkboxes = document.querySelectorAll('input[name=people]');
      Array.from(checkboxes).map((person) => {
        // Check if we have pairedId data (passed through if editing form)
        formData.pairedIds
        && formData.pairedIds.map((pair) => {
          if (person.checked === false && pair.personId === person.id) {
            axios.delete(`${VOYAGE_REPORT_URL}/${formData.id}/people/${pair.voyagePersonId}`, {
              headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
            })
              .catch((err) => {
                if (err.response) {
                  switch (err.response.status) {
                    case 401: history.push(`/sign-in?source=${peoplePage}`); break;
                    case 422: history.push(`/sign-in?source=${peoplePage}`); break;
                    case 405: history.push(`/sign-in?source=${peoplePage}`); break;
                    default: console.log(err); break;
                  }
                }
              });
          }
        });
      });
      // Then run submit actions
      submitAction && submitAction({ ...formData, formStep });
    } else {
      // If not people page just run submit actions
      submitAction && submitAction({ ...formData, formStep });
    }
    setNextPage();
  };

  // Update localStorage to hold page data
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

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
              {pageNum === 6 && (
                <FormVoyageCheckDetails
                  data={formData}
                />
              )}
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
