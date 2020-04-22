import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

// App imports
import { getData, patchData } from '@utils/apiHooks';
import { splitDate } from '@utils/date';
import { splitTime } from '@utils/time';
import { VOYAGE_REPORT_URL } from '@constants/ApiConstants';

import FormArrival from '@components/Voyage/FormArrival';
import FormCheck from '@components/Voyage/FormCheck';
import FormDeparture from '@components/Voyage/FormDeparture';
import VoyageFormDataFormatting from '@components/Voyage/VoyageFormDataFormatting';
import VoyageFormValidation from '@components/Voyage/VoyageFormValidation';


const FormVoyageContainer = () => {
  const location = useLocation();
  const history = useHistory();
  const maxPages = 6;
  const [pageNum, setPageNum] = useState();
  const [voyageId, setVoyageId] = useState();
  const [voyageData, setVoyageData] = useState();
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


  const formatTime = (data) => {
    let formattedData = { ...data };
    Object.entries(data).map((item) => {
      if (item[0].includes('Time') && item[1]) {
        const newTime = splitTime(item[1], item[0]);
        formattedData = { ...formattedData, ...newTime };
      }
    });
    setFormData({ ...data, ...formattedData });
  };


  // Destructure dates (for when reach page via an edit path with dates)
  const formatDate = (data) => {
    let formattedData = { ...data };
    Object.entries(data).map((item) => {
      if (item[0].includes('Date') && item[1]) {
        const newDates = splitDate(item[1], item[0]);
        formattedData = { ...formattedData, ...newDates };
      }
    });
    const newFormData = ({ ...data, ...formattedData });
    setFormData(newFormData);
    formatTime(newFormData);
  };


  const getVoyageData = (id) => {
    getData(`${VOYAGE_REPORT_URL}/${id}`)
      .then((resp) => {
        setVoyageData(formatDate(resp));
        localStorage.setItem('formData', JSON.stringify(resp));
      });
  };


  const storeVoyageId = () => {
    if (location && location.state && location.state.voyageId) {
      setVoyageId(location.state.voyageId);
      getVoyageData(location.state.voyageId);
    }
  };


  const setNextPage = () => {
    const nextPage = pageNum < maxPages ? pageNum + 1 : pageNum;
    setPageNum(nextPage);
    history.push(`/save-voyage/page-${nextPage}`);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(VoyageFormValidation(formData));
    if (Object.keys(VoyageFormValidation(formData)).length === 0 && Object.keys(errors).length === 0) {
      patchData(`${VOYAGE_REPORT_URL}/${voyageId}`, VoyageFormDataFormatting(voyageId, 'Draft', formData))
        .then(() => setNextPage());
    }
  };


  // Set page number based on current URL
  const getPageNum = () => {
    const thisPage = location.pathname.split('page-');
    setPageNum(parseInt(thisPage[1], 10));
  };


  // Trigger functions
  useEffect(() => {
    location && getPageNum();
  }, [location]);

  useEffect(() => {
    storeVoyageId();
  }, [pageNum]);

  useEffect(() => {
    voyageId && getVoyageData(voyageId);
  }, [voyageId]);

  // Persist form data if page refreshed
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('errors', JSON.stringify(errors));
  }, [errors]);


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
            <form>
              {pageNum === 1 && (
                <FormDeparture
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  data={formData || voyageData}
                  errors={errors}
                />
              )}
              {pageNum === 2 && (
                <FormArrival
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  data={formData}
                  errors={errors}
                />
              )}
              {pageNum === 6 && (
                <FormCheck
                  voyageId={voyageId}
                />
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FormVoyageContainer;
