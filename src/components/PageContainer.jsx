/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

// app imports
import contentArray from 'contentArray';
import PageIntro from 'PageIntro';


const PageContainer = () => {
  // get URL details
  const location = useLocation();
  const back = useHistory();

  // get page details
  const [sectionReport, setSectionReport] = useState(); // determines whether to have tabs, tables, or none for the lower section on page
  const [pageData, setPageData] = useState(); // determines content of page

  // get the relevant data from contentArray
  const arr = contentArray;

  const checkPageReportsSection = () => {
    if (pageData) {
      switch (pageData.report) {
        case 'tabs': setSectionReport(<SectionTabs page={location.pathname} />); break;
        case 'table': setSectionReport(<SectionTable page={location.pathname} />); break;
        default: setSectionReport(null);
      }
    }
  };

  const getPageData = () => {
    const data = arr.find((obj) => {
      return obj.urlStub === location.pathname;
    });
    setPageData(data);
    checkPageReportsSection();
  };

  useEffect(() => {
    getPageData();
  }, []);

  useEffect(() => {
    checkPageReportsSection();
  }, [pageData]);


  if (!pageData) { return <>Loading</>; }
  return (
    <>
      <PageIntro pageData={pageData} />
      {sectionReport}
    </>
  );
};

export default PageContainer;
