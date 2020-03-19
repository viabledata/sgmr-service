import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';

// app imports
import { VESSELS_URL } from 'Constants/ApiConstants';
import Auth from 'Auth';
import contentArray from 'contentArray';
import CreateVessel from 'CreateVessel';


const FormVoyageVessel = ({ handleSubmit, handleChange, data, errors }) => {
  const history = useHistory();
  const location = useLocation();
  const [titles, setTitles] = useState();
  const [vessels, setVessels] = useState();
  const arr = contentArray;

  const getTitles = () => {
    const page = arr.find((obj) => {
      return obj.urlStub === '/vessels';
    });
    setTitles(page.reportTitles);
  };

  const getData = () => {
    axios.get(`${VESSELS_URL}?pagination=false`, {
      headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
    })
      .then((resp) => {
        setVessels(resp.data.vessels);
      })
      .catch((err) => {
        if (err.response) {
          switch (err.response.status) {
            case 401: history.push(`/sign-in?source=${location}`); break;
            case 422: history.push(`/sign-in?source=${location}`); break;
            case 405: history.push(`/sign-in?source=${location}`); break;
            default: history.push(`/sign-in?source=${location}`);
          }
        }
      });
  };

  useEffect(() => {
    getTitles();
    getData();
  }, []);

  if (!titles || !vessels) { return (null); }
  return (
    <section>
      <h1 className="govuk-heading-xl">Vessel details</h1>
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
            {vessels.map((elem, i) => {
              return (
                <tr className="govuk-table__row" key={i}>
                  <td className="govuk-table__cell multiple-choice--hod">
                    <div className="govuk-checkboxes__item">
                      <input
                        type="checkbox"
                        className="govuk-checkboxes__input jsCheckbox"
                        id={elem.id}
                        name={elem.name}
                        value={elem.name}
                        onChange={(e) => handleChange(e)}
                      />
                      <label className="govuk-label govuk-checkboxes__label" htmlFor={elem.id}>&nbsp;</label>
                    </div>
                  </td>
                  <td className="govuk-table__cell" scope="row">{elem.vesselName}</td>
                  <td className="govuk-table__cell">{elem.vesselType}</td>
                  <td className="govuk-table__cell">{elem.vesselBase}</td>
                </tr>
              );
            })}
          </tbody>
      </table>
      <button
        type="button"
        className="govuk-button"
        data-module="govuk-button"
        onClick={(e) => handleSubmit(e)}
      >
        Add to report
      </button>
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
        onClick={handleSubmit}
      >
        Save and continue
      </button>
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
  createVoyageReportAction: PropTypes.func.isRequired,
};

export default FormVoyageVessel;
