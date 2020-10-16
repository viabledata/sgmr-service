import React from 'react';

const AccessibilityStatement = () => {
  return (
    <div className="govuk-width-container ">
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-width-container">
            <h1 className="govuk-heading-xl">Accessibility statement for Submit a General Maritime Report (sGMR)</h1>
            <p className="govuk-body">
              We want everyone to be able to get and do what they need with this service, regardless of access needs, due to a disability or condition.
            </p>
            <p className="govuk-body">
              This accessibility statement contains information about the sGMR, available at
              {' '}
              <a className="govuk-link" target="blank" href="/reports">Submit a General Maritime Report (opens in new tab).</a>
            </p>
            <p className="govuk-body">
              This website is run by Border Force. We want as many people as possible to be able to use this website. For example, that means you should be able to:
            </p>
            <ul className="govuk-list govuk-list--bullet">
              <li>Navigate most of the website using just a keyboard.</li>
              <li>Reach the main reports page from every page on sGMR</li>
              <li>Read and navigate the order on sGMR as it is logical and intuitive/clear.</li>
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
              <li>Keyboard only users are unable to reach the “Signout” button on the top navigation bar</li>
              <li>Keyboard only users are unable to tab to the “back” link on all pages</li>
              <li>The menu bar is not useable if it collapses, so users must view the site in full screen view at 100% and on a desktop</li>
              <li>There are no “skip to content” links</li>
              <li>Questions on the form and some labels in names, such as the forms page, are unable to be identified by the screen reader. The NVDA screen reader can read text fields, tabs, links and radio buttons.</li>
              <li>Fields are only auto completed from information in the user’s profile on sGMR and not from their browser.</li>
              <li>Multiple “Change” links on page 6 of the reports are read out by the Screenreader, there are no extra label text for screenreaders that differentiates the links.</li>
              <li>The “Further information” expanded accordion cannot be read by a screen reader</li>
            </ul>
            <p className="govuk-body">We know some parts of this website are not fully accessible. You can see a full list of any issues we currently know about in the Non-accessible content section of this statement.</p>
            <h2 className="govuk-heading-l">Enforcement procedure</h2>
            <p className="govuk-body">
              The Equality and Human Rights Commission (EHRC) is responsible for enforcing the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018 (the ‘accessibility regulations’). If you’re not happy with how we respond to your complaint, contact the
              {' '}
              <a className="govuk-link" target="blank" href="https://www.equalityadvisoryservice.com/">Equality Advisory and Support Service (EASS) (opens in new tab).</a>
            </p>
            <p>
              If you are in Northern Ireland and are not happy with how we respond to your complaint you can contact the
              {' '}
              <a className="govuk-link" target="blank" href="https://www.equalityni.org/home">Equality Commission for Northern Ireland (opens in new tab)</a>
              {' '}
              who are responsible for enforcing the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018 (the ‘accessibility regulations’) in Northern Ireland.
            </p>
            <h2 className="govuk-heading-l">Technical information about this website’s accessibility</h2>
            <p className="govuk-body"> The Home Office is committed to making its website accessible, in accordance with the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018.</p>
            <h2 className="govuk-heading-l">Compliance status</h2>
            <p className="govuk-body">
              This website is not compliant with the
              {' '}
              <a className="govuk-link" target="blank" href="https://www.w3.org/TR/WCAG21/">Web Content Accessibility Guidelines version 2.1 AA standard (opens in new tab).</a>
              {' '}
              The non-compliances are listed below.
            </p>
            <h2 className="govuk-heading-l">Non-accessible content</h2>
            <p className="govuk-body">The content listed below is non-accessible for the following reasons.</p>
            <h2 className="govuk-heading-m">Non-compliance with the accessibility regulations</h2>
            <ul className="govuk-list govuk-list--bullet">
              <li>Resize Text (1.4.4) – The menu bar is not readable / functional when the page is zoomed in 200% on a desktop.</li>
              <li>Reflow (1.4.10) – Loss of content / functionality when zoomed into 110% or more on the menu bar, users will not be able to see other options on the menu</li>
              <li>Reflow (1.4.10) – Loss of content / functionality when zoomed into 110% or more on the reports page. The tabs: Draft, Submitted, Cancelled are not clear they are buttons as they become plain text when zoomed.</li>
              <li>Reflow (1.4.10) – Loss of content / functionality on the reports page as the user needs to scroll to view the end of the submission reference.</li>
              <li>Identify input purpose (1.3.5) – we autocomplete from information in the user’s profile in our forms, not from the browser.</li>
              <li>Keyboard (2.1.1) and Keyboard trap (2.1.2) – Users are unable to navigate across the entire site only using their keyboard, the user would be unable to tab through the top navigation bar to signout.</li>
              <li>Keyboard (2.1.1) and Keyboard trap (2.1.2) – User is unable to tab and switch between Drafts, Submitted and Cancelled reports.</li>
              <li>Keyboard (2.1.1) and Keyboard trap (2.1.2) – User unable to tab back to the back link on the site.</li>
              <li>Bypass block (2.4.1) – no skip to content link across sGMR pages</li>
              <li>Multiple Way (2.4.5) – unable to expand menu bar when the zoomed into the page 110% or more, stopping the user from reaching the other options within the menu bar</li>
              <li>Language of Page (3.1.1) – Single sign-on page lang attribute is required for screen reader to set the language.</li>
              <li>Labels or instructions (3.3.2) – Effective form labels are required to make forms accessible</li>
              <li>Consistent Navigation (3.2.3) – Users would be unable to reach options within the menu bar if zoomed into 110% or more</li>
              <li>Parsing (4.1.1) – ID must be unique to differentiate each element from another in single sign-on, reports and forms page.</li>
              <li>Name, Role, Value (4.1.2) – Keycloak page aria-hidden attribute on an element removes the element and all its child nodes from the accessibility API.</li>
              <li>Status Message (4.1.3) – status messages/validation errors can be read by screen readers, however screen readers are unable to read questions within the form.</li>
              <li>Multiple “Change” links on page 6 should include an extra label text for screen readers to differentiate the links.</li>
              <li>“Further information” expanded accordion cannot be read by a screen reader.</li>
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
            <p className="govuk-body">By end December 2020</p>
            <ul className="govuk-list govuk-list--bullet">
              <li>Resize Text (1.4.4) – The menu bar is not readable / functional when the page is zoomed in 200% on a desktop.</li>
              <li>Reflow (1.4.10) – Loss of content / functionality when zoomed into 110% or more on the menu bar, users will not be able to see other options on the menu</li>
              <li>Reflow (1.4.10) – Loss of content / functionality when zoomed into 110% or more on the reports page. The tabs: Draft, Submitted, Cancelled are not clear they are buttons as they become plain text when zoomed.</li>
              <li>Reflow (1.4.10) – Loss of content / functionality on the reports page as the user needs to scroll to view the end of the submission reference.</li>
              <li>Keyboard (2.1.1) and Keyboard trap (2.1.2) – Users are unable to navigate across the entire site only using their keyboard, the user would be unable to tab through the top navigation bar to signout.</li>
              <li>Keyboard (2.1.1) and Keyboard trap (2.1.2) – User is unable to tab and switch between Drafts, Submitted and Cancelled reports.</li>
              <li>Keyboard (2.1.1) and Keyboard trap (2.1.2) – User unable to tab back to the back link on the site.</li>
              <li>Bypass block (2.4.1) – Include skip to content link across sGMR pages</li>
              <li>Multiple Way (2.4.5) – unable to expand menu bar when the zoomed into the page 110% or more, stopping the user from reaching the other options within the menu bar</li>
              <li>Status Message (4.1.3) – status messages/validation errors can be read by screen readers; however screen readers are unable to read questions within the form.</li>
              <li>Multiple “Change” links on page 6 will include extra labelled text for screen readers to differentiate the links.</li>
            </ul>
            <p className="govuk-body">By March 2021</p>
            <ul className="govuk-list govuk-list--bullet">
              <li>Language of Page (3.1.1) – Single sign-on page lang attribute is required for screen reader to set the language.</li>
              <li>Labels or instructions (3.3.2) – Effective form labels are required to make forms accessible.</li>
              <li>Consistent Navigation (3.2.3) – Users would be unable to reach options within the menu bar if zoomed into 110% or more</li>
              <li>Parsing (4.1.1) – ID must be unique to differentiate each element from another in single sign-on, reports and forms page.</li>
              <li>Name, Role, Value (4.1.2) – Keycloak page aria-hidden attribute on an element removes the element and all its child nodes from the accessibility API.</li>
              <li>“Further information” expanded accordion will be read by a screen reader.</li>
            </ul>
            <h2 className="govuk-heading-l">Preparation of this accessibility statement</h2>
            <p className="govuk-body">This statement was prepared on 8th October 2020. It was last reviewed on 12th October 2020.</p>
            <p className="govuk-body">This website was last tested on 8th October 2020. The test was carried out by the Home Office’s Quality Assurance and Testing team.</p>
            <p className="govuk-body">We tested the service based on a user's ability to complete key journeys. All parts of the chosen journeys were tested.</p>
          </div>
        </div>
      </main>
    </div>
  );
};
export default AccessibilityStatement;
