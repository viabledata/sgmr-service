import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import axios from 'axios';

// App imports
import Auth from 'Auth';
import CreatePerson from 'CreatePerson';
import { formatDate } from 'Utils/date';
import { PEOPLE_URL } from 'Constants/ApiConstants';
import { PEOPLE_PAGE_URL } from 'Constants/ClientConstants';


const EditPerson = (props) => {
  const history = useHistory();
  const personId = props.location.state.peopleId;
  const [personData, setPersonData] = useState();
  const [formData, setFormData] = useState();
  const [errors, setErrors] = useState({});

  // reformat dates & peopleType into individual items for form field display
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

  // reformat dates for api
  const reformatDate = () => {
    if (!formData) {
      return null;
    }
    const tempObj = formData;
    // If a date field has changed, reformat date from personData and save back to personData
    if (personData.documentExpiryDateYear || personData.documentExpiryDateMonth || personData.documentExpiryDateDay) {
      tempObj.documentExpiryDate = formatDate(personData.documentExpiryDateYear, personData.documentExpiryDateMonth, personData.documentExpiryDateDay);
    }
    if (personData.dateOfBirthYear || personData.dateOfBirthMonth || personData.dateOfBirthDay) {
      tempObj.dateOfBirth = formatDate(personData.dateOfBirthYear, personData.dateOfBirthMonth, personData.dateOfBirthDay);
    }
    delete tempObj.documentExpiryDateYear;
    delete tempObj.documentExpiryDateMonth;
    delete tempObj.documentExpiryDateDay;
    delete tempObj.dateOfBirthYear;
    delete tempObj.dateOfBirthMonth;
    delete tempObj.dateOfBirthDay;
    setFormData(tempObj);
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
    // // original data
    setPersonData({ ...personData, [e.target.name]: e.target.value });
    // updated data
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // removeError(e.target.name);
  };

  // Clear formData from localStorage
  const clearLocalStorage = () => {
    setPersonData({});
    setFormData({});
    setErrors({ });
  };


  // Handle Submit, including clearing localStorage
  const handleSubmit = (e) => {
    e.preventDefault();
    // if date fields exist, format them
    reformatDate();

    axios.patch(`${PEOPLE_URL}/${personId}`, formData, {
      headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
    })
      .then(() => {
        clearLocalStorage();
        history.push(PEOPLE_PAGE_URL);
      })
      .catch((err) => {
        if (err.response) {
          switch (err.response.status) {
            case 400: console.log(err.data); break;
            case 401: history.push(`/sign-in?source=${location}`); break;
            case 422: history.push(`/sign-in?source=${location}`); break;
            case 405: history.push(`/sign-in?source=${location}`); break;
            default: history.push(`/sign-in?source=${location}`);
          }
        }
      });
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

  // console.log(formData);

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
                handleSubmit={handleSubmit}
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
