import React, { useState, useEffect } from 'react';


const FormPeople = () => {
  const [formData, setFormData] = useState(JSON.parse(localStorage.getItem('formData')) || {});
  const [errors, setErrors] = useState(JSON.parse(localStorage.getItem('errors')) || { title: null });

  // Update form info to state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle errors [for empty fields]
  const removeError = (fieldName) => {
    const tempArr = { ...errors };
    const key = fieldName;
    delete tempArr[key];
    setErrors(tempArr);
  };
  const handleErrors = (e, errorText, groupField) => {
    console.log(groupField)
    // If field value is empty, add error : if field has value, removeError
    const name = !groupField ? e.target.name : groupField;
    !e.target.value ? setErrors({ ...errors, [name]: errorText }) : removeError(name);
  };

  // Clear formData from localStorage
  // As localStorage updates whenever there is a change to the value of formData or errors, it clears the field data as part of the set function
  const clearFormData = (e) => {
    setFormData({});
    setErrors({ title: null });
  };

  // Handle Submit, including clearing localStorage
  const handleSubmit = (e) => {
    // Combine date fields into required format before submit
    e.preventDefault();
    clearFormData();
  };

  // Update localStorage to hold page data
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('errors', JSON.stringify(errors));
  }, [errors]);

  console.log(formData.travelDocumentType)


  return (
    <div className="govuk-width-container ">
      <div className="govuk-breadcrumbs">
        <ol className="govuk-breadcrumbs__list">
          <li className="govuk-breadcrumbs__list-item">
            <a className="govuk-breadcrumbs__link" href="/people">People</a>
          </li>
          <li className="govuk-breadcrumbs__list-item" aria-current="page">Save a person</li>
        </ol>
      </div>
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-xl">Save a person</h1>
            <p className="govuk-body-l">Provide the details of the person you want to add to your list of saved people.</p>
            <form>

              {Object.keys(errors).length > 1 && (
                <div className="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabIndex="-1" data-module="govuk-error-summary">
                  <h2 className="govuk-error-summary__title" >
                    There is a problem
                  </h2>
                  <div className="govuk-error-summary__body">
                    <ul className="govuk-list govuk-error-summary__list">
                      {Object.entries(errors).map((elem, i) => (
                        <li key={i}>
                          {elem[0] !== 'title'
                              && <a href={`#${elem[0]}`}>{elem[1]}</a>}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div id="givenName" className={`govuk-form-group ${errors.givenName ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label  govuk-label--m" htmlFor="givenName">
                  Given name
                </label>
                {errors.givenName && (
                    <span className="govuk-error-message">
                      <span className="govuk-visually-hidden">Error:</span> {errors.givenName}
                    </span>
                )}
                <input
                  className={`govuk-input ${errors.givenName ? 'govuk-input--error' : ''}`}
                  name="givenName"
                  type="text"
                  value={formData.givenName || ''}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleErrors(e, 'You must enter a given name')}
                  onKeyPress={(e) => handleErrors(e)}
                />
              </div>

              <div id="surname" className={`govuk-form-group ${errors.surname ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label  govuk-label--m" htmlFor="surname">
                  Surname
                </label>
                {errors.surname && (
                    <span className="govuk-error-message">
                      <span className="govuk-visually-hidden">Error:</span> {errors.surname}
                    </span>
                )}
                <input
                  className={`govuk-input ${errors.surname ? 'govuk-input--error' : ''}`}
                  name="surname"
                  type="text"
                  value={formData.surname || ''}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleErrors(e, 'You must enter a surname')}
                  onKeyPress={(e) => handleErrors(e)}
                />
              </div>

              <div id="gender" className={`govuk-form-group ${errors.gender ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label  govuk-label--m" htmlFor="gender">
                  Gender
                </label>
                {errors.gender && (
                    <span className="govuk-error-message">
                      <span className="govuk-visually-hidden">Error:</span> {errors.gender}
                    </span>
                )}
                <select
                  className={`govuk-select ${errors.gender ? 'govuk-input--error' : ''}`}
                  name="gender"
                  type="text"
                  value={formData.gender || 'Please select'}
                  onChange={(e) => handleChange(e)}
                  onKeyPress={(e) => handleErrors(e)}
                >
                  <option disabled>Please select</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="unspecified">Unspecified</option>
                </select>
              </div>

              <div id="dateOfBirth" className={`govuk-form-group ${errors.dateOfBirth ? 'govuk-form-group--error' : ''}`}>
                <fieldset className="govuk-fieldset" role="group" aria-describedby="dob-hint">
                  <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
                    <label className="govuk-label govuk-label--m" htmlFor="dateOfBirth">
                      What is your date of birth?
                    </label>
                    {errors.dateOfBirth && (
                        <span className="govuk-error-message">
                          <span className="govuk-visually-hidden">Error:</span> {errors.dateOfBirth}
                        </span>
                    )}
                  </legend>
                  <span className="govuk-hint">
                    For example, 31 3 1980
                  </span>
                  <div className="govuk-date-input" >
                    <div className="govuk-date-input__item">
                      <div className="govuk-form-group">
                        <label className="govuk-label govuk-date-input__label" htmlFor="dobDay">
                          Day
                        </label>
                        <input
                          className={`govuk-input govuk-date-input__input govuk-input--width-2 ${errors.dateOfBirth ? 'govuk-input--error' : ''}`}
                          name="dobDay"
                          type="text"
                          maxLength="2"
                          autoComplete="bday-day"
                          pattern="[0-9]*"
                          inputMode="numeric"
                          value={formData.dobDay || ''}
                          onChange={(e) => handleChange(e)}
                          onBlur={(e) => handleErrors(e, 'You must enter the date of birth', 'dateOfBirth')}
                          onKeyPress={(e) => handleErrors(e)}
                        />
                      </div>
                    </div>
                    <div className="govuk-date-input__item">
                      <div className="govuk-form-group">
                        <label className="govuk-label govuk-date-input__label" htmlFor="dobMonth">
                          Month
                        </label>
                        <input
                          className={`govuk-input govuk-date-input__input govuk-input--width-2 ${errors.dateOfBirth ? 'govuk-input--error' : ''}`}
                          name="dobMonth"
                          type="text"
                          maxLength="2"
                          autoComplete="bday-month"
                          pattern="[0-9]*"
                          inputMode="numeric"
                          value={formData.dobMonth || ''}
                          onChange={(e) => handleChange(e)}
                          onBlur={(e) => handleErrors(e, 'You must enter the date of birth', 'dateOfBirth')}
                          onKeyPress={(e) => handleErrors(e)}
                      />
                      </div>
                    </div>
                    <div className="govuk-date-input__item">
                      <div className="govuk-form-group">
                        <label className="govuk-label govuk-date-input__label" htmlFor="dobYear">
                          Year
                        </label>
                        <input
                          className={`govuk-input govuk-date-input__input govuk-input--width-4 ${errors.dateOfBirth ? 'govuk-input--error' : ''}`}
                          name="dobYear"
                          type="text"
                          maxLength="4"
                          autoComplete="bday-year"
                          pattern="[0-9]*"
                          inputMode="numeric"
                          value={formData.dobYear || ''}
                          onChange={(e) => handleChange(e)}
                          onBlur={(e) => handleErrors(e, 'You must enter the date of birth', 'dateOfBirth')}
                          onKeyPress={(e) => handleErrors(e)}
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div id="placeOfBirth" className={`govuk-form-group ${errors.placeOfBirth ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label  govuk-label--m" htmlFor="placeOfBirth">
                  Place of birth
                </label>
                {errors.placeOfBirth && (
                    <span className="govuk-error-message">
                      <span className="govuk-visually-hidden">Error:</span> {errors.placeOfBirth}
                    </span>
                )}
                <input
                  className={`govuk-input ${errors.placeOfBirth ? 'govuk-input--error' : ''}`}
                  name="placeOfBirth"
                  type="text"
                  value={formData.placeOfBirth || ''}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleErrors(e, 'You must enter a place of birth')}
                  onKeyPress={(e) => handleErrors(e)}
                />
              </div>

              <div id="nationality" className={`govuk-form-group ${errors.nationality ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label  govuk-label--m" htmlFor="nationality">
                  Nationality
                </label>
                {errors.nationality && (
                    <span className="govuk-error-message">
                      <span className="govuk-visually-hidden">Error:</span> {errors.nationality}
                    </span>
                )}
                <select
                  className={`govuk-select ${errors.nationality ? 'govuk-input--error' : ''}`}
                  name="nationality"
                  type="text"
                  value={formData.nationality || 'Please select'}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleErrors(e, 'You must select a nationality')}
                  onKeyPress={(e) => handleErrors(e)}
                >
                  <option disabled>Please select</option>
                  <option>Afghan</option>
                  <option>Albanian</option>
                  <option>Algerian</option>
                  <option>American</option>
                  <option>Andorran</option>
                  <option>Angolan</option>
                  <option>Antiguans and Barbudan</option>
                  <option>Argentine</option>
                  <option>Armenian</option>
                  <option>Aruban</option>
                  <option>Australian</option>
                  <option>Austrian</option>
                  <option>Azerbaijani</option>
                  <option>Bahamian</option>
                  <option>Bahraini</option>
                  <option>Baltic German</option>
                  <option>Baltic Russian</option>
                  <option>Bangladeshi</option>
                  <option>Barbadian</option>
                  <option>Basque</option>
                  <option>Belarusian</option>
                  <option>Belgian</option>
                  <option>Belizean</option>
                  <option>Beninese</option>
                  <option>Bhutanese</option>
                  <option>Bissau national</option>
                  <option>Bolivian</option>
                  <option>Bosniak</option>
                  <option>Bosnians and Herzegovinian</option>
                  <option>Botswana</option>
                  <option>Brazilian</option>
                  <option>Breton</option>
                  <option>British Virgin Islander</option>
                  <option>British</option>
                  <option>Bruneian</option>
                  <option>Bulgarian</option>
                  <option>Burkinabé</option>
                  <option>Burmese</option>
                  <option>Burundian</option>
                  <option>Cambodian</option>
                  <option>Cameroonian</option>
                  <option>Canadian</option>
                  <option>Cape Verdean</option>
                  <option>Catalan</option>
                  <option>Chadian</option>
                  <option>Chilean</option>
                  <option>Chinese</option>
                  <option>Colombian</option>
                  <option>Comorian</option>
                  <option>Congolese</option>
                  <option>Costa Rican</option>
                  <option>Croatian</option>
                  <option>Cuban</option>
                  <option>Cypriot</option>
                  <option>Czech</option>
                  <option>Dane</option>
                  <option>Djiboutian</option>
                  <option>Dominicans (Commonwealth)</option>
                  <option>Dominicans (Republic)</option>
                  <option>Dutch</option>
                  <option>East Timorese</option>
                  <option>Ecuadorian</option>
                  <option>Egyptian</option>
                  <option>Emirati</option>
                  <option>English</option>
                  <option>Equatoguinean</option>
                  <option>Eritrean</option>
                  <option>Estonian</option>
                  <option>Ethiopian</option>
                  <option>Faroese</option>
                  <option>Fijian</option>
                  <option>Finnish Swedish</option>
                  <option>Finn</option>
                  <option>French</option>
                  <option>Gabonese</option>
                  <option>Gambian</option>
                  <option>Georgian</option>
                  <option>German</option>
                  <option>Ghanaian</option>
                  <option>Gibraltarian</option>
                  <option>Greek Macedonian</option>
                  <option>Greek</option>
                  <option>Greenlander</option>
                  <option>Grenadian</option>
                  <option>Guatemalan</option>
                  <option>Guianese (French)</option>
                  <option>Guinean</option>
                  <option>GuineansPapua New Guinean</option>
                  <option>Guyanese</option>
                  <option>Haitian</option>
                  <option>Honduran</option>
                  <option>Hong Kong</option>
                  <option>Hungarian</option>
                  <option>Icelander</option>
                  <option>Indian</option>
                  <option>Indonesian</option>
                  <option>Iranian</option>
                  <option>Iraqi</option>
                  <option>Irish</option>
                  <option>Islander</option>
                  <option>Israeli</option>
                  <option>Italian</option>
                  <option>Ivoirian</option>
                  <option>Jamaican</option>
                  <option>Japanese</option>
                  <option>Jordanian</option>
                  <option>Kazakh</option>
                  <option>Kenyan</option>
                  <option>Kiribati</option>
                  <option>Korean</option>
                  <option>Kosovar</option>
                  <option>Kuwaiti</option>
                  <option>Kyrgyz</option>
                  <option>Lao</option>
                  <option>Latvian</option>
                  <option>Lebanese</option>
                  <option>Liberian</option>
                  <option>Libyan</option>
                  <option>Liechtensteiner</option>
                  <option>Lithuanian</option>
                  <option>Luxembourger</option>
                  <option>Macao</option>
                  <option>Macedonian Bulgarian</option>
                  <option>Macedonian</option>
                  <option>Malawian</option>
                  <option>Malaysian</option>
                  <option>Maldivian</option>
                  <option>Malian</option>
                  <option>Maltese</option>
                  <option>Manx</option>
                  <option>Marshallese</option>
                  <option>Mauritanian</option>
                  <option>Mauritian</option>
                  <option>Mexican</option>
                  <option>Micronesian</option>
                  <option>Moldovan</option>
                  <option>Monégasque</option>
                  <option>Mongolian</option>
                  <option>Montenegrin</option>
                  <option>Moroccan</option>
                  <option>Mozambican</option>
                  <option>Namibian</option>
                  <option>Nauran</option>
                  <option>Nepalese</option>
                  <option>New Zealander</option>
                  <option>Nicaraguan</option>
                  <option>Nigerian</option>
                  <option>Nigerien</option>
                  <option>Norwegian</option>
                  <option>Omani</option>
                  <option>Pakistani</option>
                  <option>Palauan</option>
                  <option>Palestinian</option>
                  <option>Panamanian</option>
                  <option>Paraguayan</option>
                  <option>Peruvian</option>
                  <option>Pole</option>
                  <option>Portuguese</option>
                  <option>Puerto Rican</option>
                  <option>Qatari</option>
                  <option>Quebecer</option>
                  <option>Réunionnai</option>
                  <option>Romanian</option>
                  <option>Russian</option>
                  <option>Rwandan</option>
                  <option>Saint Kitts and Nevi</option>
                  <option>Saint Lucian</option>
                  <option>Salvadoran</option>
                  <option>Sammarinese</option>
                  <option>Samoan</option>
                  <option>São Tomé and Príncipe</option>
                  <option>Saudi</option>
                  <option>Scot</option>
                  <option>Senegalese</option>
                  <option>Serb</option>
                  <option>Seychelloi</option>
                  <option>Sierra Leonean</option>
                  <option>Singaporean</option>
                  <option>Slovak</option>
                  <option>Slovene</option>
                  <option>Solomon Islander</option>
                  <option>Somalilander</option>
                  <option>Somali</option>
                  <option>Sotho</option>
                  <option>South African</option>
                  <option>Spaniard</option>
                  <option>Sri Lankan</option>
                  <option>Sudanese</option>
                  <option>Swazi</option>
                  <option>Swede</option>
                  <option>Swis</option>
                  <option>Syriac</option>
                  <option>Syrian</option>
                  <option>Taiwanese</option>
                  <option>Tajik</option>
                  <option>Tamil</option>
                  <option>Tanzanian</option>
                  <option>Thai</option>
                  <option>Tobagonian</option>
                  <option>Togolese</option>
                  <option>Tongan</option>
                  <option>Trinidadian</option>
                  <option>Tunisian</option>
                  <option>Turk</option>
                  <option>Tuvaluan</option>
                  <option>Ugandan</option>
                  <option>Ukrainian</option>
                  <option>Uruguayan</option>
                  <option>Uzbek</option>
                  <option>Vanuatuan</option>
                  <option>Venezuelan</option>
                  <option>Vietnamese</option>
                  <option>Vincentian</option>
                  <option>Welsh</option>
                  <option>Yemeni</option>
                  <option>Zambian</option>
                  <option>Zimbabwean</option>
                </select>
              </div>

              <div id="personType" className={`govuk-form-group ${errors.personType ? 'govuk-form-group--error' : ''}`}>
                <fieldset className="govuk-fieldset" aria-describedby="person-type-hint">
                  <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
                    <label className="govuk-fieldset__heading">
                      Person type
                    </label>
                  </legend>
                  <span className="govuk-hint">
                    For example Skipper, Crew or Passenger
                  </span>
                  <div className="govuk-radios govuk-radios">
                    <div className="govuk-radios__item">
                      <input
                        className="govuk-radios__input"
                        name="personType"
                        id="personType-1"
                        type="radio"
                        value="skipper"
                        checked={formData.personType === 'skipper' ? 'checked' : ''}
                        onChange={(e) => handleChange(e)}
                      />
                      <label className="govuk-label govuk-radios__label" htmlFor="personType-1">
                        Skipper
                      </label>
                    </div>
                    <div className="govuk-radios__item">
                      <input
                        className="govuk-radios__input"
                        name="personType"
                        id="personType-2"
                        type="radio"
                        value="crew"
                        checked={formData.personType === 'crew' ? 'checked' : ''}
                        onChange={(e) => handleChange(e)}
                      />
                      <label className="govuk-label govuk-radios__label" htmlFor="personType-2">
                        Crew
                      </label>
                    </div>
                    <div className="govuk-radios__item">
                      <input
                        className="govuk-radios__input"
                        name="personType"
                        id="personType-3"
                        type="radio"
                        value="passenger"
                        checked={formData.personType === 'passenger' ? 'checked' : ''}
                        onChange={(e) => handleChange(e)}
                      />
                      <label className="govuk-label govuk-radios__label" htmlFor="personType-3">
                        Passenger
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div id="travelDocumentType" className={`govuk-form-group ${errors.travelDocumentType ? 'govuk-form-group--error' : ''}`}>
                <fieldset className="govuk-fieldset" aria-describedby="travel-document-type-hint">
                  <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
                    <label className="govuk-fieldset__heading">
                      Travel document type
                    </label>
                  </legend>
                  <div className="govuk-radios govuk-radios govuk-form-group">
                    <div className="govuk-radios__item">
                      <input
                        className="govuk-radios__input"
                        id="travelDocumentType-1"
                        name="travelDocumentType"
                        type="radio"
                        value="passport"
                        checked={formData.travelDocumentType === 'passport' ? 'checked' : ''}
                        onChange={(e) => {
                          handleChange(e);
                          handleErrors(e);
                        }}
                      />
                      <label className="govuk-label govuk-radios__label" htmlFor="travelDocumentType-1">
                        Passport
                      </label>
                    </div>
                    <div className="govuk-radios__item">
                      <input
                        className="govuk-radios__input"
                        id="travelDocumentType-2"
                        name="travelDocumentType"
                        type="radio"
                        value="identityCard"
                        checked={formData.travelDocumentType === 'identityCard' ? 'checked' : ''}
                        onChange={(e) => {
                          handleChange(e);
                          handleErrors(e);
                        }}
                      />
                      <label className="govuk-label govuk-radios__label" htmlFor="travelDocumentType-2">
                        Identity card
                      </label>
                    </div>
                    <div className="govuk-radios__item">
                      <input
                        className="govuk-radios__input"
                        id="travelDocumentType-3"
                        name="travelDocumentType"
                        type="radio"
                        value="other"
                        checked={(formData.travelDocumentType && (formData.travelDocumentType !== 'identityCard' && formData.travelDocumentType !== 'passport')) ? 'checked' : ''}
                        onChange={(e) => {
                          handleChange(e);
                          handleErrors(e);
                        }}
                      />
                      <label className="govuk-label govuk-radios__label" htmlFor="travelDocumentType-3">
                        Other
                      </label>
                    </div>
                  </div>
                  <div className="govuk-form-group">
                    <label className="govuk-label" htmlFor="travelDocumentType-other">
                      If "Other", please specify
                    </label>
                    {errors.travelDocumentType && (
                        <span className="govuk-error-message">
                          <span className="govuk-visually-hidden">Error:</span> {errors.travelDocumentType}
                        </span>
                    )}
                    <input
                      className={`govuk-input ${errors.travelDocumentType ? 'govuk-input--error' : ''}`}
                      name="travelDocumentType"
                      type="text"
                      onChange={(e) => handleChange(e)}
                      onBlur={
                        formData.travelDocumentType === 'other'
                          ? (e) => handleErrors(e, 'You must enter the travel document type', 'travelDocumentType')
                          : ''
                      }
                      onKeyPress={(e) => handleErrors(e)}
                    />
                  </div>
                </fieldset>
              </div>

              <div id="documentNumber" className={`govuk-form-group ${errors.documentNumber ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label  govuk-label--m" htmlFor="documentNumber">
                  Document number
                </label>
                {errors.documentNumber && (
                    <span className="govuk-error-message">
                      <span className="govuk-visually-hidden">Error:</span> {errors.documentNumber}
                    </span>
                )}
                <input
                  className={`govuk-input ${errors.documentNumber ? 'govuk-input--error' : ''}`}
                  name="documentNumber"
                  type="text"
                  value={formData.documentNumber || ''}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleErrors(e, 'You must enter the document number')}
                  onKeyPress={(e) => handleErrors(e)}
                />
              </div>

              <div id="issuingState" className={`govuk-form-group ${errors.issuingState ? 'govuk-form-group--error' : ''}`}>
                <label className="govuk-label  govuk-label--m" htmlFor="issuingState">
                  Issuing state
                </label>
                {errors.issuingState && (
                    <span className="govuk-error-message">
                      <span className="govuk-visually-hidden">Error:</span> {errors.issuingState}
                    </span>
                )}
                  <span className="govuk-hint">
                    Please enter 3 letter ISO country code, for example GBR
                  </span>
                <input
                  className={`govuk-input govuk-input--width-3 ${errors.issuingState ? 'govuk-input--error' : ''}`}
                  name="issuingState"
                  type="text"
                  maxLength="3"
                  value={formData.issuingState || ''}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleErrors(e, 'You must enter the issuing state')}
                  onKeyPress={(e) => handleErrors(e)}
                />
              </div>

              <div id="expiryDate" className={`govuk-form-group ${errors.expiryDate ? 'govuk-form-group--error' : ''}`}>
                <fieldset className="govuk-fieldset" role="group" aria-describedby="expiryDate-hint">
                  <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
                    <label className="govuk-label govuk-label--m" htmlFor="expiryDate">
                      Expiry date
                    </label>
                    {errors.expiryDate && (
                        <span className="govuk-error-message">
                          <span className="govuk-visually-hidden">Error:</span> {errors.expiryDate}
                        </span>
                    )}
                  </legend>
                  <span className="govuk-hint">
                    For example, 31 3 2022
                  </span>
                  <div className="govuk-date-input" >
                    <div className="govuk-date-input__item">
                      <div className="govuk-form-group">
                        <label className="govuk-label govuk-date-input__label" htmlFor="expiryDateDay">
                          Day
                        </label>
                        <input
                          className={`govuk-input govuk-date-input__input govuk-input--width-2 ${errors.expiryDate ? 'govuk-input--error' : ''}`}
                          name="expiryDateDay"
                          type="text"
                          pattern="[0-9]*"
                          inputMode="numeric"
                          maxLength="2"
                          value={formData.expiryDateDay || ''}
                          onChange={(e) => handleChange(e)}
                          onBlur={(e) => handleErrors(e, 'You must enter the expiry date', 'expiryDate')}
                          onKeyPress={(e) => handleErrors(e)}
                        />
                      </div>
                    </div>
                    <div className="govuk-date-input__item">
                      <div className="govuk-form-group">
                        <label className="govuk-label govuk-date-input__label" htmlFor="expiryDateMonth">
                          Month
                        </label>
                        <input
                          className={`govuk-input govuk-date-input__input govuk-input--width-2 ${errors.expiryDate ? 'govuk-input--error' : ''}`}
                          name="expiryDateMonth"
                          type="text"
                          pattern="[0-9]*"
                          inputMode="numeric"
                          maxLength="2"
                          value={formData.expiryDateMonth || ''}
                          onChange={(e) => handleChange(e)}
                          onBlur={(e) => handleErrors(e, 'You must enter the expiry date', 'expiryDate')}
                          onKeyPress={(e) => handleErrors(e)}
                        />
                        </div>
                    </div>
                    <div className="govuk-date-input__item">
                      <div className="govuk-form-group">
                        <label className="govuk-label govuk-date-input__label" htmlFor="expiryDateYear">
                          Year
                        </label>
                        <input
                          className={`govuk-input govuk-date-input__input govuk-input--width-4 ${errors.expiryDate ? 'govuk-input--error' : ''}`}
                          name="expiryDateYear"
                          type="text"
                          pattern="[0-9]*"
                          inputMode="numeric"
                          maxLength="4"
                          value={formData.expiryDateYear || ''}
                          onChange={(e) => handleChange(e)}
                          onBlur={(e) => handleErrors(e, 'You must enter the expiry date', 'expiryDate')}
                          onKeyPress={(e) => handleErrors(e)}
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>

              <button
                className="govuk-button"
                data-module="govuk-button"
                onClick={(e) => handleSubmit(e)}
              >
                Add to saved people list
              </button>
              <p>
                <a href="/people" className="govuk-link govuk-link--no-visited-state" onClick={(e) => clearFormData(e)}>Save and come back later</a>
              </p>
              <p>
                <a href="/people" className="govuk-link govuk-link--no-visited-state" onClick={(e) => clearFormData(e)}>Exit without saving</a>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>

  );
};

export default FormPeople;
