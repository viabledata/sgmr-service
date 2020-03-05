import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// app imports
import contentArray from 'contentArray';
import PageIntro from 'PageIntro';
import PageIntroToForm from 'PageIntroToForm';
import SectionTable from 'SectionTable';
import SectionTabs from 'SectionTabs';


const PageContainer = (props) => {
  // get URL details
  const location = useLocation();

  // get page details
  const [sectionReport, setSectionReport] = useState(); // determines whether to have tabs, tables, or none for the lower section on page
  const [pageData, setPageData] = useState(); // determines content of page

  // get the relevant data from contentArray
  const arr = contentArray;
  const getPageData = () => {
    const data = arr.find((obj) => {
      return obj.urlStub === location.pathname;
    });
    setPageData(data);
  };

  const checkPageReportsSection = () => {
    if (pageData) {
      switch (pageData.reportType) {
        case 'tabs': setSectionReport(<SectionTabs page={location.pathname} pageData={pageData} />); break;
        case 'tables': setSectionReport(<SectionTable page={location.pathname} pageData={pageData} />); break;
        default: setSectionReport('none');
      }
    }
  };

  useEffect(() => {
    getPageData();
  }, [props]);

  useEffect(() => {
    checkPageReportsSection();
  }, [pageData]);

  if (!sectionReport) { return (null); }
  return (
    <div class="govuk-width-container ">
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <div className="govuk-grid-row">
          <PageIntro pageData={pageData} />
          <PageIntroToForm pageData={pageData} />
          {sectionReport}
        </div>
      </main>
    </div>
  );
};

export default PageContainer;