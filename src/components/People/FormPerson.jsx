import React from 'react';
import { Link } from 'react-router-dom';

import FormError from '../Voyage/FormError';
import { nationalities } from '../../utils/staticFormData';

const FormPerson = ({
  handleSubmit, handleChange, formData, errors, personId, source, voyageId,
}) => {
  const documentTypeOther = formData.documentType !== undefined && formData.documentType !== 'Passport' && formData.documentType !== 'IdentityCard';

  return (
    <section>
      <div id="firstName" className={`govuk-form-group ${errors.firstName ? 'govuk-form-group--error' : ''}`}>
        <label className="govuk-label" htmlFor="firstName">
          First name
          <FormError error={errors.firstName} />
          <input
            className="govuk-input"
            name="firstName"
            type="text"
            value={formData.firstName || ''}
            onChange={handleChange}
          />
        </label>
      </div>

      <div id="lastName" className={`govuk-form-group ${errors.lastName ? 'govuk-form-group--error' : ''}`}>
        <label className="govuk-label" htmlFor="lastName">
          Last Name
          <FormError error={errors.lastName} />
          <input
            className="govuk-input"
            name="lastName"
            type="text"
            value={formData.lastName || ''}
            onChange={handleChange}
          />
        </label>
      </div>

      <div id="gender" className={`govuk-form-group ${errors.gender ? 'govuk-form-group--error' : ''}`}>
        <fieldset className="govuk-fieldset">
          <legend className="govuk-fieldset__legend">
            <label className="govuk-fieldset__heading" htmlFor="gender">
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
                checked={formData.gender === 'Female' ? 'checked' : ''}
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
                checked={formData.gender === 'Male' ? 'checked' : ''}
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
                checked={formData.gender === 'Non-binary' ? 'checked' : ''}
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
          <div className="govuk-hint">
            For example, 31 3 1980
          </div>
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
                  value={formData.dateOfBirthDay || ''}
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
                  value={formData.dateOfBirthMonth || ''}
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
                  id="dateOfBirthYear"
                  type="text"
                  maxLength={4}
                  autoComplete="bday-year"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  value={formData.dateOfBirthYear || ''}
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
          <FormError error={errors.placeOfBirth} />
          <input
            className="govuk-input"
            name="placeOfBirth"
            type="text"
            value={formData.placeOfBirth || ''}
            onChange={(handleChange)}
          />
        </label>
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
          value={formData.nationality || 'Please select'}
          onChange={handleChange}
        >
          <option disabled>Please select</option>
          {nationalities.map((nationality) => (
            <option key={nationality.id} value={nationality.value}>{nationality.label}</option>
          ))}
        </select>
      </div>

      <div id="peopleType" className={`govuk-form-group ${errors.peopleType ? 'govuk-form-group--error' : ''}`}>
        <fieldset className="govuk-fieldset" aria-describedby="person-type-hint">
          <legend className="govuk-fieldset__legend">
            <label className="govuk-fieldset__heading" htmlFor="personType">
              Person type
            </label>
          </legend>
          <div id="personType" className="govuk-radios govuk-radios">
            <FormError error={errors.peopleType} />
            <div className="govuk-radios__item">
              <input
                className="govuk-radios__input"
                name="peopleType"
                id="peopleType-1"
                type="radio"
                value="Skipper"
                checked={formData.peopleType === 'Skipper' ? 'checked' : ''}
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
                checked={formData.peopleType === 'Crew' ? 'checked' : ''}
                onChange={handleChange}
              />
              <label className="govuk-label govuk-radios__label" htmlFor="peopleType-2">
                Employed Crew
              </label>
            </div>
            <div className="govuk-radios__item">
              <input
                className="govuk-radios__input"
                name="peopleType"
                id="peopleType-3"
                type="radio"
                value="Passenger"
                checked={formData.peopleType === 'Passenger' ? 'checked' : ''}
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
            <label className="govuk-fieldset__heading" htmlFor="travelDoc">
              Travel document type
            </label>
          </legend>
          <div id="travelDoc" className="govuk-radios govuk-radios govuk-form-group">
            <FormError error={errors.documentType} />
            <div className="govuk-radios__item">
              <input
                className="govuk-radios__input"
                id="documentType-1"
                name="documentType"
                type="radio"
                value="Passport"
                checked={formData.documentType === 'Passport' ? 'checked' : ''}
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
                checked={formData.documentType === 'IdentityCard' ? 'checked' : ''}
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
                value=""
                checked={documentTypeOther ? 'checked' : ''}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <label className="govuk-label govuk-radios__label" htmlFor="documentType-3">
                Other
              </label>
            </div>
          </div>
          {documentTypeOther && (
            <div className="govuk-form-group">
              <label className="govuk-label" htmlFor="documentType-other">
                Please specify
                <input
                  className="govuk-input"
                  name="documentType"
                  type="text"
                  value={documentTypeOther ? formData.documentType : ''}
                  onChange={handleChange}
                />
              </label>
            </div>
          )}
        </fieldset>
      </div>

      <div id="documentNumber" className={`govuk-form-group ${errors.documentNumber ? 'govuk-form-group--error' : ''}`}>
        <label className="govuk-label" htmlFor="documentNumber">
          Document number
          <FormError error={errors.documentNumber} />
          <input
            className="govuk-input"
            name="documentNumber"
            type="text"
            value={formData.documentNumber || ''}
            onChange={handleChange}
          />
        </label>
      </div>

      <div id="documentIssuingState" className={`govuk-form-group ${errors.documentIssuingState ? 'govuk-form-group--error' : ''}`}>
        <label className="govuk-label" htmlFor="documentIssuingState">
          Issuing state
        </label>
        <FormError error={errors.documentIssuingState} />
        <div className="govuk-hint">
          Please enter 3 letter ISO country code, for example GBR
        </div>
        <input
          className="govuk-input govuk-input--width-3"
          name="documentIssuingState"
          type="text"
          maxLength={3}
          value={formData.documentIssuingState || ''}
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
          <div className="govuk-hint">
            For example, 31 3 2022
          </div>
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
                  id="documentExpiryDateDay"
                  type="text"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  maxLength={2}
                  value={formData.documentExpiryDateDay || ''}
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
                  id="documentExpiryDateMonth"
                  type="text"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  maxLength={2}
                  value={formData.documentExpiryDateMonth || ''}
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
                  id="documentExpiryDateYear"
                  type="text"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  maxLength={4}
                  value={formData.documentExpiryDateYear || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </fieldset>
      </div>

      <div id="submitBlock" className="govuk-button-group">
        <button
          type="submit"
          className="govuk-button"
          data-module="govuk-button"
          onClick={(e) => handleSubmit(e, 'newPerson', voyageId)}
        >
          {source === 'voyage' ? 'Add to voyage plan' : 'Add to saved people list'}
        </button>
        {source !== 'voyage' && personId
          && (
            <Link className="govuk-button govuk-button--warning" to={`/people/${personId}/delete`}>
              Delete this person
            </Link>
          )}
      </div>

      <p className="govuk-body">
        {source !== 'voyage'
          && (
            <Link
              to="/people"
              className="govuk-link govuk-link--no-visited-state"
            >
              Exit without saving
            </Link>
          )}
      </p>
    </section>
  );
};

export default FormPerson;
