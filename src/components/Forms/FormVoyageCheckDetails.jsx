import React from 'react';

const FormVoyageCheckDetails = () => {
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
                <a href="create-gmr-departure.html">Change<span className="govuk-visually-hidden"> Change</span></a>
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
                <a href="create-gmr-arrival.html">Change<span className="govuk-visually-hidden"> Change</span></a>
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
                <a href="create-gmr-vessel.html">Change<span className="govuk-visually-hidden"> Change</span></a>
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
              <dt className="govuk-summary-list__key">Colour of hull</dt>
              <dd className="govuk-summary-list__value">White</dd>

            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Length (meters)</dt>
              <dd className="govuk-summary-list__value">185</dd>

            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">When was the vessel built</dt>
              <dd className="govuk-summary-list__value">23 07 2008</dd>

            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Where was the vessel built</dt>
              <dd className="govuk-summary-list__value">Belfast</dd>

            </div>
          </dl>
          <dl className="govuk-summary-list govuk-!-margin-bottom-9">
            <div className="govuk-summary-list__row">
              <dt className="govuk-heading-m">Manifest details</dt>
              <dd className="govuk-summary-list__value">
                <a href="create-gmr-manifest.html">Change<span className="govuk-visually-hidden"> Change</span></a>
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
              <tr className="govuk-table__row">
                <td className="govuk-table__cell">Jackson</td>
                <td className="govuk-table__cell">Cyrille</td>
                <td className="govuk-table__cell">10/09/1987</td>
                <td className="govuk-table__cell">GBR1654TB</td>
                <td className="govuk-table__cell">British</td>
                <td className="govuk-table__cell">Crew</td>
              </tr>
              <tr className="govuk-table__row">
                <td className="govuk-table__cell" colSpan="6">
                  <div>
                    <details role="group">
                      <summary role="button" aria-controls="details-content-2" aria-expanded="false">
                        <span className="summary" title="Further information for Cyrille Jackson">Further information</span>
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
                              <td className="govuk-table__cell">Manchester</td>
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
                              <td className="govuk-table__cell">24/04/2021</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </details>
                  </div>
                </td>
              </tr>
              <tr className="govuk-table__row">
                <td className="govuk-table__cell">Lizaitis</td>
                <td className="govuk-table__cell">Nicky</td>
                <td className="govuk-table__cell">03/09/1975</td>
                <td className="govuk-table__cell">USA276AB</td>
                <td className="govuk-table__cell">American</td>
                <td className="govuk-table__cell">Passenger</td>
              </tr>
              <tr className="govuk-table__row">
                <td className="govuk-table__cell" colSpan="6">
                  <div>
                    <details role="group">
                      <summary role="button" aria-controls="details-content-2" aria-expanded="false">
                        <span className="summary" title="Further information for Nicky Lizaitis">Further information</span>
                      </summary>
                      <div className="panel panel-border-narrow" id="details-content-2" aria-hidden="true">
                        <table className="govuk-table" width="100%">
                          <tbody className="govuk-table__body">
                            <tr className="govuk-table__row">
                              <td className="govuk-table__cell">Gender</td>
                              <td className="govuk-table__cell">Female</td>
                            </tr>
                            <tr className="govuk-table__row">
                              <td className="govuk-table__cell">Place of birth</td>
                              <td className="govuk-table__cell">Atlanta</td>
                            </tr>
                            <tr className="govuk-table__row">
                              <td className="govuk-table__cell">Travel document type</td>
                              <td className="govuk-table__cell">Passport</td>
                            </tr>
                            <tr className="govuk-table__row">
                              <td className="govuk-table__cell">Travel document issuing state</td>
                              <td className="govuk-table__cell">America</td>
                            </tr>
                            <tr className="govuk-table__row">
                              <td className="govuk-table__cell">Travel document expiry date</td>
                              <td className="govuk-table__cell">24/04/2021</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </details>
                  </div>
                </td>
              </tr>
              <tr className="govuk-table__row">
                <td className="govuk-table__cell">Lowe</td>
                <td className="govuk-table__cell">Alex</td>
                <td className="govuk-table__cell">06/07/1989</td>
                <td className="govuk-table__cell">GBR1654TB</td>
                <td className="govuk-table__cell">French</td>
                <td className="govuk-table__cell">Skipper</td>
              </tr>
              <tr className="govuk-table__row">
                <td className="govuk-table__cell" colSpan="6">
                  <div>
                    <details role="group">
                      <summary role="button" aria-controls="details-content-2" aria-expanded="false">
                        <span className="summary" title="Further information for Alex Lowe">Further information</span>
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
                              <td className="govuk-table__cell">Woking</td>
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
                              <td className="govuk-table__cell">10/08/2020</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </details>
                  </div>
                </td>
              </tr>
              <tr className="govuk-table__row">
                <td className="govuk-table__cell">Mosely</td>
                <td className="govuk-table__cell">Alice</td>
                <td className="govuk-table__cell">11/01/1961</td>
                <td className="govuk-table__cell">GBR1654TB</td>
                <td className="govuk-table__cell">German</td>
                <td className="govuk-table__cell">Passenger</td>
              </tr>
              <tr className="govuk-table__row">
                <td className="govuk-table__cell" colSpan="6">
                  <div>
                    <details role="group">
                      <summary role="button" aria-controls="details-content-2" aria-expanded="false">
                        <span className="summary" title="Further information for Alice Mosely">Further information</span>
                      </summary>
                      <div className="panel panel-border-narrow" id="details-content-2" aria-hidden="true">
                        <table className="govuk-table" width="100%">
                          <tbody className="govuk-table__body">
                            <tr className="govuk-table__row">
                              <td className="govuk-table__cell">Gender</td>
                              <td className="govuk-table__cell">Female</td>
                            </tr>
                            <tr className="govuk-table__row">
                              <td className="govuk-table__cell">Place of birth</td>
                              <td className="govuk-table__cell">Berlin</td>
                            </tr>
                            <tr className="govuk-table__row">
                              <td className="govuk-table__cell">Travel document type</td>
                              <td className="govuk-table__cell">Passport</td>
                            </tr>
                            <tr className="govuk-table__row">
                              <td className="govuk-table__cell">Travel document issuing state</td>
                              <td className="govuk-table__cell">Germany</td>
                            </tr>
                            <tr className="govuk-table__row">
                              <td className="govuk-table__cell">Travel document expiry date</td>
                              <td className="govuk-table__cell">01/11/2022</td>
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
          <dl className="govuk-summary-list govuk-!-margin-bottom-9">
            <div className="govuk-summary-list__row">
              <dt className="govuk-heading-m">Responsible person details</dt>
              <dd className="govuk-summary-list__value">
                <a href="create-gmr-responsible-person.html">Change<span className="govuk-visually-hidden"> Change</span></a>
              </dd>
            </div>
          </dl>
          <dl className="govuk-summary-list govuk-!-margin-bottom-9">
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Given name</dt>
              <dd className="govuk-summary-list__value">Alex</dd>

            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Surname</dt>
              <dd className="govuk-summary-list__value">Lowe</dd>

            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Contact telephone number</dt>
              <dd className="govuk-summary-list__value">07523968574</dd>

            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Address</dt>
              <dd className="govuk-summary-list__value">1 The Street, Hamble, Southampton</dd>

            </div>
          </dl>
          <dl className="govuk-summary-list govuk-!-margin-bottom-9">
            <div className="govuk-summary-list__row">
              <dt className="govuk-heading-m">Additional information </dt>
              <dd className="govuk-summary-list__value">
                <a href="create-gmr-customs.html">Change<span className="govuk-visually-hidden"> Change</span></a>
              </dd>
            </div>
          </dl>
          <dl className="govuk-summary-list govuk-!-margin-bottom-9">
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Additional ports</dt>
              <dd className="govuk-summary-list__value">FR CER</dd>

            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Intending to make a customs declaration upon arrival?</dt>
              <dd className="govuk-summary-list__value">Yes</dd>

            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Does the vessel have any duty free stores?</dt>
              <dd className="govuk-summary-list__value">No</dd>

            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Is the vessel being exported as a VAT free sailaway?</dt>
              <dd className="govuk-summary-list__value">No</dd>

            </div>
          </dl>
          <dl className="govuk-summary-list govuk-!-margin-bottom-9">
            <div className="govuk-summary-list__row">
              <dt className="govuk-heading-m">Supporting documentation details</dt>
              <dd className="govuk-summary-list__value">
                <a href="create-gmr-supporting-documents.html">Change<span className="govuk-visually-hidden"> Change</span></a>
              </dd>
            </div>
          </dl>
       
          

          <h2 className="govuk-heading-m">Submit your Advanced Voyage Report</h2>
          <p>By submitting this Advanced Voyage Report you are confirming that, to the best of your knowledge, the information you are providing is correct and you have the explicit permission of the persons named in this report to submit information on their behalf.</p>
      </div>
    </main>
  );
};

export default FormVoyageCheckDetails;
