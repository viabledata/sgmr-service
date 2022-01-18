import React from 'react';

const PrivacyCookiePolicy = () => {
  document.title = 'Privacy and Cookie Policy';

  return (
    <div className="govuk-width-container ">
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-width-container">
            <h1 className="govuk-heading-l">Privacy notice for Tell Border Force and HMRC you are sailing to or from the UK in a pleasure craft</h1>
            <p className="govuk-body">
              Provision of the Tell Border Force and HMRC you are sailing to or from the UK in a pleasure craft service is from the borders, immigration
              and citizenship system, which is part of the Home Office.
              Please visit the guidance at
              {' '}
              <a href="https://www.gov.uk/government/publications/personal-information-use-in-borders-immigration-and-citizenship">
                Borders, immigration and citizenship: privacy information notice
              </a>
              {' '}
              for full information on how your personal information may be used within the Home Office Borders, Immigration and Citizenship System.
            </p>
            <h2 className="govuk-heading-m">What data we need</h2>
            <p className="govuk-body">
              The personal data we collect from you on the Tell Border Force and HMRC you are sailing to or from the UK in a pleasure craft service may include:
            </p>
            <ul className="govuk-list govuk-list--bullet">
              <li>your full name</li>
              <li>other travel document information such as document number and expiry date</li>
              <li>nationality information</li>
              <li>information on who the person responsible for the voyage is</li>
              <li>
                information on how you use the site, using cookies and page tagging techniques:
                <ul className="govuk-list govuk-list--bullet">
                  <li>the pages you visit on Tell Border Force and HMRC you are sailing to or from the UK in a pleasure craft</li>
                  <li>how long you spend on each page</li>
                  <li>what you click on while you’re visiting the site</li>
                </ul>
              </li>
            </ul>
            <p className="govuk-body">
              Under the Data Protection Act 2018, we are processing your personal information on a performance-of-a-public-task basis to allow Border Force to discharge our
              duties around your entry into the United Kingdom.
              We may process your information in systems other that the Tell Border Force and HMRC you are sailing to or from the UK in a pleasure craft Service. The legislative
              basis for collecting this information is the Immigration Act of 1971 Paragraph 27B.
            </p>
            <h2 className="govuk-heading-l">Cookies</h2>
            <p className="govuk-body">This service puts small files (known as &apos;cookies&apos;) onto your computer to collect information about how you browse the site.</p>
            <p className="govuk-body">
              Cookies are used to help identify you when you return to the site and improves the way you can access the site by storing your logon information for a limited
              period when you complete the Pleasure Craft Voyage Plan.
            </p>
            <h2 className="govuk-heading-m">How cookies are used</h2>
            <h3 className="govuk-heading-s">Measuring website usage</h3>
            <p className="govuk-body">
              We use cookies to collect information as you interact with the Tell Border Force and HMRC you are sailing to or from the UK in a pleasure craft. We do this to
              help make sure the site is meeting the needs of its users and to help us make improvements. Cookies will be used to monitor specific user information to improve
              your access to the form by remembering your non-personal details for the next time you submit a form.
            </p>
            <h3 className="govuk-heading-s">Cookie Details</h3>
            <p className="govuk-body">Tell Border Force and HMRC you are sailing to or from the UK in a pleasure craft uses cookies. The two types of persistent cookies are:</p>
            <ul className="govuk-list govuk-list--bullet">
              <li>_pk_id: used to store a few details about you such as the unique visitor ID, stored for 13 months; and</li>
              <li>_pk_ref: used to store information to initially identify you when you visit the website, stored for 6 months.</li>
            </ul>
            <p className="govuk-body">The two types of session cookies are:</p>
            <ul className="govuk-list govuk-list--bullet">
              <li>_pk_hsr (heatmap and session recording); and</li>
              <li>_pk_ses: used to temporarily store data for the visit and are stored for 30 minutes.</li>
            </ul>
            <h2 className="govuk-heading-m">Cookie Introductory Message</h2>
            <p className="govuk-body">
              You may see a Cookie Notice pop-up message when you first tell Border Force and HMRC you are sailing to or from the UK in a pleasure craft. This message is to
              advise you that the process will capture cookies as described above. By accessing the Pleasure Craft Voyage Plan form, you are consenting to the use of cookies
              described above.
            </p>
            <h2 className="govuk-heading-m">Why we need this data</h2>
            <p className="govuk-body">
              We use cookie information to enable you to log into the service that we provide and to link information you add into Tell Border Force and HMRC you are sailing
              to or from the UK in a pleasure craft to your account.
            </p>
            <p className="govuk-body">We use the information you provide to help ensure that we can enforce access control and keep data secure.</p>
            <p className="govuk-body">
              We use information about your email and your name that we hold within the system when we send you a notification. We use the GOV.UK Notify service,
              to send you notifications from the service to your email address; the GOV.UK Notify service is operated and assured by the Cabinet Office.
            </p>
            <p className="govuk-body">
              The legal basis for processing your personal data is for the performance of a public task . Privacy and Electronic CommunicationsRegulations (PECR) require
              either the subscriber’s or the user’s consent.
            </p>
            <p className="govuk-body">
              More information about the privacy of the system and the use of and how we store your data can be found on the Borders, immigrationand citizenship: privacy
              information notice page.
            </p>
            <p className="govuk-body">
              Under the Data Protection Act 2018 and General Data Protection Regulation you also have the right to object to and ask to restrict our use of your personal
              information, and to ask us to rectify or delete your personal information. However, there may be a number of legal or other official reasons why we need to
              continue to keep or use your data.
            </p>
            <p className="govuk-body">
              If you want to exercise these rights please email us at:
              {' '}
              <a href="mailto:subjectaccessrequest@homeoffice.gov.uk">subjectaccessrequest@homeoffice.gov.uk</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyCookiePolicy;
