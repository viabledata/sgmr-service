import React from 'react';
import { Link } from 'react-router-dom';

// App imports
import nationalities from '@utils/staticFormData';
import FormError from '@components/Voyage/FormError';

const FormPerson = ({
  handleSubmit, handleChange, data, formData, errors, clearLocalStorage, source, voyageId,
}) => {

  return (
    <section>
      <div id="firstName" className={`govuk-form-group ${errors.firstName ? 'govuk-form-group--error' : ''}`}>
        <label className="govuk-label" htmlFor="firstName">
          First name
        </label>
        <FormError error={errors.firstName} />
        <input
          className="govuk-input"
          name="firstName"
          type="text"
          value={formData.firstName || data.firstName || ''}
          onChange={handleChange}
        />
      </div>

      <div id="lastName" className={`govuk-form-group ${errors.lastName ? 'govuk-form-group--error' : ''}`}>
        <label className="govuk-label" htmlFor="lastName">
          Last Name
        </label>
        <FormError error={errors.lastName} />
        <input
          className="govuk-input"
          name="lastName"
          type="text"
          value={formData.lastName || data.lastName || ''}
          onChange={handleChange}
        />
      </div>

      <div id="gender" className={`govuk-form-group ${errors.gender ? 'govuk-form-group--error' : ''}`}>
      <fieldset className="govuk-fieldset" aria-describedby="gender-hint">
        <legend className="govuk-fieldset__legend">
          <label className="govuk-fieldset__heading">
            Gender
          </label>
        </legend>
        <div className="govuk-radios govuk-radios">
          <FormError error={errors.gender} />
          <div className="govuk-radios__item">
            <input
              className="govuk-radios__input"
              name="gender"
              id="female"
              type="radio"
              value="Female"
              checked={(formData.gender === 'Female' || data.gender === 'Female') ? 'checked' : ''}
              onChange={handleChange}
            />
            <label className="govuk-label govuk-radios__label" htmlFor="female">
              Female
            </label>
          </div>
          <div className="govuk-radios__item">
            <input
              className="govuk-radios__input"
              name="gender"
              id="male"
              type="radio"
              value="Male"
              checked={(formData.gender === 'Male' || data.gender === 'Male') ? 'checked' : ''}
              onChange={handleChange}
            />
            <label className="govuk-label govuk-radios__label" htmlFor="male">
              Male
            </label>
          </div>
          <div className="govuk-radios__item">
            <input
              className="govuk-radios__input"
              name="gender"
              id="non-binary"
              type="radio"
              value="Non-binary"
              checked={(formData.gender === 'Non-binary' || data.gender === 'Non-binary') ? 'checked' : ''}
              onChange={handleChange}
            />
            <label className="govuk-label govuk-radios__label" htmlFor="non-binary">
              Non-binary
            </label>
          </div>
        </div>
      </fieldset>
      </div>

      <div id="dateOfBirth" className={`govuk-form-group ${errors.dateOfBirth ? 'govuk-form-group--error' : ''}`}>
        <fieldset className="govuk-fieldset" role="group" aria-describedby="dob-hint">
          <legend className="govuk-fieldset__legend">
            <label className="govuk-label" htmlFor="dateOfBirth">
              Date of Birth
            </label>
            <FormError error={errors.dateOfBirth} />
          </legend>
          <span className="govuk-hint">
            For example, 31 3 1980
          </span>
          <div className="govuk-date-input">
            <div className="govuk-date-input__item">
              <div className="govuk-form-group">
                <label className="govuk-label govuk-date-input__label" htmlFor="dateOfBirthDay">
                  Day
                </label>
                <input
                  className="govuk-input govuk-date-input__input govuk-input--width-2"
                  name="dateOfBirthDay"
                  type="text"
                  maxLength={2}
                  autoComplete="bday-day"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  value={formData.dateOfBirthDay || data.dateOfBirthDay || ''}
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
                  type="text"
                  maxLength={2}
                  autoComplete="bday-month"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  value={formData.dateOfBirthMonth || data.dateOfBirthMonth || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="govuk-date-input__item">
              <div className="govuk-form-group">
                <label className="govuk-label govuk-date-input__label" htmlFor="dateOfBirthYear">
                  Year
                </label>
                <input
                  className="govuk-input govuk-date-input__input govuk-input--width-4"
                  name="dateOfBirthYear"
                  type="text"
                  maxLength={4}
                  autoComplete="bday-year"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  value={formData.dateOfBirthYear || data.dateOfBirthYear || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </fieldset>
      </div>

      <div id="placeOfBirth" className={`govuk-form-group ${errors.placeOfBirth ? 'govuk-form-group--error' : ''}`}>
        <label className="govuk-label" htmlFor="placeOfBirth">
          Place of birth
        </label>
        <FormError error={errors.placeOfBirth} />
        <input
          className="govuk-input"
          name="placeOfBirth"
          type="text"
          value={formData.placeOfBirth || data.placeOfBirth || ''}
          onChange={(handleChange)}
        />
      </div>

      <div id="nationality" className={`govuk-form-group ${errors.nationality ? 'govuk-form-group--error' : ''}`}>
        <label className="govuk-label" htmlFor="nationality">
          Nationality
        </label>
        <FormError error={errors.nationality} />
        <select
          className="govuk-select"
          name="nationality"
          type="text"
          value={formData.nationality || data.nationality || 'Please select'}
          onChange={handleChange}
        >
          <option disabled>Please select</option>
          {nationalities.map((nationality, index) => (
              <option key={index} value={nationality.value}>{nationality.label}</option>
          ))}
        </select>
      </div>

      <div id="peopleType" className={`govuk-form-group ${errors.peopleType ? 'govuk-form-group--error' : ''}`}>
        <fieldset className="govuk-fieldset" aria-describedby="person-type-hint">
          <legend className="govuk-fieldset__legend">
            <label className="govuk-fieldset__heading">
              Person type
            </label>
          </legend>
          <div className="govuk-radios govuk-radios">
            <FormError error={errors.peopleType} />
            )}
            <div className="govuk-radios__item">
              <input
                className="govuk-radios__input"
                name="peopleType"
                id="peopleType-1"
                type="radio"
                value="Skipper"
                checked={(formData.peopleType === 'Skipper' || (data.peopleType && data.peopleType.name === 'Skipper')) ? 'checked' : ''}
                onChange={handleChange}
              />
              <label className="govuk-label govuk-radios__label" htmlFor="peopleType-1">
                Skipper
              </label>
            </div>
            <div className="govuk-radios__item">
              <input
                className="govuk-radios__input"
                name="peopleType"
                id="peopleType-2"
                type="radio"
                value="Crew"
                checked={(formData.peopleType === 'Crew' || (data.peopleType && data.peopleType.name === 'Crew')) ? 'checked' : ''}
                onChange={handleChange}
              />
              <label className="govuk-label govuk-radios__label" htmlFor="peopleType-2">
                Paid Crew
              </label>
            </div>
            <div className="govuk-radios__item">
              <input
                className="govuk-radios__input"
                name="peopleType"
                id="peopleType-3"
                type="radio"
                value="Passenger"
                checked={(formData.peopleType === 'Passenger' || (data.peopleType && data.peopleType.name === 'Passenger')) ? 'checked' : ''}
                onChange={handleChange}
              />
              <label className="govuk-label govuk-radios__label" htmlFor="peopleType-3">
                Unpaid Crew
              </label>
            </div>
          </div>
        </fieldset>
      </div>

      <h2 className="govuk-heading-l">Travel document details</h2>
      <div id="documentType" className={`govuk-form-group ${errors.documentType ? 'govuk-form-group--error' : ''}`}>
        <fieldset className="govuk-fieldset" aria-describedby="travel-document-type-hint">
          <legend className="govuk-fieldset__legend">
            <label className="govuk-fieldset__heading">
              Travel document type
            </label>
          </legend>
          <div className="govuk-radios govuk-radios govuk-form-group">
            <FormError error={errors.documentType} />
              )}
            <div className="govuk-radios__item">
              <input
                className="govuk-radios__input"
                id="documentType-1"
                name="documentType"
                type="radio"
                value="Passport"
                checked={(formData.documentType === 'Passport' || data.documentType === 'Passport') ? 'checked' : ''}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <label className="govuk-label govuk-radios__label" htmlFor="documentType-1">
                Passport
              </label>
            </div>
            <div className="govuk-radios__item">
              <input
                className="govuk-radios__input"
                id="documentType-2"
                name="documentType"
                type="radio"
                value="IdentityCard"
                checked={(formData.documentType === 'IdentityCard' || data.documentType === 'IdentityCard') ? 'checked' : ''}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <label className="govuk-label govuk-radios__label" htmlFor="documentType-2">
                Identity card
              </label>
            </div>
            <div className="govuk-radios__item">
              <input
                className="govuk-radios__input"
                id="documentType-3"
                name="documentType"
                type="radio"
                value="Other"
                checked={(formData.documentType === 'Other' || data.documentType === 'Other') ? 'checked' : ''}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <label className="govuk-label govuk-radios__label" htmlFor="documentType-3">
                Other
              </label>
            </div>
          </div>
          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="documentType-other">
              If &quot;Other&quot;, please specify
            </label>
            <input
              className="govuk-input"
              name="documentType"
              type="text"
              onChange={handleChange}
            />
          </div>
        </fieldset>
      </div>

      <div id="documentNumber" className={`govuk-form-group ${errors.documentNumber ? 'govuk-form-group--error' : ''}`}>
        <label className="govuk-label" htmlFor="documentNumber">
          Document number
        </label>
        <FormError error={errors.documentNumber} />
          )}
        <input
          className="govuk-input"
          name="documentNumber"
          type="text"
          value={formData.documentNumber || data.documentNumber || ''}
          onChange={handleChange}
        />
      </div>

      <div id="documentIssuingState" className={`govuk-form-group ${errors.documentIssuingState ? 'govuk-form-group--error' : ''}`}>
        <label className="govuk-label" htmlFor="documentIssuingState">
          Issuing state
        </label>
        <span className="govuk-hint">
          Please enter 3 letter ISO country code, for example GBR
        </span>
        <FormError error={errors.documentIssuingState} />
        <input
          className="govuk-input govuk-input--width-3"
          name="documentIssuingState"
          type="text"
          maxLength={3}
          value={formData.documentIssuingState || data.documentIssuingState || ''}
          onChange={handleChange}
        />
      </div>

      <div id="documentExpiryDate" className={`govuk-form-group ${errors.documentExpiryDate ? 'govuk-form-group--error' : ''}`}>
        <fieldset className="govuk-fieldset" role="group" aria-describedby="documentExpiryDate-hint">
          <legend className="govuk-fieldset__legend">
            <label className="govuk-label" htmlFor="documentExpiryDate">
              Expiry date
            </label>
          </legend>
          <span className="govuk-hint">
            For example, 31 3 2022
          </span>
          <div className="govuk-date-input">
            <FormError error={errors.documentExpiryDate} />
            <div className="govuk-date-input__item">
              <div className="govuk-form-group">
                <label className="govuk-label govuk-date-input__label" htmlFor="documentExpiryDateDay">
                  Day
                </label>
                <input
                  className="govuk-input govuk-date-input__input govuk-input--width-2"
                  name="documentExpiryDateDay"
                  type="text"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  maxLength={2}
                  value={formData.documentExpiryDateDay || data.documentExpiryDateDay || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="govuk-date-input__item">
              <div className="govuk-form-group">
                <label className="govuk-label govuk-date-input__label" htmlFor="documentExpiryDateMonth">
                  Month
                </label>
                <input
                  className="govuk-input govuk-date-input__input govuk-input--width-2"
                  name="documentExpiryDateMonth"
                  type="text"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  maxLength={2}
                  value={formData.documentExpiryDateMonth || data.documentExpiryDateMonth || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="govuk-date-input__item">
              <div className="govuk-form-group">
                <label className="govuk-label govuk-date-input__label" htmlFor="documentExpiryDateYear">
                  Year
                </label>
                <input
                  className="govuk-input govuk-date-input__input govuk-input--width-4"
                  name="documentExpiryDateYear"
                  type="text"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  maxLength={4}
                  value={formData.documentExpiryDateYear || data.documentExpiryDateYear || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </fieldset>
      </div>

      <div id="submitBlock">
        <button
          type="submit"
          className="govuk-button"
          data-module="govuk-button"
          onClick={(e) => handleSubmit(e, 'newPerson', voyageId)}
        >
          {source === 'voyage' ? 'Add to manifest' : 'Add to saved people list'}
        </button>
      </div>

      <p>
        {source !== 'voyage'
          && (
          <Link
            to="/people"
            className="govuk-link govuk-link--no-visited-state"
            onClick={(e) => clearLocalStorage(e)}
          >
            Exit without saving
          </Link>
          )}
      </p>
    </section>
  );
};

export default FormPerson;
