import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="govuk-footer " role="contentinfo">
      <div className="govuk-width-container ">
        <div className="govuk-footer__meta">
          <div className="govuk-footer__meta-item govuk-footer__meta-item--grow">
            <h2 className="govuk-visually-hidden">Support links</h2>
            <ul className="govuk-footer__inline-list">
              <li className="govuk-footer__inline-list-item"><a className="govuk-footer__link" href="/privacy-and-cookie-policy">Privacy and Cookie Policy</a></li>
              <li className="govuk-footer__inline-list-item"><a className="govuk-footer__link" href="/accessibility-statement">Accessibility Statement</a></li>
              <li className="govuk-footer__inline-list-item">
                <a className="govuk-footer__link" href="/help">
                  Help
                </a>
              </li>
            </ul>
          </div>
          <div className="govuk-footer__meta-item">
            <Link
              className="govuk-footer__link govuk-footer__copyright-logo"
              to="https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/"
            >
              © Crown copyright
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
