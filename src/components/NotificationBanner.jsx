import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AlertContext } from './AlertContext';

const NotificationBanner = () => {
  const { alertContext, setAlertContext } = useContext(AlertContext);
  const history = useHistory();

  useEffect(() => {
    return history.listen(() => {
      setAlertContext(null);
    });
  }, [history]);

  if (!alertContext) return null;
  const { title, heading } = alertContext;
  return (
    <div
      className="govuk-notification-banner govuk-notification-banner--success"
      role="alert"
      aria-labelledby="govuk-notification-banner-title"
    >
      <div className="govuk-notification-banner__header">
        <h2 className="govuk-notification-banner__title">{title}</h2>
      </div>
      <div className="govuk-notification-banner__content">
        <h3 className="govuk-notification-banner__heading">{heading}</h3>
      </div>
    </div>
  );
};

export default NotificationBanner;
