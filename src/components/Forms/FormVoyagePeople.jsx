import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPeopleRoutine } from 'State/people';

const FormVoyagePeople = ({ handleSubmit, handleChange, data, fetchPeopleTriggerAction, people }) => {
  useEffect(() => {
    fetchPeopleTriggerAction();
  }, []);
  
  return (
    <section>
      <h1 className="govuk-heading-xl">Manifest details</h1>
      <h2 className="govuk-heading-l">Saved people</h2>
      <p className="govuk-body-l">Add the details of people you have saved previously</p>
      <table className="govuk-table">
        <thead className="govuk-table__head">
          <tr className="govuk-table__row">
            <th className="govuk-table__header">&nbsp;</th>
            <th className="govuk-table__header" scope="col">Surname</th>
            <th className="govuk-table__header" scope="col">Given name</th>
            <th className="govuk-table__header" scope="col">Type</th>
          </tr>
          </thead>
          <tbody className="govuk-table__body">
            {people.list.map((person) => {
              return (
                <tr className="govuk-table__row" key={person.id}>
                  <td className="govuk-table__cell multiple-choice--hod">
                    <div className="govuk-checkboxes__item">
                      <input
                        type="checkbox"
                        className="govuk-checkboxes__input jsCheckbox"
                        name="people"
                        id={person.id}
                        value={person.id}
                        onChange={(e) => handleChange(e)}
                        checked={data.people.indexOf(person.id) >= 0}
                      />
                      <label className="govuk-label govuk-checkboxes__label" htmlFor={person.id}>&nbsp;</label>
                    </div>
                  </td>
                  <td className="govuk-table__cell" scope="row">
                    <p>{person.lastName}</p>
                  </td>
                  <td className="govuk-table__cell">{person.firstName}</td>
                  <td className="govuk-table__cell">{person.peopleType.name}</td>
                </tr>
              );
            })}
          </tbody>
      </table>
      <button
        className="govuk-button"
        data-module="govuk-button"
        onClick={(e) => handleSubmit(e)}
      >
        Add to report
      </button>

      <h2 className="govuk-heading-l">New person</h2>
      <p><Link to='/people/save-person?source=voyage'>Add a new person to the report</Link></p>
      <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />

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

const mapDispatchToProps = (dispatch) => ({
  fetchPeopleTriggerAction: () => dispatch(fetchPeopleRoutine.trigger()),
});
const mapStateToProps = ({ people }) => ({ people });

export default connect(mapStateToProps, mapDispatchToProps)(FormVoyagePeople);
