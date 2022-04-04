import React from 'react';

const FormFieldError = ({ error }) => (error ? (
  <span className="govuk-error-message">
    <span className="govuk-visually-hidden">Error:</span>
    {error}
  </span>
) : null);

export default FormFieldError;
