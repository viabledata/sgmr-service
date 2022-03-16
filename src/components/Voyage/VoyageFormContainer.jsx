import React, { useEffect, useState } from 'react';
import {
  Link, useHistory, useLocation, withRouter,
} from 'react-router-dom';

// App imports
import { VESSELS_URL, VOYAGE_REPORT_URL, VOYAGE_STATUSES } from '../../constants/ApiConstants';
import { FORM_STEPS, SAVE_VOYAGE_PEOPLE_URL } from '../../constants/ClientConstants';
import { getData, patchData } from '../../utils/apiHooks';
import { splitDate } from '../../utils/date';
import getId from '../../utils/getIdHook';
import scrollToTopOnError from '../../utils/scrollToTopOnError';
import { splitTime } from '../../utils/time';
import {
  formatDepartureArrival, formatNewPerson, formatResponsiblePerson, formatVessel,
} from './VoyageFormDataFormatting';
import VoyageFormValidation from './VoyageFormValidation';

// App imports - forms
import FormArrival from './FormArrival';
import FormCheck from './FormCheck';
import FormDeparture from './FormDeparture';
import FormPerson from '../People/FormPerson';
import FormResponsiblePerson from './FormResponsiblePerson';
import FormVoyageVessels from './FormVoyageVessels';
import FormVoyagePeople from './FormVoyagePeople';
import FormVoyagePeopleManifest from './FormVoyagePeopleManifest';

const FormVoyageContainer = () => {
  const location = useLocation();
  const history = useHistory();
  const maxPages = 7;
  const [pageNum, setPageNum] = useState();
  const [voyageId, setVoyageId] = useState();
  const [voyageData, setVoyageData] = useState();
  const [checkboxData, setCheckboxData] = useState();
  const [formData, setFormData] = useState(JSON.parse(sessionStorage.getItem('formData')) || {});
  const [errors, setErrors] = useState({});

  // Handle errors
  const removeError = (fieldName) => {
    const errorList = { ...errors };
    let key;

    if (fieldName.includes('dateOfBirth')) {
      key = 'dateOfBirth';
    } else if (fieldName.includes('documentExpiryDate')) {
      key = 'documentExpiryDate';
    } else if (fieldName.includes('departureDate')) {
      key = 'departureDate';
    } else if (fieldName.includes('arrivalDate')) {
      key = 'arrivalDate';
    } else if (fieldName.includes('departureTime')) {
      key = 'departureTime';
    } else if (fieldName.includes('arrivalTime')) {
      key = 'arrivalTime';
    } else if (fieldName.includes('departurePort') || fieldName.includes('departureLat') || fieldName.includes('departureLong')) {
      key = 'departureLocation';
    } else if (fieldName.includes('arrivalPort') || fieldName.includes('arrivalLat') || fieldName.includes('arrivalLong')) {
      key = 'arrivalLocation';
    } else { key = fieldName; }

    delete errorList[key];
    setErrors(errorList);
  };

  // Update form data as user enters it
  const updateFieldValue = (name, value) => {
    setFormData({ ...formData, [name]: value });
    removeError(name);
  };

  const updatePortFields = (isDeparture, portDetails) => {
    if (isDeparture) {
      setFormData({ ...formData, departurePort: portDetails.unlocode, departurePortName: portDetails.name });
      removeError('departureLocation');
    } else {
      setFormData({ ...formData, arrivalPort: portDetails.unlocode, arrivalPortName: portDetails.name });
      removeError('arrivalLocation');
    }
  };

  const setCountryError = () => {
    setErrors({ departureCountry: 'You must select a departure country' });
  };

  const handleChange = (e) => {
    updateFieldValue(e.target.name, e.target.value);
  };

  // Destructure dates (for when reach page via an edit path with dates)
  const formatDateTime = (data, id) => {
    let thisData;
    if (!Object.keys(formData).length <= 1) { // formData has only the id, or nothing
      thisData = data;
    } else {
      thisData = formData;
    }
    let newDateTime = {};

    Object.entries(thisData).map((item) => {
      if (item[0].includes('Date') && item[1]) {
        const newDates = splitDate(item[1], item[0]);
        newDateTime = { ...newDateTime, ...newDates };
      }
      if (item[0].includes('Time') && item[1]) {
        const newTime = splitTime(item[1], item[0]);
        newDateTime = { ...newDateTime, ...newTime };
      }
    });
    setFormData({
      ...thisData, ...formData, ...newDateTime, id,
    });
  };

  // Handle checkboxes being checked/unchecked
  const handleVesselCheckboxes = (e) => {
    // Get the data
    if ((e.target).checked) {
      getData(`${VESSELS_URL}/${e.target.id}`)
        .then((resp) => setCheckboxData({ ...checkboxData, ...resp }));
    }
    // Uncheck every other option for vessels (these are currently checkboxes but only one can be selected)
    const vesselCheckboxes = document.querySelectorAll('input[name=vessel]');
    Array.from(vesselCheckboxes).map((vessel) => {
      if (e.target.id !== vessel.id && vessel.checked) {
        vessel.checked = false;
      }
    });
  };

  // Handle add buttons which populate page data
  const handleAddVesselButton = () => {
    if (checkboxData) {
      const formatCheckboxData = { // removes id from the data so it doesn't clash with voyageId
        id: voyageId,
        callsign: checkboxData.callsign,
        hullIdentificationNumber: checkboxData.hullIdentificationNumber,
        moorings: checkboxData.moorings,
        portOfRegistry: checkboxData.portOfRegistry,
        registration: checkboxData.registration,
        vesselName: checkboxData.vesselName,
        vesselNationality: checkboxData.vesselNationality,
        vesselType: checkboxData.vesselType,
      };
      setFormData(formatCheckboxData);
      setErrors({});
    }
  };

  // Get voyage data
  const getVoyageData = (id) => {
    getData(`${VOYAGE_REPORT_URL}/${id}`, location.pathname)
      .then((resp) => {
        setVoyageData(resp);
        formatDateTime(resp, id);
      });
  };

  const createNextPage = (sourceForm) => {
    let nextPage;
    const currentPage = parseInt(pageNum, 10);
    switch (sourceForm) {
      case FORM_STEPS.CHECK: history.push('/save-voyage/page-submitted');
        break;
      case FORM_STEPS.ARRIVAL_SAVE_AND_EXIT:
        history.push('/voyage-plans');
        break;
      case FORM_STEPS.DEPARTURE_SAVE_AND_EXIT:
        history.push('/voyage-plans');
        break;
      default:
        nextPage = currentPage < maxPages ? currentPage + 1 : currentPage;
        setPageNum(nextPage);
        history.push(`/save-voyage/page-${nextPage}`, { voyageId });
    }
  };

  const formatDataToSubmit = (sourceForm, dataToFormat) => {
    let dataToSubmit;

    switch (sourceForm) {
      case FORM_STEPS.ARRIVAL || FORM_STEPS.ARRIVAL_SAVE_AND_EXIT:
        dataToSubmit = formatDepartureArrival(VOYAGE_STATUSES.DRAFT, dataToFormat, voyageData);
        break;
      case FORM_STEPS.CHECK:
        dataToSubmit = { status: VOYAGE_STATUSES.PRE_SUBMITTED };
        break;
      case FORM_STEPS.DEPARTURE || FORM_STEPS.DEPARTURE_SAVE_AND_EXIT:
        dataToSubmit = formatDepartureArrival(VOYAGE_STATUSES.DRAFT, dataToFormat, voyageData);
        break;
      case FORM_STEPS.NEW_PERSON:
        dataToSubmit = formatNewPerson(VOYAGE_STATUSES.DRAFT, dataToFormat, voyageData);
        break;
      case FORM_STEPS.RESPONSIBLE_PERSON:
        dataToSubmit = formatResponsiblePerson(VOYAGE_STATUSES.DRAFT, dataToFormat, voyageData);
        break;
      case FORM_STEPS.VESSEL:
        dataToSubmit = formatVessel(VOYAGE_STATUSES.DRAFT, dataToFormat, voyageData);
        break;
      case FORM_STEPS.VOYAGE:
        dataToSubmit = { status: VOYAGE_STATUSES.PRE_SUBMITTED };
        break;
      default:
        dataToSubmit = null;
    }
    return dataToSubmit;
  };

  const handleSubmit = async (e, sourceForm, voyageIdLocal, extraParams = {}) => {
    e.preventDefault();

    // handle peopleManifest page (no PATCH required)
    if (sourceForm === FORM_STEPS.PEOPLE_MANIFEST) {
      if (extraParams.makeChanges) {
        history.push(SAVE_VOYAGE_PEOPLE_URL, { voyageId });
      } else {
        createNextPage(sourceForm);
      }
    } else {
      // get initial data set from formData
      const data = formData;

      // check for autocomplete field current value
      const autocompleteField = document.getElementById('autocomplete')?.name ? document.getElementById('autocomplete').name : null;
      const autocompleteValue = document.getElementById('autocomplete')?.value === '' ? null : document.getElementById('autocomplete')?.value;
      const autocompleteNameValue = autocompleteField ? { [autocompleteField]: autocompleteValue } : null;

      // update data for submitting
      const updatedData = { ...data, ...autocompleteNameValue };
      const dataToSubmit = formatDataToSubmit(sourceForm, updatedData, extraParams);
      setFormData(updatedData);

      // validate data
      const validationErrors = await VoyageFormValidation(updatedData, sourceForm);
      setErrors(validationErrors);
      console.log(validationErrors);

      // store updated data in state & session storage
      setFormData(updatedData);

      // Handle missing voyageId (for if user comes to a subpage directly, and we haven't got the id)
      if (!voyageId) {
        setErrors({ voyageForm: 'There was a problem locating your voyage, please return to "Voyage Plans" and try again' });
        scrollToTopOnError('voyageForm');
      } else if (Object.keys(validationErrors).length === 0 && Object.keys(errors).length === 0) {
        await patchData(`${VOYAGE_REPORT_URL}/${voyageId}`, dataToSubmit, location.pathname.substring(1));
        createNextPage(sourceForm);
      }
    }
  };

  // Set page number based on current URL
  const getPageNum = () => {
    const thisPage = location.pathname.split('page-');
    setPageNum(parseInt(thisPage[1], 10));
  };

  // Prevents anchor tag from adding # to url
  const handleClick = (e, id) => {
    e.preventDefault();
    const scrollToError = document.getElementById(id);
    scrollToError.scrollIntoView();
  };

  // Trigger functions
  useEffect(() => {
    if (location) {
      getPageNum();
      setErrors({});
    }
  }, [location]);

  useEffect(() => {
    if (pageNum) {
      setVoyageId(getId('voyage'));
      getVoyageData(getId('voyage'));
    }
  }, [pageNum]);

  // Persist form data if page refreshed
  useEffect(() => {
    sessionStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  if (!formData) { return null; }
  return (
    <div id="pageContainer" className="govuk-width-container ">
      {pageNum !== '4b' && <a href="#back" className="govuk-back-link" onClick={(e) => { e.preventDefault(); history.goBack(); }}>Back</a>}
      {pageNum === '4b' && <Link to={SAVE_VOYAGE_PEOPLE_URL} className="govuk-back-link">Back</Link>}
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            {pageNum !== '4b' && <span className="govuk-caption-xl">{`Page ${pageNum} of ${maxPages}`}</span>}
            {pageNum === '4b' && <span className="govuk-caption-xl">{`Page 4 of ${maxPages}`}</span>}
            <form id="voyageForm">
              {Object.keys(errors).length >= 1 && (
                <div className="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabIndex="-1" data-module="govuk-error-summary">
                  <h2 className="govuk-error-summary__title">
                    There is a problem
                  </h2>
                  <div className="govuk-error-summary__body">
                    <ul className="govuk-list govuk-error-summary__list">
                      {Object.entries(errors).reverse().map((elem) => (

                        <li key={elem[0]}>

                          {elem[0] !== 'title'
                            //  eslint-disable-next-line jsx-a11y/anchor-is-valid
                            && <a onClick={(e) => handleClick(e, elem[0])} href="#">{elem[1]}</a>}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              {pageNum === 1 && (
                <FormDeparture
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  updateFieldValue={updateFieldValue}
                  updatePortFields={updatePortFields}
                  setCountryError={setCountryError}
                  data={formData || voyageData}
                  errors={errors}
                  voyageId={voyageId}
                />
              )}
              {pageNum === 2 && (
                <FormArrival
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  updateFieldValue={updateFieldValue}
                  updatePortFields={updatePortFields}
                  setCountryError={setCountryError}
                  data={formData || voyageData}
                  errors={errors}
                  voyageId={voyageId}
                />
              )}
              {pageNum === 3 && (
                <FormVoyageVessels
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  handleCheckboxes={handleVesselCheckboxes}
                  handleAddVesselButton={handleAddVesselButton}
                  voyageId={voyageId}
                  formData={formData || voyageData}
                  errors={errors}
                />
              )}
              {pageNum === 4 && (
                <FormVoyagePeople
                  handleSubmit={handleSubmit}
                  voyageId={voyageId}
                  createNextPage={createNextPage}
                  setErrors={setErrors}
                  setPageNum={setPageNum}
                />
              )}
              {pageNum === '4b' && (
                <>
                  <h1 className="govuk-heading-xl">Add details of a new person</h1>
                  <p className="govuk-body-l">
                    Enter the details as displayed on their travel document
                  </p>
                  <FormPerson
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    source="voyage"
                    data={formData || ''}
                    formData={formData || ''}
                    errors={errors || ''}
                  />
                </>
              )}
              {pageNum === 5 && (
                <FormVoyagePeopleManifest
                  handleSubmit={handleSubmit}
                  voyageId={voyageId}
                  setErrors={setErrors}
                  setPageNum={setPageNum}
                />
              )}
              {pageNum === 6 && (
                <FormResponsiblePerson
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  data={formData || voyageData}
                  errors={errors}
                  voyageId={voyageId}
                />
              )}
              {pageNum === 7 && (
                <FormCheck
                  voyageId={voyageId}
                  voyageData={voyageData}
                  handleSubmit={handleSubmit}
                  errors={errors || ''}
                />
              )}
            </form>
            {pageNum === 7 && voyageData && (voyageData.status.name === 'Cancelled' || voyageData.status.name !== 'PreCancelled') ? null : (
              <p className="govuk-body">
                <Link to="/voyage-plans" className="govuk-link govuk-link--no-visited-state">
                  Exit without saving
                </Link>
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default withRouter(FormVoyageContainer);
