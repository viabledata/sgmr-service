import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

// App imports
import { USER_URL } from '@constants/ApiConstants';
import Auth from '@lib/Auth';

const DeleteAccount = () => {
  const history = useHistory();
  const [isFormDisabled, setFormDisabled] = useState(false);
  const [error, setError] = useState(null);
  const [deletionConfirmed, setDeletionConfirmed] = useState(false);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setFormDisabled(true);

    if (deletionConfirmed) {
      axios.delete(USER_URL, {
        headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
      })
        .then(() => {
          Auth.logout();
          history.push('/account/delete-confirmation');
        })
        .catch((err) => {
          if (err.response) {
            setError('Cannot delete your account now, try again later');
            setFormDisabled(false);
          }
        });
    } else {
      history.push('/account/edit');
    }
  };

  return (
    <div className="govuk-width-container ">
      <Link to="/account/edit" className="govuk-back-link">Back</Link>

      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" role="main">
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
                      Are you sure you want to delete your account?
                    </h1>
                  </legend>

                  <div id="passport-issued-hint" className="govuk-hint">
                    This action cannot be undone.
                  </div>

                  <div className="govuk-radios">
                    <div className="govuk-radios__item">
                      <input
                        className="govuk-radios__input"
                        id="confirm-yes"
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

export default DeleteAccount;
