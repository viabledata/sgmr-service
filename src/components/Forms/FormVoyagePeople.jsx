import React from 'react';
import { Link } from 'react-router-dom';

// app imports
import SectionTable from 'SectionTable';

const FormVoyagePeople = ({ handleSubmit, handleChange, data }) => {
  const getPeopleList = () => {
    // api call to get data to pass to page
  };

  const linkTo = {
    pathname: '/people/save-person',
    sourcePage: '/save-voyage/page-4',
  };
  return (
    <section>
      <h1 className="govuk-heading-xl">Manifest details</h1>
      <h2 className="govuk-heading-l">Saved people</h2>
      <p className="govuk-body-l">Add the details of people you have saved previously</p>
      <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />

      <h2 className="govuk-heading-l">New person</h2>
      <p><Link to='/people/save-person'>Add a new person to the report</Link></p>
      <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />

      {/* <SectionTable page={'/people'} /> */}

      <button
        className="govuk-button"
        data-module="govuk-button"
        onClick={(e) => handleSubmit(e)}
      >
        Save and continue
      </button>
    </section>
  );
};

export default FormVoyagePeople;
