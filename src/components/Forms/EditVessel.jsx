import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import axios from 'axios';

// App imports
import Auth from 'Auth';
import CreateVessel from 'CreateVessel';
import { VESSELS_URL } from 'Constants/ApiConstants';
import { VESSELS_PAGE_URL } from 'Constants/ClientConstants';
import { vesselValidationRules } from 'validation';


const EditVessel = (props) => {
  const history = useHistory();
  const vesselId = props.location.state.vesselId;
  const [vesselData, setVesselData] = useState();
  const [formData, setFormData] = useState();
  const [errors, setErrors] = useState({});

  // Populate form using vessel data
  const getVesselData = () => {
    axios.get(`${VESSELS_URL}/${vesselId}`, {
      headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
    })
      .then((resp) => {
        setVesselData(resp.data);
        localStorage.setItem('data', JSON.stringify(resp.data));
      })
      .catch((err) => {
        if (err.response) {
          switch (err.response.status) {
            case 401: history.push('/sign-in?source=vessels'); break;
            case 422: history.push('/sign-in?source=vessels'); break;
            case 405: history.push('/sign-in?source=vessels'); break;
            default: history.push('/sign-in?source=vessels');
          }
        }
      });
  };

  // Clear formData from localStorage
  const clearLocalStorage = () => {
    setVesselData({});
    setFormData({});
    setErrors({ });
  };

  // Clear errors
  const removeError = (fieldName) => {
    const tempArr = { ...errors };
    // Delete the error
    const key = fieldName;
    delete tempArr[key];
    setErrors(tempArr);
  };

  // Update form info to state
  const handleChange = (e) => {
    // Original data
    setVesselData({ ...vesselData, [e.target.name]: e.target.value });
    // Updated data
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear any errors
    removeError(e.target.name);
  };

  // Handle missing required fields
  const areFieldsValid = (data) => {
    const fieldsErroring = {};
    vesselValidationRules.map((rule) => {
      (!(rule.field in data) || data[rule.field] === '')
        ? fieldsErroring[rule.field] = rule.message
        : null;
    });
    setErrors(fieldsErroring);
    return Object.keys(fieldsErroring).length > 0;
  };

  const formatData = (dataVessel, dataForm) => {
    if (dataForm) {
      if (!areFieldsValid(dataVessel)) {
        const dataToSubmit = {
          ...formData,
          vesselName: dataForm.vesselName ? dataForm.vesselName : dataVessel.vesselName,
          vesselType: dataForm.vesselType ? dataForm.vesselType : dataVessel.vesselType,
          registration: dataForm.registration ? dataForm.registration : dataVessel.registration,
          moorings: dataForm.moorings ? dataForm.moorings : dataVessel.moorings,
        };
        return dataToSubmit;
      }
    }
    history.push(VESSELS_PAGE_URL);
  };


  // Handle Submit, including clearing localStorage
  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = formatData(vesselData, formData);

    if (!formData) {
      history.push(VESSELS_PAGE_URL);
    } else if (!areFieldsValid(vesselData)) {
      axios.patch(`${VESSELS_URL}/${vesselId}`, submitData, {
        headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
      })
        .then(() => {
          clearLocalStorage();
          history.push(VESSELS_PAGE_URL);
        })
        .catch((err) => {
          if (err.response) {
            switch (err.response.status) {
              case 400: setErrors({ ...errors, EditVessel: err.response.data.message }); break;
              case 401: history.push('/sign-in?source=vessels'); break;
              case 422: history.push('/sign-in?source=vessels'); break;
              case 405: history.push('/sign-in?source=vessels'); break;
              default: history.push('/sign-in?source=vessels'); break;
            }
          }
        });
    }
  };

  // Get vesselData from API for use on this form
  useEffect(() => {
    getVesselData();
  }, []);

  // Update localStorage if personData or errors changes
  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(vesselData));
  }, [vesselData]);
  useEffect(() => {
    localStorage.setItem('errors', JSON.stringify(errors));
    window.scrollTo(0, 0);
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
                {errors.EditVessel
                    && (
                    <span className="govuk-error-message">
                      <span className="govuk-visually-hidden">Error:</span>
                      {errors.EditVessel}
                    </span>
                    )}
              </div>
              )}
              <CreateVessel
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                data={vesselData}
                errors={errors}
              />
              <p>
                <a href="/vessels" className="govuk-link govuk-link--no-visited-state" onClick={(e) => clearLocalStorage(e)}>Exit without saving</a>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default withRouter(EditVessel);
