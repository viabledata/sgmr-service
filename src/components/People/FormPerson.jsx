import React from 'react';
import { Link } from 'react-router-dom';


const FormPerson = ({
  handleSubmit, handleChange, data, formData, errors, clearLocalStorage, source, voyageId,
}) => {
  return (
    <section>
      <div id="firstName" className={`govuk-form-group ${errors.firstName ? 'govuk-form-group--error' : ''}`}>
        <label className="govuk-label" htmlFor="firstName">
          Given name
        </label>
        {errors.firstName
          && (
          <span className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span>
            {errors.firstName}
          </span>
          )}
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
          Surname
        </label>
        {errors.lastName
          && (
          <span className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span>
            {errors.lastName}
          </span>
          )}
        <input
          className="govuk-input"
          name="lastName"
          type="text"
          value={formData.lastName || data.lastName || ''}
          onChange={handleChange}
        />
      </div>

      <div id="gender" className={`govuk-form-group ${errors.gender ? 'govuk-form-group--error' : ''}`}>
        <label className="govuk-label" htmlFor="gender">
          Gender
        </label>
        {errors.gender
          && (
          <span className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span>
            {errors.gender}
          </span>
          )}
        <select
          className="govuk-select"
          name="gender"
          type="text"
          value={formData.gender || data.gender || 'Please select'}
          onChange={handleChange}
        >
          <option disabled>Please select</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="unspecified">Unspecified</option>
        </select>
      </div>

      <div id="dateOfBirth" className={`govuk-form-group ${errors.dateOfBirth ? 'govuk-form-group--error' : ''}`}>
        <fieldset className="govuk-fieldset" role="group" aria-describedby="dob-hint">
          <legend className="govuk-fieldset__legend">
            <label className="govuk-label" htmlFor="dateOfBirth">
              What is your date of birth?
            </label>
            {errors.dateOfBirth
              && (
              <span className="govuk-error-message">
                <span className="govuk-visually-hidden">Error:</span>
                {errors.dateOfBirth}
              </span>
              )}
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
        {errors.placeOfBirth
          && (
          <span className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span>
            {errors.placeOfBirth}
          </span>
          )}
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
        {errors.nationality
          && (
          <span className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span>
            {errors.nationality}
          </span>
          )}
        <select
          className="govuk-select"
          name="nationality"
          type="text"
          value={formData.nationality || data.nationality || 'Please select'}
          onChange={handleChange}
        >
          <option disabled>Please select</option>
          <option value="GBP">United Kingdom</option>
          <option value="AUS">Australia</option>
          <option value="USA">United States</option>
        </select>
      </div>

      <div id="peopleType" className={`govuk-form-group ${errors.peopleType ? 'govuk-form-group--error' : ''}`}>
        <fieldset className="govuk-fieldset" aria-describedby="person-type-hint">
          <legend className="govuk-fieldset__legend">
            <label className="govuk-fieldset__heading">
              Person type
            </label>
          </legend>
          <span className="govuk-hint">
            For example Skipper, Crew
          </span>
          <div className="govuk-radios govuk-radios">
            {errors.peopleType
            && (
            <span className="govuk-error-message">
              <span className="govuk-visually-hidden">Error:</span>
              {' '}
              {errors.peopleType}
            </span>
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
                Crew
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
            {errors.documentType
              && (
              <span className="govuk-error-message">
                <span className="govuk-visually-hidden">Error:</span>
                {' '}
                {errors.documentType}
              </span>
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
        {errors.documentNumber
          && (
          <span className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span>
            {' '}
            {errors.documentNumber}
          </span>
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
        {errors.documentIssuingState
            && (
            <span className="govuk-error-message">
              <span className="govuk-visually-hidden">Error:</span>
              {' '}
              {errors.documentIssuingState}
            </span>
            )}
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
            {errors.documentExpiryDate
              && (
              <span className="govuk-error-message">
                <span className="govuk-visually-hidden">Error:</span>
                {' '}
                {errors.documentExpiryDate}
              </span>
              )}
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
