import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

// App imports
import Auth from 'Auth';
import CreatePerson from 'CreatePerson';
import { PEOPLE_URL } from 'Constants/ApiConstants';


const EditPerson = (props) => {
  const personId = props.location.state.peopleId;
  const [personData, setPersonData] = useState();
  const [formData, setFormData] = useState();
  const [errors, setErrors] = useState({});

  // reformat dates & peopleType into individual items for form
  const reformatFields = (data) => {
    const tempObj = data;
    const splitDoB = data.dateOfBirth.split('-');
    const splitDocumentExpiryDate = data.documentExpiryDate.split('-');
    tempObj.peopleType = data.peopleType.name;
    tempObj.dateOfBirthYear = splitDoB[0];
    tempObj.dateOfBirthMonth = splitDoB[1];
    tempObj.dateOfBirthDay = splitDoB[2];
    tempObj.documentExpiryDateYear = splitDocumentExpiryDate[0];
    tempObj.documentExpiryDateMonth = splitDocumentExpiryDate[1];
    tempObj.documentExpiryDateDay = splitDocumentExpiryDate[2];
    setPersonData(tempObj);
  };

  // Get data to prepopulate the form for this person
  const getPersonData = () => {
    axios.get(`${PEOPLE_URL}/${personId}`, {
      headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
    })
      .then((resp) => {
        reformatFields(resp.data);
        setPersonData(resp.data);
        localStorage.setItem('data', JSON.stringify(resp.data));
      })
      .catch((err) => {
        if (err.response) {
          switch (err.response.status) {
            case 401: history.push(`/sign-in?source=${location}`); break;
            case 422: history.push(`/sign-in?source=${location}`); break;
            case 405: history.push(`/sign-in?source=${location}`); break;
            default: history.push(`/sign-in?source=${location}`);
          }
        }
      });
  };

  // Update form info to state
  const handleChange = (e) => {
    // original data
    setPersonData({ ...personData, [e.target.name]: e.target.value });
    // updated data
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // removeError(e.target.name);
  };

  // Clear formData from localStorage
  const clearLocalStorage = () => {
    setPersonData({});
    setErrors({ });
  };

  // Get any fields that changed
  const getFieldsToSubmit = () => {
    const dataSubmit = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      documentType: formData.documentType,
      documentNumber: formData.documentNumber,
      documentExpiryDate: formatDate(formData.documentExpiryDateYear, formData.documentExpiryDateMonth, formData.documentExpiryDateDay),
      documentIssuingState: formData.documentIssuingState,
      peopleType: formData.peopleType,
      gender: formData.gender,
      dateOfBirth: formatDate(formData.dateOfBirthYear, formData.dateOfBirthMonth, formData.dateOfBirthDay),
      placeOfBirth: formData.placeOfBirth,
      nationality: formData.nationality,
    };
    return dataSubmit;
  };


  // Get person data to pass to prepopulate the form
  useEffect(() => {
    getPersonData();
  }, []);

  // Update localStorage if personData or errors changes
  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(personData));
  }, [personData]);

  useEffect(() => {
    localStorage.setItem('errors', JSON.stringify(errors));
  }, [errors]);

  console.log(formData)

  return (
    <div className="govuk-width-container ">
      <div className="govuk-breadcrumbs">
        <ol className="govuk-breadcrumbs__list">
          <li className="govuk-breadcrumbs__list-item">
            <a className="govuk-breadcrumbs__link" href="/people">People</a>
          </li>
          <li className="govuk-breadcrumbs__list-item" aria-current="page">Edit person</li>
        </ol>
      </div>
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-xl">Save a person</h1>
            <p className="govuk-body-l">Update the details of the person you want to edit.</p>
            <form id="CreatePerson">

              {/* {Object.keys(errors).length > 0 && (
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
              )} */}

              <CreatePerson
                handleChange={handleChange}
                data={personData}
                errors={errors}
              />

              <p>
                <a href="/people" className="govuk-link govuk-link--no-visited-state" onClick={(e) => clearLocalStorage(e)}>Exit without saving</a>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default withRouter(EditPerson);
