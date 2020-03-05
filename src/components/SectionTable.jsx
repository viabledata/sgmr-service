import React, { useState, useEffect } from 'react';
import axios from 'axios';

// currently only works for Vessels due to hard coded data below. Will review when get to people

const SectionTable = ({ page, pageData }) => {
  // temp data to setup page before connecting api
  const fixture = {
    items: [
      {
        id: '05b21e40-cbee-46be-8d61-b24978f32b24',
        name: 'In Deep Ship',
        registration: 'yk65zvb',
        mooring: 'Lisbon',
        vesselType: 'Yacht',
      },
      {
        id: 'c1b33366-306a-44ef-a813-4b2f2ef55b97',
        name: 'boat 1',
        registration: '1234',
        mooring: 'Melbourne',
        vesselType: 'Catamaran',
      },
      {
        id: '362b4422-5988-4d12-9af5-50ce53fc74d3',
        name: 'boat 2',
        registration: '4321',
        mooring: 'Portsea',
        vesselType: 'Yacht',
      },
      {
        id: 'c83a46d9-4692-4abe-bcec-e42b18093856',
        name: 'boat 3',
        registration: '3333',
        mooring: 'Lisbon',
        vesselType: 'Yacht',
      },
      {
        id: '51c5cb42-4b19-4bde-9b09-6e696e4c08d0',
        name: 'boat 4',
        registration: '2222',
        mooring: 'Dover',
        vesselType: 'Yacht',
      },
      {
        id: '599f269f-8695-463d-8a45-fa8e98fb2874',
        name: 'boat 5',
        registration: '534535',
        mooring: 'Monaco',
        vesselType: 'Yacht',
      },
    ],
    _meta: {
      page: 1,
      perPage: 3,
      totalPages: 2,
      totalItems: 6,
    },
    _links: {
      currentPage: '/v1/user/3cc42ec0-54c0-4cfd-9295-ecd818eb38ed/vessels?page=1&per_page=3',
      next: '/v1/user/3cc42ec0-54c0-4cfd-9295-ecd818eb38ed/vessels?page=2&per_page=3',
      prev: null,
    },
    id: '3cc42ec0-54c0-4cfd-9295-ecd818eb38ed',
    email: 'pedro@mail.com',
    firstName: 'Pedro',
    lastName: 'Curado',
  };

  const [vessels, setVessels] = useState();
  const [errors, setErrors] = useState();

  const getVessels = (pageNumber) => {
    // axios.get('x')
    //   .then((response) => {
    //     setVessels(response);
    //   })
    //   .catch((err) => setErrors(err));
    setVessels(fixture);
  };

  useEffect(() => {
    getVessels();
  }, []);


  return (
    <div className="govuk-width-container">
      <div className="govuk-grid-column-full">
        <h2 className="govuk-heading-l">Saved {pageData.pageHeading.toLowerCase()}</h2>


        <table className="govuk-table">
            <thead className="govuk-table__head">
                <tr className="govuk-table__row">
                    <th className="govuk-table__header" scope="col">Vessel name</th>
                    <th className="govuk-table__header" scope="col">Vessel type</th>
                    <th className="govuk-table__header" scope="col">Usual moorings</th>
                </tr>
            </thead>
            <tbody className="govuk-table__body">

              {fixture.items.map((elem, i) => {
                return (
                  <tr className="govuk-table__row" key={i}>
                    <td className="govuk-table__cell" scope="row">
                      <a href={`${elem.name}`} className="govuk-link" title={`Edit details for ${elem.name}`}>{elem.name}</a>
                    </td>
                    <td className="govuk-table__cell">{elem.vesselType}</td>
                    <td className="govuk-table__cell">{elem.mooring}</td>
                  </tr>
                );
              })}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default SectionTable;
