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

  // Get data to prepopulate the form for this vessel
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
            default: console.log('400', err.response.data);
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
  const checkRequiredFields = (data) => {
    const fieldsErroring = {};
    vesselValidationRules.map((rule) => {
      (!(rule.field in data) || data[rule.field] === '')
        ? fieldsErroring[rule.field] = rule.message
        : null;
    });
    setErrors(fieldsErroring);
    return Object.keys(fieldsErroring).length > 0;
  };

  // Create submit data, all required fields, even if unedited, must be passed on the patc
  const createSubmitData = (editedData, fullData) => {
    if (!editedData) { return fullData; }
    return {
      vesselName: editedData.vesselName ? editedData.vesselName : fullData.vesselName,
      vesselType: editedData.vesselType ? editedData.vesselType : fullData.vesselType,
      registration: editedData.registration ? editedData.registration : fullData.registration,
      moorings: editedData.moorings ? editedData.moorings : fullData.moorings,
      hullIdentificationNumber: editedData.hullIdentificationNumber ? editedData.hullIdentificationNumber : fullData.hullIdentificationNumber,
      callsign: editedData.callsign ? editedData.callsign : fullData.callsign,
      vesselNationality: editedData.vesselNationality ? editedData.vesselNationality : fullData.vesselNationality,
      vesselBase: editedData.vesselBase ? editedData.vesselBase : fullData.vesselBase,
    };
  };

  // Handle Submit, including clearing localStorage
  const handleSubmit = (e) => {
    e.preventDefault();
    // createSubmitData(formData, vesselData);

    if (!checkRequiredFields(vesselData)) {
      axios.patch(`${VESSELS_URL}/${vesselId}`, createSubmitData(formData, vesselData), {
        headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
      })
        .then(() => {
          clearLocalStorage();
          history.push(VESSELS_PAGE_URL);
        })
        .catch((err) => {
          if (err.response) {
            switch (err.response.status) {
              case 400: console.log('400', err.response.data); break;
              case 401: history.push('/sign-in?source=vessels'); break;
              case 422: history.push('/sign-in?source=vessels'); break;
              case 405: history.push('/sign-in?source=vessels'); break;
              default: console.log('400', err.response.data);
            }
          }
        });
    }
  };

  // Get person data to pass to prepopulate the form
  useEffect(() => {
    getVesselData();
  }, []);

  // Update localStorage if personData or errors changes
  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(vesselData));
  }, [vesselData]);
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
            <form id="EditPerson">

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
