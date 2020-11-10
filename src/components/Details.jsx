import React from 'react';

const Details = ({ summary, children }) => (
  <details className="govuk-details" data-module="govuk-details">
    <summary className="govuk-details__summary">
      <span className="govuk-details__summary-text">{summary}</span>
    </summary>
    <div className="govuk-details__text">{children}</div>
  </details>
);

export default Details;
