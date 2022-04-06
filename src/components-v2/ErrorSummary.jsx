import React from 'react';

const ErrorSummary = ({ errors }) => {

  const handleErrorClick = (e, id) => {
    e.preventDefault();
    const scrollToError = document.getElementById(id);
    scrollToError.scrollIntoView();
    document.getElementById(`${id}Input`).focus()
  };

  if (Object.keys(errors).length === 0) return null;
  return (
    <div className="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabIndex="-1" data-module="govuk-error-summary">
      <h2 className="govuk-error-summary__title" id="error-summary-title">
        There is a problem
      </h2>
      <div className="govuk-error-summary__body">
        <ul className="govuk-list govuk-error-summary__list">
          {Object.entries(errors).reverse().map((elem) => (
            <li key={elem[0]}>
              {elem[0] !== 'helpError' && <a onClick={(e) => handleErrorClick(e, elem[0])} href={elem[0]}>{elem[1]}</a>}
              {elem[0] === 'helpError' && <a href="/page/help">{elem[1]}</a>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ErrorSummary