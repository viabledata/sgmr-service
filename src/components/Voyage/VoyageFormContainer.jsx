import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

// App imports
import { getData, postData } from '@utils/apiHooks';
import { VOYAGE_REPORT_URL, USER_VOYAGE_REPORT_URL } from '@constants/ApiConstants';


const FormVoyageContainer = () => {
  const location = useLocation();
  const history = useHistory();
  const maxPages = 6;
  const [pageNum, setPageNum] = useState();
  const [voyageId, setVoyageId] = useState();
  const [voyageData, setVoyageData] = useState();


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
        .then((resp) => setVoyageId(resp.id));
    } else {
      console.log('missing id');
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
    pageNum && storeVoyageId();
    voyageId && getVoyageData(voyageId);
  }, [pageNum]);


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
            
          </div>
        </div>
      </main>
    </div>
  );
};

export default FormVoyageContainer;
