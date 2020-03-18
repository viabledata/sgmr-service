import React, { useState, useEffect } from 'react';
import axios from 'axios';

// App imports
import { apiPath } from 'config';
import Auth from 'Auth';

const PageAccount = () => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const getData = () => {
    axios.get(`${apiPath}/user`, {
      headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
    })
      .then((resp) => {
        setData(resp.data);
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
    getData();
  }, []);

  return (
    <div>
      <dl className="govuk-summary-list govuk-!-margin-bottom-9">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            Given name
          </dt>
          <dd className="govuk-summary-list__value">
            {data.firstName}
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            Surname
          </dt>
          <dd className="govuk-summary-list__value">
            {data.lastName}
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            Email
          </dt>
          <dd className="govuk-summary-list__value">
            {data.email}
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            Mobile number
          </dt>
          <dd className="govuk-summary-list__value">
            {data.mobileNumber}
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default PageAccount;
