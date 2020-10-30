import React from 'react';

const ErrorSummary = ({ errors = [] }) => errors && errors.some(Boolean) && (
  <div
    className="govuk-error-summary"
    aria-labelledby="error-summary-title"
    role="alert"
    tabIndex="-1"
    data-module="govuk-error-summary"
    data-testid="error-summary"
  >
    <h2 className="govuk-error-summary__title">
      There is a problem
    </h2>
    <ul className="govuk-list govuk-error-summary__list">
      {errors.map((error) => (
        <li key={error}>{error}</li>
      ))}
    </ul>
  </div>
);

export default ErrorSummary;
