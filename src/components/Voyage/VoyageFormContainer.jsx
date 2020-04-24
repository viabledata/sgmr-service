import React, { useState, useEffect } from 'react';
import { useLocation, useHistory, withRouter } from 'react-router-dom';

// App imports
import { getData, patchData } from '@utils/apiHooks';
import { splitDate } from '@utils/date';
import { splitTime } from '@utils/time';
import { PEOPLE_URL, VESSELS_URL, VOYAGE_REPORT_URL } from '@constants/ApiConstants';
import { formatDepartureArrival, formatResponsiblePerson, formatVessel } from '@components/Voyage/VoyageFormDataFormatting';
import scrollToTopOnError from '@utils/scrollToTopOnError';
import VoyageFormValidation from '@components/Voyage/VoyageFormValidation';

// App imports - forms
import FormArrival from '@components/Voyage/FormArrival';
import FormCheck from '@components/Voyage/FormCheck';
import FormDeparture from '@components/Voyage/FormDeparture';
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
    setFormData({ ...thisData, ...formData, ...newDateTime, id });
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


  // Get voyage data
  const getVoyageData = (id) => {
    getData(`${VOYAGE_REPORT_URL}/${id}`, location.pathname)
      .then((resp) => {
        setVoyageData(resp);
        formatDateTime(resp, id);
      });
  };


  const storeVoyageId = () => {
    if (location && location.state && location.state.voyageId) {
      setVoyageId(location.state.voyageId);
      getVoyageData(location.state.voyageId);
    } else if (history && history.state && history.state.state && history.state.state.voyageId) {
      setVoyageId(history.state.state.voyageId);
      getVoyageData(history.state.state.voyageId);
    } else if (JSON.parse(localStorage.getItem('formData')).id) {
      setVoyageId(JSON.parse(localStorage.getItem('formData')).id);
      getVoyageData(JSON.parse(localStorage.getItem('formData')).id);
    }
  };


  const setNextPage = () => {
    // Skip page 4 until people page is built
    let nextPage;
    if (pageNum === 3) {
      nextPage = 5;
    } else {
      nextPage = pageNum < maxPages ? pageNum + 1 : pageNum;
    }
    setPageNum(nextPage);
    history.push(`/save-voyage/page-${nextPage}`, { voyageId });
  };


  const handleSubmit = (e, sourceForm) => {
    e.preventDefault();
    let dataToSubmit;
    switch (sourceForm) {
      case 'arrival': dataToSubmit = formatDepartureArrival('Draft', formData, voyageData); break;
      case 'departure': dataToSubmit = formatDepartureArrival('Draft', formData, voyageData); break;
      case 'responsiblePerson': dataToSubmit = formatResponsiblePerson('Draft', formData, voyageData); break;
      case 'vessel': dataToSubmit = formatVessel('Draft', formData, voyageData); break;
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
            setNextPage();
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
    if (pageNum) { storeVoyageId(); }
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
                />
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default withRouter(FormVoyageContainer);
