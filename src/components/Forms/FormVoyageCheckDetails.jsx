import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';

// App imports
import { apiPath } from 'config';
import Auth from 'Auth';

const FormVoyageCheckDetails = () => {
  const location = useLocation();
  const history = useHistory();
  const [data, setData] = useState([]);

  const getData = () => {
    axios.get(`${apiPath}/user/voyagereport`, {
      headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
    })
      .then((resp) => {
        setData(resp.data);
      })
      .catch((err) => {
        if (err.response) {
          switch (err.response.status) {
            case 422: history.push(`/sign-in?source=${location}`); break;
            default: history.push(`/sign-in?source=${location}`); break;
          }
        }
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">

      <div className="govuk-grid-row">
        <h1 className="govuk-heading-xl">
          Check all the information provided before submitting your Advanced Voyage Report
        </h1>

        <dl className="govuk-summary-list govuk-!-margin-bottom-9">
            <div className="govuk-summary-list__row">
              <dt className="govuk-heading-m">Departure details</dt>
              <dd className="govuk-summary-list__value">
                <Link to="page-1">Change<span className="govuk-visually-hidden"> Change</span></Link>
              </dd>
            </div>
          </dl>
          <dl className="govuk-summary-list govuk-!-margin-bottom-9">
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Departure date</dt>
              <dd className="govuk-summary-list__value">20 01 2020</dd>

            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Departure time</dt>
              <dd className="govuk-summary-list__value">14:30</dd>

            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Departure port</dt>
              <dd className="govuk-summary-list__value">MC MON</dd>

            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Departure port latitude</dt>
              <dd className="govuk-summary-list__value">N/A</dd>

            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Departure port longitude</dt>
              <dd className="govuk-summary-list__value">N/A</dd>

            </div>
          </dl>
          <dl className="govuk-summary-list govuk-!-margin-bottom-9">
            <div className="govuk-summary-list__row">
              <dt className="govuk-heading-m">Arrival details</dt>
              <dd className="govuk-summary-list__value">
                <Link to="page-2">Change<span className="govuk-visually-hidden"> Change</span></Link>
              </dd>
            </div>
          </dl>
          <dl className="govuk-summary-list govuk-!-margin-bottom-9">
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Arrival date</dt>
              <dd className="govuk-summary-list__value">21 01 2020</dd>

            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Arrival time</dt>
              <dd className="govuk-summary-list__value">10:30</dd>

            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Arrival port</dt>
              <dd className="govuk-summary-list__value">GB PME</dd>

            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Arrival port latitude</dt>
              <dd className="govuk-summary-list__value">N/A</dd>

            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Arrival port longitude</dt>
              <dd className="govuk-summary-list__value">N/A</dd>

            </div>
          </dl>
          <dl className="govuk-summary-list govuk-!-margin-bottom-9">
            <div className="govuk-summary-list__row">
              <dt className="govuk-heading-m">Vessel details</dt>
              <dd className="govuk-summary-list__value">
                <Link to="page-3">Change<span className="govuk-visually-hidden"> Change</span></Link>
              </dd>
            </div>
          </dl>
          <dl className="govuk-summary-list govuk-!-margin-bottom-9">
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Vessel name</dt>
              <dd className="govuk-summary-list__value">Baroness</dd>

            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Vessel type</dt>
              <dd className="govuk-summary-list__value">Yacht</dd>

            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Usual moorings</dt>
              <dd className="govuk-summary-list__value">Lee-on-solent</dd>

            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Registration number</dt>
              <dd className="govuk-summary-list__value">8347656</dd>

            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Hull identification number</dt>
              <dd className="govuk-summary-list__value">TRZ349786409</dd>

            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Callsign</dt>
              <dd className="govuk-summary-list__value">MGY</dd>

            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Vessel nationality</dt>
              <dd className="govuk-summary-list__value">Panama</dd>

            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Port of registry</dt>
              <dd className="govuk-summary-list__value">Belfast</dd>

            </div>
          </dl>
          <dl className="govuk-summary-list govuk-!-margin-bottom-9">
            <div className="govuk-summary-list__row">
              <dt className="govuk-heading-m">Manifest details</dt>
              <dd className="govuk-summary-list__value">
                <Link to="page-4">Change<span className="govuk-visually-hidden"> Change</span></Link>
              </dd>
            </div>
          </dl>
          <table className="govuk-table">
            <thead className="govuk-table__head">
              <tr className="govuk-table__row">
                <th className="govuk-table__header" scope="col">Surname</th>
                <th className="govuk-table__header" scope="col">Given name</th>
                <th className="govuk-table__header" scope="col">Date of birth</th>
                <th className="govuk-table__header" scope="col">Travel document number</th>
                <th className="govuk-table__header" scope="col">Nationality</th>
                <th className="govuk-table__header" scope="col">Type</th>
              </tr>
            </thead>
            <tbody className="govuk-table__body">
              <tr className="govuk-table__row">
                <td className="govuk-table__cell">Grover</td>
                <td className="govuk-table__cell">Chris</td>
                <td className="govuk-table__cell">02/04/1979</td>
                <td className="govuk-table__cell">GBR1654TB</td>
                <td className="govuk-table__cell">French</td>
                <td className="govuk-table__cell">Crew</td>
              </tr>
              <tr className="govuk-table__row">
                <td className="govuk-table__cell" colSpan="6">
                  <div>
                    <details role="group">
                      <summary role="button" aria-controls="details-content-2" aria-expanded="false" title="Further information for Chris Grover">
                        <span className="summary">Further information</span>
                      </summary>
                      <div className="panel panel-border-narrow" id="details-content-2" aria-hidden="true">
                        <table className="govuk-table" width="100%">
                          <tbody className="govuk-table__body">
                            <tr className="govuk-table__row">
                              <td className="govuk-table__cell">Gender</td>
                              <td className="govuk-table__cell">Male</td>
                            </tr>
                            <tr className="govuk-table__row">
                              <td className="govuk-table__cell">Place of birth</td>
                              <td className="govuk-table__cell">Paris</td>
                            </tr>
                            <tr className="govuk-table__row">
                              <td className="govuk-table__cell">Travel document type</td>
                              <td className="govuk-table__cell">Passport</td>
                            </tr>
                            <tr className="govuk-table__row">
                              <td className="govuk-table__cell">Travel document issuing state</td>
                              <td className="govuk-table__cell">France</td>
                            </tr>
                            <tr className="govuk-table__row">
                              <td className="govuk-table__cell">Travel document expiry date</td>
                              <td className="govuk-table__cell">10/02/2020</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </details>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <h2 className="govuk-heading-m">Submit your Advanced Voyage Report</h2>
          <p>By submitting this Advanced Voyage Report you are confirming that, to the best of your knowledge, the information you are providing is correct and you have the explicit permission of the persons named in this report to submit information on their behalf.</p>
      </div>
    </main>
  );
};

export default FormVoyageCheckDetails;
