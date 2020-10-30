import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';

// App imports
import { VESSELS_URL } from '@constants/ApiConstants';
import { VESSELS_PAGE_URL } from '@constants/ClientConstants';
import { vesselValidationRules } from '@components/Forms/validationRules';
import { getData, patchData } from '@utils/apiHooks';
import getId from '@utils/getIdHook';
import scrollToTopOnError from '@utils/scrollToTopOnError';

import FormVessel from '@components/Vessel/FormVessel';
import VesselDataFormatting from '@components/Vessel/VesselDataFormatting';
import FormError from '@components/Voyage/FormError';


const EditVessel = () => {
  const history = useHistory();
  const [vesselId, setVesselId] = useState();
  const [vesselData, setVesselData] = useState();
  const [formData, setFormData] = useState(JSON.parse(localStorage.getItem('formData')) || {});
  const [errors, setErrors] = useState(JSON.parse(localStorage.getItem('errors')) || {});


  // Populate the form with this vessel's data
  const getVesselData = () => {
    getData(`${VESSELS_URL}/${vesselId}`, 'vessel')
      .then((resp) => {
        setVesselData(resp);
        setFormData({ ...resp, ...formData, id: vesselId });
        // localStorage.setItem('formData', JSON.stringify(resp));
      });
  };


  // Clear form field errors
  const removeError = (fieldName) => {
    const errorList = { ...errors };
    // Delete the error
    const key = fieldName;
    delete errorList[key];
    setErrors(errorList);
  };


  // Update form and vessel data if user changes any field
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    removeError(e.target.name);
  };


  // Check fields that have been changed are valid
  const areFieldsValid = (dataToValidate) => {
    const fieldsErroring = {};

    Object.entries(dataToValidate).map((field) => {
      const fieldName = field[0];
      const fieldValue = field[1];

      // Test for empty required fields
      vesselValidationRules.find((object) => {
        if (!fieldValue && object.inputField === fieldName) {
          fieldsErroring[fieldName] = object.message;
        }
      });
    });

    setErrors(fieldsErroring);
    scrollToTopOnError(fieldsErroring);
    return Object.keys(fieldsErroring).length > 0;
  };


  // Clear vesselData from localStorage
  const clearLocalStorage = () => {
    setVesselData({});
  };


  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Test if user has updated any fields
    if (!formData) {
      // If they have not, return them to vessels page
      history.push(VESSELS_PAGE_URL);
      // If they have, test if there are any errors
    } else if (!areFieldsValid(formData)) {
      // If there are not, format the data & submit to the API
      patchData(`${VESSELS_URL}/${vesselId}`, VesselDataFormatting('na', formData, vesselData))
        .then((resp) => {
          if (resp.errors) {
            setErrors({ EditVessel: resp.message });
            scrollToTopOnError('EditVessel');
          } else {
            clearLocalStorage();
            history.push(VESSELS_PAGE_URL);
          }
        });
    }
  };


  useEffect(() => {
    setVesselId(getId('vessel'));
  }, []);

  useEffect(() => {
    if (vesselId) { getVesselData(); }
  }, [vesselId]);

  // Persist form data if page refreshed
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('errors', JSON.stringify(errors));
  }, [errors]);

  if (!vesselData) { return null; }
  return (
    <div className="govuk-width-container ">
      <div className="govuk-breadcrumbs">
        <ol className="govuk-breadcrumbs__list">
          <li className="govuk-breadcrumbs__list-item">
            <a className="govuk-breadcrumbs__link" href="/vessels">Vessels</a>
          </li>
          <li className="govuk-breadcrumbs__list-item" aria-current="page">Edit vessel</li>
        </ol>
      </div>
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-xl">Edit a vessel</h1>
            <p className="govuk-body-l">Update the details of the vessel you want to edit.</p>
            <form id="EditVessel">
              {Object.keys(errors).length > 0 && (
              <div className="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabIndex="-1" data-module="govuk-error-summary">
                <h2 className="govuk-error-summary__title">
                  There is a problem
                </h2>
                <FormError error={errors.EditVessel} />
              </div>
              )}
              <FormVessel
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                clearLocalStorage={clearLocalStorage}
                data={vesselData}
                formData={formData || ''}
                errors={errors || ''}
              />
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default withRouter(EditVessel);
