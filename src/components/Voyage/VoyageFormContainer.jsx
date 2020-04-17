/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

// App imports
import { getData, postData } from '@utils/apiHooks';
import { VOYAGE_REPORT_URL, USER_VOYAGE_REPORT_URL } from '@constants/ApiConstants';

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
    } else { key = fieldName; }

    delete errorList[key];
    setErrors(errorList);
  };


  // Update form data as user enters it
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    removeError(e.target.name);
  };


  // Get voyage data
  const getVoyageData = (id) => {
    getData(`${VOYAGE_REPORT_URL}/${id}`)
      .then((resp) => {
        setVoyageData(resp);
      });
  };


  // Store voyageId
  const storeVoyageId = () => {
    if (location && location.state && location.state.voyageId) {
      setVoyageId(location.state.voyageId);
      getVoyageData(location.state.voyageId);
    } else if (pageNum === 1) {
      postData(USER_VOYAGE_REPORT_URL)
        .then((resp) => {
          setVoyageId(resp.id);
          getVoyageData(resp.id);
        });
    } else {
      console.log('missing id');
    }
  };


  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault;
    setErrors(VoyageFormValidation(formData));
    if (Object.keys(errors).length === 0) {
      console.log(VoyageFormDataFormatting(voyageId, 'Draft', formData))
    }

    // postData(USER_VOYAGE_REPORT_URL)
    //     .then((resp) => {
    //       setVoyageId(resp.id);
    //       getVoyageData(resp.id);
    //     });
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
    pageNum && storeVoyageId();
    voyageId && getVoyageData(voyageId);
  }, [pageNum]);

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
                  data={formData}
                  errors={errors}
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
