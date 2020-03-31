/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

// app imports
import { VESSELS_URL } from 'Constants/ApiConstants';
import Auth from 'Auth';

import { fetchPeopleRoutine } from 'State/people';

const SectionTable = ({
  page, pageData, fetchPeopleTriggerAction, people,
}) => {
  const history = useHistory();
  const isPageVessels = page === '/vessels';
  const isPagePeople = page === '/people';
  const [data, setData] = useState();
  const [titles, setTitles] = useState([]);

  const getData = () => {
    if (isPageVessels) {
      axios.get(`${VESSELS_URL}?pagination=false`, {
        headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
      })
        .then((resp) => {
          setData(resp.data.vessels);
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
    }

    if (isPagePeople) {
      fetchPeopleTriggerAction();
    }
  };

  useEffect(() => {
    getData();
    setTitles(pageData.reportTitles);
  }, [pageData]);

  if ((isPageVessels && !data) || (isPagePeople && !people.list)) {
    return null;
  }

  return (
    <section>
      <div className="govuk-grid-column-full">
        <hr className="govuk-section-break govuk-section-break--visible govuk-section-break--xl govuk-!-margin-top-0" />
      </div>
      <div className="govuk-width-container">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-full">
            <h2 className="govuk-heading-l">
              {`Saved ${pageData.pageHeading}`}
            </h2>
            <table className="govuk-table">
              <thead className="govuk-table__head">
                <tr className="govuk-table__row">
                  {titles.map((elem) => {
                    return (
                      <th className="govuk-table__header" scope="col" key={elem}>{elem}</th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="govuk-table__body">
                {isPageVessels && data.map((vessel) => {
                  return (
                    <tr className="govuk-table__row" key={vessel.id}>
                      <td className="govuk-table__cell">
                        <Link to={{
                          pathname: '/vessels/edit-vessel',
                          state: { vesselId: vessel.id },
                        }}
                        >
                          {vessel.vesselName}
                        </Link>
                      </td>
                      <td className="govuk-table__cell">{vessel.vesselType}</td>
                      <td className="govuk-table__cell">{vessel.moorings}</td>
                    </tr>
                  );
                })}
                {isPagePeople && people.list.map((person) => {
                  return (
                    <tr className="govuk-table__row" key={person.id}>
                      <td className="govuk-table__cell">
                        <Link to={{
                          pathname: '/people/edit-person',
                          state: { peopleId: person.id },
                        }}
                        >
                          {person.lastName}
                        </Link>
                      </td>
                      <td className="govuk-table__cell">{person.firstName}</td>
                      <td className="govuk-table__cell">{person.peopleType.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchPeopleTriggerAction: () => dispatch(fetchPeopleRoutine.trigger()),
});
const mapStateToProps = ({ people }) => ({ people });
export default connect(mapStateToProps, mapDispatchToProps)(SectionTable);
