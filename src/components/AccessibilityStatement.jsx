import React from 'react';

const AccessibilityStatement = () => {
  document.title = 'Accessibility statement';

  return (
    <div className="govuk-width-container ">
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-width-container">
            <h1 className="govuk-heading-xl">Accessibility statement for Submit a Pleasure Craft Report</h1>
            <p className="govuk-body">
              We want everyone to be able to get and do what they need with this service, regardless of access needs, due to a disability or condition.
            </p>
            <p className="govuk-body">
              This accessibility statement contains information about Submit a Pleasure Craft Report, available at
              {' '}
              <a className="govuk-link" target="blank" href="/reports">Submit a Pleasure Craft Report (opens in new tab).</a>
            </p>
            <p className="govuk-body">
              This website is run by Border Force. We want as many people as possible to be able to use this website. For example, that means you should be able to:
            </p>
            <ul className="govuk-list govuk-list--bullet">
              <li>Navigate most of the website using just a keyboard.</li>
              <li>Reach the main reports page from every page on Submit a Pleasure Craft Report</li>
              <li>Read and navigate the order on Submit a Pleasure Craft Report as it is logical and intuitive/clear.</li>
              <li>Tab through questions in the form whilst always having the focus visible.</li>
            </ul>
            <p className="govuk-body">
              We’ve also made the website text as simple as possible to understand.
            </p>
            <p className="govuk-body">
              <a className="govuk-link" target="blank" href="https://mcmw.abilitynet.org.uk/">Abilitynet (opens in new tab)</a>
              {' '}
              has advice on making your device easier to use if you have a disability.
            </p>
            <h2 className="govuk-heading-l">How accessible this website is</h2>
            <p className="govuk-body">We aim to meet international accessibility guidelines. However, this may not always be possible, or we may have missed a problem.</p>
            <p className="govuk-body">Some people may find parts of this service difficult to use because:</p>
            <ul className="govuk-list govuk-list--bullet">
              <li>Fields are only auto completed from information in the user’s profile on Submit a Pleasure Craft Report and not from their browser.</li>
              <li>
                The JAWS screen reader does not read options in drop down lists and users are unable to use their keyboard to navigate through drop down lists with
                JAWS running in the background.
              </li>
              <li>
                Questions on the form and some labels in names, are unable to be identified by the NVDA screen reader. NVDA is able to read text fields, tabs, links
                and radio buttons.
              </li>
              <li>
                Multiple “Change” links on page 6 of the reports are read out by the Screenreader, there are no extra label text for screenreaders that differentiates
                the links.
              </li>
            </ul>
            <p className="govuk-body">
              We know some parts of this website are not fully accessible. You can see a full list of any issues we currently know about in the Non-accessible content
              section of this statement.
            </p>

            <h2 className="govuk-heading-l">Feedback and contact information</h2>
            <p className="govuk-body">If you have difficulty using this service, contact us by:</p>
            <ul className="govuk-list govuk-list--bullet">
              <li>
                Email address:
                &nbsp;
                <a href="mailto:sgmrsupport@digital.homeoffice.gov.uk">
                  sgmrsupport@digital.homeoffice.gov.uk
                </a>
              </li>
            </ul>

            <h2 className="govuk-heading-l">Enforcement procedure</h2>
            <p className="govuk-body">
              The Equality and Human Rights Commission (EHRC) is responsible for enforcing the Public Sector Bodies (Websites and Mobile Applications) (No. 2)
              Accessibility Regulations 2018 (the ‘accessibility regulations’). If you’re not happy with how we respond to your complaint, contact the
              {' '}
              <a className="govuk-link" target="blank" href="https://www.equalityadvisoryservice.com/">Equality Advisory and Support Service (EASS) (opens in new tab).</a>
            </p>
            <p>
              If you are in Northern Ireland and are not happy with how we respond to your complaint you can contact the
              {' '}
              <a className="govuk-link" target="blank" href="https://www.equalityni.org/home">Equality Commission for Northern Ireland (opens in new tab)</a>
              {' '}
              who are responsible for enforcing the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018
              (the ‘accessibility regulations’) in Northern Ireland.
            </p>
            <h2 className="govuk-heading-l">Technical information about this website’s accessibility</h2>
            <p className="govuk-body">
              The Home Office is committed to making its website accessible, in accordance with the Public Sector Bodies (Websites and Mobile
              Applications) (No. 2) Accessibility Regulations 2018.
            </p>
            <h2 className="govuk-heading-l">Compliance status</h2>
            <p className="govuk-body">

              This website is partially compliant with the
              {' '}
              <a className="govuk-link" target="blank" href="https://www.w3.org/TR/WCAG21/">
                Web Content Accessibility Guidelines version 2.1 AA standard (opens in new tab).
              </a>
              {' '}
              The non-compliances are listed below.
            </p>
            <h2 className="govuk-heading-l">Non-accessible content</h2>
            <p className="govuk-body">The content listed below is non-accessible for the following reasons.</p>
            <h2 className="govuk-heading-m">Non-compliance with the accessibility regulations</h2>
            <ul className="govuk-list govuk-list--bullet">
              <li>Identify input purpose (1.3.5) – we autocomplete from information in the user’s profile in our forms, not from the browser.</li>
              <li>Labels or instructions (3.3.2) – Effective form labels are required to make forms accessible</li>
              <li>Parsing (4.1.1) – ID must be unique to differentiate each element from another in single sign-on, reports and forms page.</li>
              <li>Multiple “Change” links on page 6 should include an extra label text for screen readers to differentiate the links.</li>
            </ul>
            <h2 className="govuk-heading-m">What we&apos;re doing to improve accessibility</h2>
            <p className="govuk-body">Our plan below describes how and when we plan to improve the accessibility of this service:</p>
            <ul className="govuk-list govuk-list--bullet">
              <li>We will train our staff to create accessible services.</li>
              <li>We will implement automated and manual accessibility testing in our development process.</li>
              <li>We will conduct user research and testing with users who have access needs.</li>
              <li>We will put in place alternative arrangements for those who need them and be willing to make additional adjustments if these are not enough.</li>
            </ul>
            <p className="govuk-body">We plan to identify and fix the following areas to be fully compliant by the dates set:</p>
            <p className="govuk-body">By end February 2021</p>
            <ul className="govuk-list govuk-list--bullet">
              <li>Multiple “Change” links on page 6 will include extra labelled text for screen readers to differentiate the links.</li>
            </ul>
            <p className="govuk-body">By end March 2021</p>
            <ul className="govuk-list govuk-list--bullet">
              <li>Labels or instructions (3.3.2) – Effective form labels are required to make forms accessible.</li>
              <li>Parsing (4.1.1) – ID must be unique to differentiate each element from another in single sign-on, reports and forms page.</li>
            </ul>
            <h2 className="govuk-heading-l">Preparation of this accessibility statement</h2>
            <p className="govuk-body">This statement was prepared on 8th October 2020. It was last reviewed on 12th October 2020.</p>
            <p className="govuk-body">This website was last tested on 8th October 2020. The test was carried out by the Home Office’s Quality Assurance and Testing team.</p>
            <p className="govuk-body">We tested the service based on a user&apos;s ability to complete key journeys. All parts of the chosen journeys were tested.</p>
          </div>
        </div>
      </main>
    </div>
  );
};
export default AccessibilityStatement;
