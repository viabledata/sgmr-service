import React, { useEffect, useState } from 'react';

import FormFieldError from '../../components-v2/FormFieldError';

const PersonForm = ({ source }) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState();
  const [title, setTitle] = useState();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    switch (source) {
      case 'onboarding':
        setTitle('Add details of a person you frequently sail with');
        break;
      case 'voyage':
        setTitle('Add details of the person you are sailing with');
        break;
      case 'edit':
        setTitle('Update details of the person you sail with');
        break;
      default:
        setTitle('Add details of the person you frequently sail with');
    }
  }, [source]);

  return (
    <div className="govuk-width-container ">
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <div className="govuk-width-container ">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <h1 className="govuk-heading-l">{title}</h1>
              <div id="firstName" className={`govuk-form-group ${errors.firstName ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label" htmlFor="firstNameInput">
                  Given name(s)
                </label>
                <div id="firstName-hint" className="govuk-hint">The person&apos;s first and middle names</div>
                <FormFieldError error={errors.firstName} />
                <input
                  id="firstNameInput"
                  className="govuk-input"
                  name="firstName"
                  type="text"
                  value={formData?.firstName || ''}
                  onChange={(e) => { handleChange(e); }}
                />
              </div>
              <div id="lastName" className={`govuk-form-group ${errors.lastName ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label" htmlFor="lastNameInput">
                  Surname
                </label>
                <div id="lastName-hint" className="govuk-hint">If the person has more than one surname, enter them all</div>
                <FormFieldError error={errors.lastName} />
                <input
                  id="lastNameInput"
                  className="govuk-input"
                  name="lastName"
                  type="text"
                  value={formData?.lastName || ''}
                  onChange={handleChange}
                />
              </div>
              <div id="dateOfBirth" className={`govuk-form-group ${errors.dateOfBirth ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label" htmlFor="dateOfBirthDay">
                  Date of birth
                </label>
                <div id="dateOfBirth-hint" className="govuk-hint">Enter this as shown on your passport, for example, 31 03 1980</div>
                <FormFieldError error={errors.dateOfBirth} />
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
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default PersonForm;
