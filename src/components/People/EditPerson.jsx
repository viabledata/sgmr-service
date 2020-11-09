import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';

// App imports
import { PEOPLE_URL } from '@constants/ApiConstants';
import { PEOPLE_PAGE_URL } from '@constants/ClientConstants';
import { formatDate, splitDate } from '@utils/date';
import { getData, patchData } from '@utils/apiHooks';
import getId from '@utils/getIdHook';
import scrollToTopOnError from '@utils/scrollToTopOnError';
import FormPerson from '@components/People/FormPerson';
import FormError from '@components/Voyage/FormError';


const EditPerson = () => {
  const history = useHistory();
  const [personId, setPersonId] = useState();
  const [personData, setPersonData] = useState();
  const [formData, setFormData] = useState(JSON.parse(localStorage.getItem('formData')) || {});
  const [errors, setErrors] = useState(JSON.parse(localStorage.getItem('errors')) || {});


  const formatFieldsForForm = (data) => {
    let formattedDateFields;
    Object.entries(data).map((item) => {
      if (item[0].search(/date/i) !== -1) {
        const dateFields = splitDate(item[1], item[0]);
        formattedDateFields = { ...formattedDateFields, ...dateFields };
      }
    });
    setFormData({
      ...personData,
      ...formData,
      ...formattedDateFields,
      id: personId,
    });
  };


  const getPersonData = () => {
    getData(`${PEOPLE_URL}/${personId}`, 'people')
      .then((resp) => {
        setPersonData(resp);
        formatFieldsForForm(resp);
        localStorage.setItem('data', JSON.stringify(resp));
      });
  };


  // Clear formData from localStorage
  const clearLocalStorage = () => {
    setPersonData({});
    setFormData({});
    setErrors({ });
  };


  // Clear errors
  const removeError = (fieldName) => {
    const errorList = { ...errors };
    let key;

    if (fieldName.includes('dateOfBirth')) {
      key = 'dateOfBirth';
    } else if (fieldName.includes('documentExpiryDate')) {
      key = 'documentExpiryDate';
    } else {
      key = fieldName;
    }
    delete errorList[key];
    setErrors(errorList);
  };


  // Update form and vessel data if user changes any field
  const handleChange = (e) => {
    setPersonData({ ...personData, [e.target.name]: e.target.value });
    setFormData({ ...formData, [e.target.name]: e.target.value });
    removeError(e.target.name);
  };


  // Format submit data
  const PeopleFormDataFormatting = (data) => {
    const dataList = {
    };

    Object.entries(data).map((item) => {
      // If this is a date item, reformat to a single item
      if (item[0].search(/year/i) > 0) {
        const fieldName = item[0].slice(0, (item[0].length - 4));
        dataList[fieldName] = formatDate(data[`${fieldName}Year`], data[`${fieldName}Month`], data[`${fieldName}Day`]);
      }

      // If this is a time item, reformat to a single item
      if (item[0].search(/hour/i) > 0) {
        const fieldName = item[0].slice(0, (item[0].length - 4));
        // If hour or minute are not null then add, else, skip the time field
        if (`${data[`${fieldName}Hour`]}`.length > 0 && `${data[`${fieldName}Minute`]}`.length > 0) {
          dataList[fieldName] = (`${data[`${fieldName}Hour`]}:${data[`${fieldName}Minute`]}`);
        }
      }

      if (
        item[0].search(/year/i) === -1 // it's not the year part of the date (handed above)
            && item[0].search(/month/i) === -1 // it's not the month part of the date (handed above)
            && item[0].search(/day/i) === -1 // it's not the day part of the date (handled above)
            && item[0].search(/hour/i) === -1 // it's not the hour part of the time
            && item[0].search(/minute/i) === -1 // it's not the minute part of the time
            && item[1] // it's value is not null
            && item[0].search(/id/i) === -1 // it's not the id field
            && typeof item[1] !== 'object' // it's not something being passed in obj form to us from an existing voyage
      ) {
        // Then add it to dataList
        dataList[item[0]] = item[1];
      }
    });
    return dataList;
  };


  // Handle Submit, including clearing localStorage
  const handleSubmit = (e) => {
    e.preventDefault();
    if ((formData, personData)) {
      patchData(`${PEOPLE_URL}/${personId}`, (PeopleFormDataFormatting(formData)))
        .then((resp) => {
          if (resp.errors) {
            setErrors({ EditPerson: resp.message });
            scrollToTopOnError('EditPerson');
          } else {
            clearLocalStorage();
            history.push(PEOPLE_PAGE_URL);
          }
        });
    }
  };


  // Triggers
  useEffect(() => {
    setPersonId(getId('people'));
  }, []);

  useEffect(() => {
    if (personId) { getPersonData(); }
  }, [personId]);

  // Persist form data if page refreshed
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('errors', JSON.stringify(errors));
  }, [errors]);


  if (!personData) { return null; }
  return (
    <div className="govuk-width-container ">
      <div className="govuk-breadcrumbs">
        <ol className="govuk-breadcrumbs__list">
          <li className="govuk-breadcrumbs__list-item">
            <a className="govuk-breadcrumbs__link" href={PEOPLE_PAGE_URL}>People</a>
          </li>
          <li className="govuk-breadcrumbs__list-item" aria-current="page">Edit person</li>
        </ol>
      </div>
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-xl">Edit person</h1>
            <p className="govuk-body-l">Update the details of the person you want to edit.</p>
            <form id="EditPerson">

              {Object.keys(errors).length > 0 && (
                <div className="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabIndex="-1" data-module="govuk-error-summary">
                  <h2 className="govuk-error-summary__title">
                    There is a problem
                  </h2>
                  <FormError error={errors.EditPerson} />
                </div>
              )}

              <FormPerson
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                clearLocalStorage={clearLocalStorage}
                data={personData}
                formData={formData}
                errors={errors || ''}
              />

            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default withRouter(EditPerson);
