import React from 'react';
import { useHistory } from 'react-router-dom';

// app imports

const PageIntro = (props) => {
  let history = useHistory();
  return (
    <div className="govuk-width-container">
      <a href="" className="govuk-back-link" onClick={(e) => {
        e.preventDefault();
        history.goBack();
      }}>Back</a>

      <main className="govuk-main-wrapper">

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-xl">{props.pageData.heading}</h1>
            <p className="govuk-body">{props.pageData.blurb}</p>
            <a href={props.pageData.buttonLink} role="button" draggable="false" className="govuk-button govuk-button--start" data-module="govuk-button">
              {props.pageData.buttonText}
              <svg className="govuk-button__start-icon" xmlns="http://www.w3.org/2000/svg" width="17.5" height="19" viewBox="0 0 33 40" role="presentation" focusable="false">
                <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
              </svg>
            </a>
          </div>
        </div>

      </main>
    </div>
  );
};

export default PageIntro;
