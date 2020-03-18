import React, { useEffect, useState } from 'react';
import axios from 'axios';

// app imports
import { apiPath } from 'config';
import Auth from 'Auth';
import contentArray from 'contentArray';
import CreateVessel from 'CreateVessel';


const FormVoyageVessel = () => {
  const [titles, setTitles] = useState();
  const [vessels, setVessels] = useState();
  const [apiErrors, setApiErrors] = useState();
  const arr = contentArray;

  const getTitles = () => {
    const page = arr.find((obj) => {
      return obj.urlStub === '/vessels';
    });
    setTitles(page.reportTitles);
  };

  const getData = () => {
    axios.get(`${apiPath}/user/vessels`, {
      headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
    })
      .then((resp) => {
        setVessels(resp.data);
      })
      .catch((err) => {
        if (err.response) {
          switch (err.response.status) {
            case 401: history.push(`/sign-in?source=${location}`); break;
            case 422: history.push(`/sign-in?source=${location}`); break;
            case 405: history.push(`/sign-in?source=${location}`); break;
            default: setApiErrors({ ...apiErrors, main: 'Something went wrong' });
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
            {vessels.items.map((elem, i) => {
              return (
                <tr className="govuk-table__row" key={i}>
                  <td className="govuk-table__cell multiple-choice--hod">
                    <div className="govuk-checkboxes__item">
                      <input type="checkbox" className="govuk-checkboxes__input jsCheckbox" id="radio-1" />
                      <label className="govuk-label govuk-checkboxes__label" htmlFor="radio-1">&nbsp;</label>
                    </div>
                  </td>
                  <td className="govuk-table__cell" scope="row">{elem.name}</td>
                  <td className="govuk-table__cell">{elem.vesselType}</td>
                  <td className="govuk-table__cell">{elem.vesselBase}</td>
                </tr>
              );
            })}
          </tbody>
      </table>
      <h2 className="govuk-heading-l">New vessel</h2>
      <p className="govuk-body-l">Add the details of a new vessel you have not already saved</p>

      {/* <CreateVessel
        handleSubmit={(e) => handleSubmit(e)}
        handleChange={(e) => handleChange(e)}
        data={formData}
        errors={errors}
      /> */}

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

export default FormVoyageVessel;
