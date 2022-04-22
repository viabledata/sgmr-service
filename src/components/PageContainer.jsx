import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// app imports
import contentArray from './contentArray';
import PageIntro from './PageIntro';
import PageIntroToForm from './PageIntroToForm';
import SectionTablePeople from './SectionTablePeople';
import SectionTableVessels from './SectionTableVessels';
import Dashboard from './Dashboard';
import WelcomeBanner from './WelcomeBanner';
import NotificationBanner from './NotificationBanner';

const PageContainer = (props) => {
  const location = useLocation();
  const [sectionReport, setSectionReport] = useState(); // determines whether to have tabs, tables, or none for the lower section on page
  const [pageData, setPageData] = useState(); // determines content of page
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
        case 'tabs': setSectionReport(<Dashboard page={location.pathname} pageData={pageData} />); break;
        case 'vessels': setSectionReport(<SectionTableVessels page={location.pathname} pageData={pageData} />); break;
        case 'people': setSectionReport(<SectionTablePeople page={location.pathname} pageData={pageData} />); break;
        default: setSectionReport('none');
      }
    }
  };

  useEffect(() => {
    getPageData();
  }, [props]);

  useEffect(() => {
    checkPageReportsSection();
    sessionStorage.removeItem('errors');
    sessionStorage.removeItem('formData');
    sessionStorage.removeItem('accountData');
    sessionStorage.removeItem('data');
    sessionStorage.removeItem('email');
  }, [pageData]);

  if (!sectionReport) { return null; }
  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <NotificationBanner />
        <div className="govuk-grid-row">
          {pageData.urlStub === '/voyage-plans' && <WelcomeBanner />}
          <PageIntro pageData={pageData} />
          {pageData.formIntroHeading && <PageIntroToForm pageData={pageData} />}
          {pageData.reportType && sectionReport}
        </div>
      </main>
    </div>
  );
};

export default PageContainer;
