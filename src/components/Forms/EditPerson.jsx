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
    const [dateOfBirthYear, dateOfBirthMonth, dateOfBirthDay] = data.dateOfBirth.split('-');
    const [documentExpiryDateYear, documentExpiryDateMonth, documentExpiryDateDay] = data.documentExpiryDate.split('-');

    const formattedFields = {
      dateOfBirthYear,
      dateOfBirthMonth,
      dateOfBirthDay,
      documentExpiryDateYear,
      documentExpiryDateMonth,
      documentExpiryDateDay,
      peopleType: data.peopleType.name,
    };
    setPersonData({ ...data, ...formattedFields });
  };

  // Reformat dates for api & remove field level keys
  const reformatDate = (data) => {
    const fieldLevelDates = ['documentExpiryDateYear', 'documentExpiryDateMonth', 'documentExpiryDateDay', 'dateOfBirthYear', 'dateOfBirthMonth', 'dateOfBirthDay'];
    const cleanedData = { ...data };

    Object.keys(cleanedData).map((itemKey) => {
      return fieldLevelDates.indexOf(itemKey) >= 0 ? delete cleanedData[itemKey] : null;
    });

    const dataToSubmit = ({
      ...cleanedData,
      documentExpiryDate: formatDate(personData.documentExpiryDateYear, personData.documentExpiryDateMonth, personData.documentExpiryDateDay),
      dateOfBirth: formatDate(personData.dateOfBirthYear, personData.dateOfBirthMonth, personData.dateOfBirthDay),
    });

    return dataToSubmit;
  };


  // Get data to prepopulate the form for this person
  const getPersonData = () => {
    axios.get(`${PEOPLE_URL}/${personId}`, {
      headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
    })
      .then((resp) => {
        setPersonData(resp.data);
        reformatFields(resp.data);
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
    // Original data
    setPersonData({ ...personData, [e.target.name]: e.target.value });
    // Updated data
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    // If date fields exist, format them
    const dataToSubmit = reformatDate(formData);
    axios.patch(`${PEOPLE_URL}/${personId}`, dataToSubmit, {
      headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
    })
      .then(() => {
        clearLocalStorage();
        history.push(PEOPLE_PAGE_URL);
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
