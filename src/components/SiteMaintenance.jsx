import React from 'react';

import Header from '@components/Header';
import Banner from '@components/Banner';
import Footer from '@components/Footer';

const SiteMaintenance = () => {
  document.title = "Unavailable service";

  return (
    <>
      <Header />
      <Banner />
      <div className="govuk-width-container ">
        <main
          className="govuk-main-wrapper govuk-main-wrapper--auto-spacing"
          id="main-content"
          role="main"
        >
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <h1
                className="govuk-heading-l"
              >
                Sorry, the service is unavailable
              </h1>
              <p className="govuk-body">
                This service is not available for the
                general public to use as we are still in private beta and
                testing the service.
              </p>
              <p className="govuk-body">
                We hope to
                launch the new service to the public later in 2021. When the
                service launches, you can give us feedback to help us improve
                it.
              </p>
              <p className="govuk-body">
                <a
                  className="govuk-link"
                  href="https://www.gov.uk/government/publications/notice-8-sailing-your-pleasure-craft-to-and-from-the-uk/"
                >
                  Check the sailing pleasure craft guidance
                </a>
                {' '}
                if you plan to sail to or from the UK.
              </p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default SiteMaintenance;
