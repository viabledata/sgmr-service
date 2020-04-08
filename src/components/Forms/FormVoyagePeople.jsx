import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPeopleRoutine } from '@state/people';
import { updateVoyageReportRoutine } from '@state/voyage';

const FormVoyagePeople = ({
  handleSubmit, handleChange, data, fetchPeopleTriggerAction, updateVoyageReportAction, people,
}) => {
  useEffect(() => {
    fetchPeopleTriggerAction();
  }, []);

  return (
    <section>
      <h1 className="govuk-heading-xl">Manifest details</h1>
      {people.list.length > 0 && (
        <>
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
                const isChecked = (data.people && data.people.indexOf(person.id) >= 0) || false;

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
                          onChange={handleChange}
                          checked={isChecked}
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
            type="button"
            className="govuk-button"
            data-module="govuk-button"
            onClick={(e) => handleSubmit(e, updateVoyageReportAction, 'people')}
          >
            Add to report
          </button>
        </>
      )}

      <h2 className="govuk-heading-l">New person</h2>
      <p><Link to="/people/save-person?source=voyage">Add a new person to the report</Link></p>
      <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />

      <button
        type="button"
        className="govuk-button"
        data-module="govuk-button"
        onClick={(e) => handleSubmit(e, updateVoyageReportAction, 'people')}
      >
        Save and continue
      </button>
    </section>
  );
};

FormVoyagePeople.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  fetchPeopleTriggerAction: PropTypes.func.isRequired,
  updateVoyageReportAction: PropTypes.func.isRequired,
  people: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const mapDispatchToProps = (dispatch) => ({
  fetchPeopleTriggerAction: () => dispatch(fetchPeopleRoutine.trigger()),
  updateVoyageReportAction: (formData) => dispatch(updateVoyageReportRoutine.request(formData)),
});
const mapStateToProps = ({ people }) => ({ people });


export default connect(mapStateToProps, mapDispatchToProps)(FormVoyagePeople);
