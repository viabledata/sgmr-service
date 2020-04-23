import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// App imports
import { getData } from '@utils/apiHooks';
import { VESSELS_URL, PEOPLE_URL } from '@constants/ApiConstants';
import VesselTable from './Vessel/VesselTable';

const SectionTable = ({ page, pageData, }) => {
  const isPageVessels = page === '/vessels';
  const isPagePeople = page === '/people';
  const [data, setData] = useState();
  const [titles, setTitles] = useState([]);

  const storeData = () => {
    if (isPageVessels) {
      getData(`${VESSELS_URL}?pagination=false`)
        .then((resp) => setData(resp.vessels));
    }
    if (isPagePeople) {
      getData(`${PEOPLE_URL}?pagination=false`)
        .then((resp) => setData(resp));
    }
  };

  useEffect(() => {
    storeData();
    setTitles(pageData.reportTitles);
  }, [pageData]);

  if ((isPageVessels && !data) || (isPagePeople && !data)) {
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
            {isPageVessels && (
            <VesselTable
              vesselData={data}
              sourceForm="vessels"
              checkboxes="false"
              link="true"
            />
            )}
            {isPagePeople && (
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
                {data.errors === false && data.map((person) => {
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionTable;
