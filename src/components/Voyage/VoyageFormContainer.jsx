import React, { useState, useEffect } from 'react';
import {
  Link, useLocation, useHistory, withRouter,
} from 'react-router-dom';

// App imports
import { getData, patchData } from '@utils/apiHooks';
import { splitDate } from '@utils/date';
import { splitTime } from '@utils/time';
import { PEOPLE_URL, VESSELS_URL, VOYAGE_REPORT_URL } from '@constants/ApiConstants';
import {
  formatDepartureArrival, formatPerson, formatResponsiblePerson, formatVessel,
} from '@components/Voyage/VoyageFormDataFormatting';
import getId from '@utils/getIdHook';
import scrollToTopOnError from '@utils/scrollToTopOnError';
import VoyageFormValidation from '@components/Voyage/VoyageFormValidation';

// App imports - forms
import FormArrival from '@components/Voyage/FormArrival';
import FormCheck from '@components/Voyage/FormCheck';
import FormDeparture from '@components/Voyage/FormDeparture';
import FormPerson from '@components/People/FormPerson';
import FormResponsiblePerson from '@components/Voyage/FormResponsiblePerson';
import FormVoyageVessels from '@components/Voyage/FormVoyageVessels';
import FormVoyagePeople from '@components/Voyage/FormVoyagePeople';


const FormVoyageContainer = () => {
  const location = useLocation();
  const history = useHistory();
  const maxPages = 6;
  const [pageNum, setPageNum] = useState();
  const [voyageId, setVoyageId] = useState();
  const [voyageData, setVoyageData] = useState();
  const [checkboxData, setCheckboxData] = useState();
  const [formData, setFormData] = useState(JSON.parse(localStorage.getItem('formData')) || {});
  const [errors, setErrors] = useState(JSON.parse(localStorage.getItem('errors')) || {});


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
    } else { key = fieldName; }

    delete errorList[key];
    setErrors(errorList);
  };


  // Update form data as user enters it
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    removeError(e.target.name);
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
  const handleCheckboxes = (e) => {
    let url;
    switch (e.target.name) {
      case 'vessel': url = `${VESSELS_URL}/${e.target.id}`; break;
      case 'people': url = `${PEOPLE_URL}/${e.target.id}`; break;
      default: url = '';
    }
    // Get the data
    if ((e.target).checked) {
      getData(url)
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
  const handleAddButton = () => {
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
    }
  };


  // Handle link to create person for voyage form
  const handleLinkToForm = (e) => {
    e.preventDefault();
    setPageNum('4b');
  };


  // Get voyage data
  const getVoyageData = (id) => {
    getData(`${VOYAGE_REPORT_URL}/${id}`, location.pathname)
      .then((resp) => {
        setVoyageData(resp);
        formatDateTime(resp, id);
      });
  };


  const setNextPage = (sourceForm) => {
    let nextPage;
    switch (sourceForm) {
      case 'cancel': history.push('/reports'); break;
      case 'submit': history.push('/save-voyage/submitted'); break;
      default: if (pageNum === '4b') {
        nextPage = 4;
      } else {
        nextPage = pageNum < maxPages ? pageNum + 1 : pageNum;
      }
        setPageNum(nextPage);
        history.push(`/save-voyage/page-${nextPage}`, { voyageId });
    }
  };


  const handleSubmit = (e, sourceForm) => {
    e.preventDefault();
    let dataToSubmit;
    switch (sourceForm) {
      case 'arrival': dataToSubmit = formatDepartureArrival('Draft', formData, voyageData); break;
      case 'departure': dataToSubmit = formatDepartureArrival('Draft', formData, voyageData); break;
      case 'people': dataToSubmit = formatPerson('Draft', formData, voyageData); break;
      case 'responsiblePerson': dataToSubmit = formatResponsiblePerson('Draft', formData, voyageData); break;
      case 'vessel': dataToSubmit = formatVessel('Draft', formData, voyageData); break;
      case 'voyage': dataToSubmit = { status: 'PreSubmitted' }; break;
      case 'cancel': dataToSubmit = { status: 'PreCancelled' }; break;
      default: dataToSubmit = null;
    }

    // Handle missing voyageId (for if user comes to a subpage directly, and we haven't got the id)
    if (!voyageId) {
      setErrors({ voyageForm: 'There was a problem locating your voyage, please return to "Reports" and try again' });
      scrollToTopOnError('voyageForm');
    } else {
      setErrors(VoyageFormValidation(formData, sourceForm));
      if (Object.keys(VoyageFormValidation(formData, sourceForm)).length === 0 && Object.keys(errors).length === 0) {
        patchData(`${VOYAGE_REPORT_URL}/${voyageId}`, dataToSubmit, location.pathname.substring(1))
          .then(() => {
            setNextPage(sourceForm);
          });
      }
    }
  };


  // Set page number based on current URL
  const getPageNum = () => {
    const thisPage = location.pathname.split('page-');
    setPageNum(parseInt(thisPage[1], 10));
  };


  // Trigger functions
  useEffect(() => {
    if (location) { getPageNum(); }
  }, [location]);

  useEffect(() => {
    if (pageNum) {
      setVoyageId(getId('voyage'));
      getVoyageData(getId('voyage'));
    }
  }, [pageNum]);

  // Persist form data if page refreshed
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('errors', JSON.stringify(errors));
  }, [errors]);


  if (!formData) { return null; }
  return (
    <div id="pageContainer" className="govuk-width-container ">
      {pageNum !== '4b' && <a className="govuk-back-link" onClick={(e) => { e.preventDefault(); history.goBack(); }}>Back</a>}
      {pageNum === '4b' && <Link to="/save-voyage/page-4" className="govuk-back-link">Back</Link>}
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            {pageNum !== '4b' && <span className="govuk-caption-xl">{`Page ${pageNum} of ${maxPages}`}</span>}
            {pageNum === '4b' && <span className="govuk-caption-xl">{`Page 4 of ${maxPages}`}</span>}
            <form id="voyageForm">
              {Object.keys(errors).length > 0 && (
              <div className="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabIndex="-1" data-module="govuk-error-summary">
                <h2 className="govuk-error-summary__title">
                  There is a problem
                </h2>
                {errors.voyageForm
                    && (
                    <span className="govuk-error-message">
                      <span className="govuk-visually-hidden">Error:</span>
                      {errors.voyageForm}
                    </span>
                    )}
              </div>
              )}
              {pageNum === 1 && (
                <FormDeparture
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  data={formData || voyageData}
                  errors={errors}
                  voyageId={voyageId}
                />
              )}
              {pageNum === 2 && (
                <FormArrival
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  data={formData || voyageData}
                  errors={errors}
                  voyageId={voyageId}
                />
              )}
              {pageNum === 3 && (
                <FormVoyageVessels
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  handleCheckboxes={handleCheckboxes}
                  handleAddButton={handleAddButton}
                  voyageId={voyageId}
                  formData={formData || voyageData}
                  errors={errors}
                />
              )}
              {pageNum === 4 && (
                <FormVoyagePeople
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  handleCheckboxes={handleCheckboxes}
                  handleAddButton={handleAddButton}
                  handleLinkToForm={handleLinkToForm}
                  voyageId={voyageId}
                  formData={formData || voyageData}
                  errors={errors}
                />
              )}
              {pageNum === '4b' && (
                <>
                  <h1 className="govuk-heading-xl">Add new person details</h1>
                  <p className="govuk-body-l">
                    Provide the details of the person you want to add to the manifest. Details should be as displayed on travel document.
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
                <FormResponsiblePerson
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  data={formData || voyageData}
                  errors={errors}
                  voyageId={voyageId}
                />
              )}
              {pageNum === 6 && (
                <FormCheck
                  voyageId={voyageId}
                  voyageData={voyageData}
                  handleSubmit={handleSubmit}
                />
              )}
            </form>
            <p><Link to="/reports" className="govuk-link govuk-link--no-visited-state">Exit without saving</Link></p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default withRouter(FormVoyageContainer);
