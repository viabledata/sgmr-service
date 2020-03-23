import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateVoyageReportRoutine } from 'State/voyage';
import { fetchVesselsRoutine } from 'State/vessels';
import contentArray from 'contentArray';
import CreateVessel from 'CreateVessel';


const FormVoyageVessel = ({
  handleSubmit, handleChange, data, errors, updateVoyageReportAction, fetchVesselsTriggerAction, vessels,
}) => {
  const [titles, setTitles] = useState();
  const arr = contentArray;

  useEffect(() => {
    fetchVesselsTriggerAction();
  }, []);

  const getTitles = () => {
    const page = arr.find((obj) => {
      return obj.urlStub === '/vessels';
    });
    setTitles(page.reportTitles);
  };

  useEffect(() => {
    getTitles();
  }, []);

  if (!titles || !vessels) {
    return null;
  }

  return (
    <section>
      <h1 className="govuk-heading-xl">Vessel details</h1>
      {
        vessels.list.length > 0 && (
          <>
            <h2 className="govuk-heading-l">Saved vessels</h2>
            <p className="govuk-body-l">Add the details of a vessel you have saved previously to the report</p>
            <table className="govuk-table">
              <thead className="govuk-table__head">
                <tr className="govuk-table__row">
                  <th className="govuk-table__header">&nbsp;</th>
                  {titles.map((elem, i) => {
                    return (
                      <th className="govuk-table__header" scope="col" key={i}>{elem}</th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="govuk-table__body">
                {vessels.list.map((vessel) => {
                  const isChecked = (data.vessels && data.vessels.indexOf(vessel.id) >= 0) || false;

                  return (
                    <tr className="govuk-table__row" key={vessel.id}>
                      <td className="govuk-table__cell multiple-choice--hod">
                        <div className="govuk-checkboxes__item">
                          <input
                            type="checkbox"
                            className="govuk-checkboxes__input jsCheckbox"
                            id={vessel.id}
                            name="vessels"
                            value={vessel.id}
                            onChange={handleChange}
                            checked={isChecked}
                            data-single-or-multi="single"
                          />
                          <label className="govuk-label govuk-checkboxes__label" htmlFor={vessel.id}>&nbsp;</label>
                        </div>
                      </td>
                      <td className="govuk-table__cell" scope="row">{vessel.vesselName}</td>
                      <td className="govuk-table__cell">{vessel.vesselType}</td>
                      <td className="govuk-table__cell">{vessel.vesselBase}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button
              type="button"
              className="govuk-button"
              data-module="govuk-button"
              onClick={(e) => handleSubmit(e, updateVoyageReportAction, 'vessel')}
            >
              Add to report
            </button>
          </>
        )
      }
      {
          (!data.vessels || (data.vessels && data.vessels.length === 0)) && (
            <>
              <h2 className="govuk-heading-l">New vessel</h2>
              <p className="govuk-body-l">Add the details of a new vessel you have not already saved</p>

              <CreateVessel
                handleChange={handleChange}
                data={data}
                errors={errors}
              />

              <button
                type="button"
                className="govuk-button"
                data-module="govuk-button"
                onClick={(e) => handleSubmit(e, updateVoyageReportAction, 'vessel')}
              >
                Save and continue
              </button>
            </>
          )
      }
    </section>
  );
};

FormVoyageVessel.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  removeError: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  errors: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  vessels: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  fetchVesselsTriggerAction: PropTypes.func.isRequired,
  updateVoyageReportAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ vessels }) => ({ vessels });

const mapDispatchToProps = (dispatch) => ({
  fetchVesselsTriggerAction: () => dispatch(fetchVesselsRoutine.trigger()),
  updateVoyageReportAction: (formData) => dispatch(updateVoyageReportRoutine.request(formData)),
});
export default connect(mapStateToProps, mapDispatchToProps)(FormVoyageVessel);
