import React from 'react';
import { Link } from 'react-router-dom';

const StartButton = ({ pageData, onClick }) => {
  return (
    <Link
      to={pageData.buttonLink}
      role="button"
      draggable="false"
      className={`govuk-button ${pageData.buttonClass}`}
      data-module="govuk-button"
      onClick={onClick}>
      {pageData.buttonText}
      {pageData.buttonClass
        && (
        <svg
          className="govuk-button__start-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="17.5"
          height="19"
          viewBox="0 0 33 40"
          role="presentation"
          focusable="false"
        >
          <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
        </svg>
        )}
    </Link>
  );
};

export default StartButton;
