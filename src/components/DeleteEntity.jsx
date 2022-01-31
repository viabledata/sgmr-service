import React, { useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

// App imports
import Auth from '../lib/Auth';
import { AlertContext } from './AlertContext';

const DeleteEntity = ({ notification }) => {
  const { setAlertContext } = useContext(AlertContext);
  const history = useHistory();
  const { entityId } = useParams();
  const [isFormDisabled, setFormDisabled] = useState(false);
  const [error, setError] = useState(null);
  const [deletionConfirmed, setDeletionConfirmed] = useState(false);
  const {
    title, heading, entity, baseURL, redirectURL,
  } = notification;
  
  document.title = `Delete ${entity}`;

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setFormDisabled(true);
    try {
      if (deletionConfirmed) {
        await axios.delete(`${baseURL}/${entityId}`, {
          headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
        });
        history.replace(redirectURL);
        setAlertContext({
          heading,
          title,
        });
      } else {
        history.replace(redirectURL);
      }
    } catch (err) {
      if (err.response) {
        setError(`Cannot delete this ${entity} right now, try again later`);
        setFormDisabled(false);
      }
    }
  };

  return (
    <div className="govuk-width-container ">
      <a href="#back" className="govuk-back-link" onClick={(e) => { e.preventDefault(); history.goBack(); }}>Back</a>

      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            {error && (
              <div className="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabIndex="-1" data-module="govuk-error-summary">
                <h2 className="govuk-error-summary__title">
                  {error}
                </h2>
              </div>
            )}

            <form onSubmit={formSubmitHandler}>
              <div className="govuk-form-group">
                <fieldset className="govuk-fieldset">
                  <legend
                    className="govuk-fieldset__legend govuk-fieldset__legend--l"
                  >
                    <h1 className="govuk-fieldset__heading">
                      {`Are you sure you want to delete this ${entity}?`}
                    </h1>
                  </legend>

                  <div className="govuk-hint">
                    This action cannot be undone.
                  </div>

                  <div className="govuk-radios">
                    <div className="govuk-radios__item">
                      <input
                        className="govuk-radios__input"
                        id="confirm-yes"
                        data-testid="confirm-yes"
                        name="confirm_deletion"
                        type="radio"
                        value="yes"
                        onChange={() => setDeletionConfirmed(true)}
                      />
                      <label
                        className="govuk-label govuk-radios__label"
                        htmlFor="confirm-yes"
                      >
                        Yes
                      </label>
                    </div>
                    <div className="govuk-radios__item">
                      <input
                        className="govuk-radios__input"
                        id="confirm-no"
                        name="confirm_deletion"
                        type="radio"
                        value="no"
                        onChange={() => setDeletionConfirmed(false)}
                      />
                      <label
                        className="govuk-label govuk-radios__label"
                        htmlFor="confirm-no"
                      >
                        No
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>

              <button disabled={isFormDisabled} type="submit" className="govuk-button" data-module="govuk-button">
                Continue
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DeleteEntity;
