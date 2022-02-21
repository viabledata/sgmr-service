import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
import { PEOPLE_PAGE_URL } from '../../constants/ClientConstants';

/*
  how to handle user clicking back button in browser from page 2
  need to add page to url or hash page in url so they can go 'back' to page 1
*/

const PersonForm = ({ type, source }) => {
  const history = useHistory();
  const location = useLocation();
  const locationState = location.state;
  const locationPath = location.pathname;
  const [errors, setErrors] = useState();
  const [formData, setFormData] = useState(JSON.parse(sessionStorage.getItem('formData')) || {});
  const [formPage, setFormPage] = useState(1);
  const [title, setTitle] = useState();
  const [submittedNextPage, setSubmittedNextPage] = useState();

  document.title = type === 'edit' ? 'Edit person' : 'Save person';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const goToNextPage = (e) => {
    e.preventDefault();
    setFormPage(formPage + 1);
    history.push(`/people/${type || 'save'}-person/page-${formPage + 1}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(submittedNextPage);
  };

  useEffect(() => {
    setFormPage(parseInt(locationPath.split('page-').pop(), 10));
  }, [locationPath]);

  useEffect(() => {
    if (locationState?.source === 'edit') { source = 'edit'; }
    switch (source) {
      case 'onboarding':
        setTitle('Add details of a person you frequently sail with');
        break;
      case 'voyage':
        setTitle('Add details of the person you are sailing with');
        break;
      case 'edit':
        setTitle('Update details of the person you sail with');
        setSubmittedNextPage(PEOPLE_PAGE_URL);
        break;
      default:
        setTitle('Add details of the person you frequently sail with');
        setSubmittedNextPage(PEOPLE_PAGE_URL);
    }
  }, [source]);

  useEffect(() => {
    sessionStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  return (
    <div className="govuk-width-container ">
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <div className="govuk-width-container ">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">

              {formPage === 1
                && (
                <>
                  <h1 className="govuk-heading-l">{title}</h1>
                  <div id="firstName" className="govuk-form-group">
                    <label className="govuk-label" htmlFor="firstNameInput">
                      Given name(s)
                    </label>
                    <div id="firstName-hint" className="govuk-hint">The person&apos;s first and middle names</div>
                    <input
                      id="firstNameInput"
                      className="govuk-input"
                      name="firstName"
                      type="text"
                      value={formData?.firstName || ''}
                      onChange={(e) => { handleChange(e); }}
                    />
                  </div>
                  <div id="lastName" className="govuk-form-group">
                    <label className="govuk-label" htmlFor="lastNameInput">
                      Surname
                    </label>
                    <div id="lastName-hint" className="govuk-hint">If the person has more than one surname, enter them all</div>
                    <input
                      id="lastNameInput"
                      className="govuk-input"
                      name="lastName"
                      type="text"
                      value={formData?.lastName || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div id="dateOfBirth" className="govuk-form-group">
                    <label className="govuk-label" htmlFor="dateOfBirthDay">
                      Date of birth
                    </label>
                    <div id="lastName-hint" className="govuk-hint">Enter this as shown on your passport, for example, 31 03 1980</div>
                    <div className="govuk-date-input">
                      <div className="govuk-date-input__item">
                        <div className="govuk-form-group">
                          <label className="govuk-label govuk-date-input__label" htmlFor="dateOfBirthDay">
                            Day
                          </label>
                          <input
                            className="govuk-input govuk-date-input__input govuk-input--width-2"
                            name="dateOfBirthDay"
                            id="dateOfBirthDay"
                            type="text"
                            maxLength={2}
                            autoComplete="bday-day"
                            pattern="[0-9]*"
                            inputMode="numeric"
                            value={formData?.dateOfBirthDay || ''}
                            onChange={(handleChange)}
                          />
                        </div>
                      </div>
                      <div className="govuk-date-input__item">
                        <div className="govuk-form-group">
                          <label className="govuk-label govuk-date-input__label" htmlFor="dateOfBirthMonth">
                            Month
                          </label>
                          <input
                            className="govuk-input govuk-date-input__input govuk-input--width-2"
                            name="dateOfBirthMonth"
                            id="dateOfBirthMonth"
                            type="text"
                            maxLength={2}
                            autoComplete="bday-month"
                            pattern="[0-9]*"
                            inputMode="numeric"
                            value={formData?.dateOfBirthMonth || ''}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="govuk-date-input__item">
                        <div className="govuk-form-group">
                          <label className="govuk-label" htmlFor="dateOfBirthYear">
                            Year
                          </label>
                          <input
                            className="govuk-input govuk-date-input__input govuk-input--width-4"
                            name="dateOfBirthYear"
                            id="dateOfBirthYear"
                            type="text"
                            maxLength={4}
                            autoComplete="bday-year"
                            pattern="[0-9]*"
                            inputMode="numeric"
                            value={formData?.dateOfBirthYear || ''}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="govuk-button-group">
                    <button
                      type="button"
                      className="govuk-button"
                      data-module="govuk-button"
                      onClick={(e) => { goToNextPage(e); }}
                    >
                      Continue
                    </button>
                  </div>
                </>
                )}

              {formPage === 2
              && (
                <>
                  <h1>Travel document details</h1>
                  <div className="govuk-button-group">
                    <button
                      type="button"
                      className="govuk-button"
                      data-module="govuk-button"
                      onClick={(e) => { handleSubmit(e); }}
                    >
                      Continue
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default withRouter(PersonForm);
