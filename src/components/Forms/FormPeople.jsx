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
  const handleErrors = (e, errorText) => {
    // If field value is empty, add error : if field has value, removeError
    !e.target.value ? setErrors({ ...errors, [e.target.name]: errorText }) : removeError(e.target.name);
  };

  // Clear formData from localStorage
  // As localStorage updates whenever there is a change to the value of formData or errors, it clears the field data as part of the set function
  const clearFormData = (e) => {
    setFormData({});
    setErrors({ title: null });
  };

  // Handle Submit, including clearing localStorage
  const handleSubmit = (e) => {
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

              <div className={`govuk-form-group ${errors.givenName ? 'govuk-form-group--error' : ''}`}>
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
                  onBlur={(e) => handleErrors(e, 'You must enter your given name')}
                  onKeyPress={(e) => handleErrors(e)}
                />
              </div>

              <div className={`govuk-form-group ${errors.surname ? 'govuk-form-group--error' : ''}`}>
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
                  onBlur={(e) => handleErrors(e, 'You must enter your  surname')}
                  onKeyPress={(e) => handleErrors(e)}
                />
              </div>

              <div className={`govuk-form-group ${errors.gender ? 'govuk-form-group--error' : ''}`}>
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
                  value={formData.gender || ''}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleErrors(e, 'You must select your gender')}
                  onKeyPress={(e) => handleErrors(e)}
                >
                  <option>Please select</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="unspecified">Unspecified</option>
                </select>
              </div>

              <div className={`govuk-form-group ${errors.dateOfBirth ? 'govuk-form-group--error' : ''}`}>
                <fieldset className="govuk-fieldset" role="group" aria-describedby="dob-hint">
                  <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
                    <label className="govuk-label govuk-label--m" htmlFor="dateOfBirth">
                      What is your date of birth?
                    </label>
                  </legend>
                  <span className="govuk-hint">
                    For example, 31 3 1980
                  </span>
                  <div className="govuk-date-input" >
                    <div className="govuk-date-input__item">
                      <div className="govuk-form-group">
                        <label className="govuk-label govuk-date-input__label" htmlFor="dob-day">
                          Day
                        </label>
                        <input className="govuk-input govuk-date-input__input govuk-input--width-2" name="dob-day" type="text" autoComplete="bday-day" pattern="[0-9]*" inputMode="numeric" />
                      </div>
                    </div>
                    <div className="govuk-date-input__item">
                      <div className="govuk-form-group">
                        <label className="govuk-label govuk-date-input__label" htmlFor="dob-month">
                          Month
                        </label>
                        <input className="govuk-input govuk-date-input__input govuk-input--width-2" name="dob-month" type="text" autoComplete="bday-month" pattern="[0-9]*" inputMode="numeric" />
                      </div>
                    </div>
                    <div className="govuk-date-input__item">
                      <div className="govuk-form-group">
                        <label className="govuk-label govuk-date-input__label" htmlFor="dob-year">
                          Year
                        </label>
                        <input className="govuk-input govuk-date-input__input govuk-input--width-4" name="dob-year" type="text" autoComplete="bday-year" pattern="[0-9]*" inputMode="numeric" />
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div className={`govuk-form-group ${errors.placeOfBirth ? 'govuk-form-group--error' : ''}`}>
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
                  onBlur={(e) => handleErrors(e, 'You must enter your place of birth')}
                  onKeyPress={(e) => handleErrors(e)}
                />
              </div>

              <div className={`govuk-form-group ${errors.nationality ? 'govuk-form-group--error' : ''}`}>
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
                  value={formData.nationality || ''}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleErrors(e, 'You must select your nationality')}
                  onKeyPress={(e) => handleErrors(e)}
                >
                  <option selected="">Please select</option>
                  <option>Afghans</option>
                  <option>Albanians</option>
                  <option>Algerians</option>
                  <option>Americans</option>
                  <option>Andorrans</option>
                  <option>Angolans</option>
                  <option>Antiguans and Barbudans</option>
                  <option>Argentines</option>
                  <option>Armenians</option>
                  <option>Arubans</option>
                  <option>Australians</option>
                  <option>Austrians</option>
                  <option>Azerbaijanis</option>
                  <option>Bahamians</option>
                  <option>Bahrainis</option>
                  <option>Baltic Germans</option>
                  <option>Baltic Russians</option>
                  <option>Bangladeshis</option>
                  <option>Barbadians</option>
                  <option>Basques</option>
                  <option>Belarusians</option>
                  <option>Belgians</option>
                  <option>Belizeans</option>
                  <option>Beninese</option>
                  <option>Bhutanese</option>
                  <option>Bissau nationals</option>
                  <option>Bolivians</option>
                  <option>Bosniaks</option>
                  <option>Bosnians and Herzegovinians</option>
                  <option>Botswana</option>
                  <option>Brazilians</option>
                  <option>Bretons</option>
                  <option>British Virgin Islanders</option>
                  <option>British</option>
                  <option>Bruneians</option>
                  <option>Bulgarians</option>
                  <option>Burkinabés</option>
                  <option>Burmese</option>
                  <option>Burundians</option>
                  <option>Cambodians</option>
                  <option>Cameroonians</option>
                  <option>Canadians</option>
                  <option>Cape Verdeans</option>
                  <option>Catalans</option>
                  <option>Chadians</option>
                  <option>Chileans</option>
                  <option>Chinese</option>
                  <option>Colombians</option>
                  <option>Comorians</option>
                  <option>Congolese</option>
                  <option>Costa Ricans</option>
                  <option>Croatians</option>
                  <option>Cubans</option>
                  <option>Cypriots</option>
                  <option>Czechs</option>
                  <option>Danes</option>
                  <option>Djiboutians</option>
                  <option>Dominicans (Commonwealth)</option>
                  <option>Dominicans (Republic)</option>
                  <option>Dutch</option>
                  <option>East Timorese</option>
                  <option>Ecuadorians</option>
                  <option>Egyptians</option>
                  <option>Emiratis</option>
                  <option>English</option>
                  <option>Equatoguineans</option>
                  <option>Eritreans</option>
                  <option>Estonians</option>
                  <option>Ethiopians</option>
                  <option>Faroese</option>
                  <option>Fijians</option>
                  <option>Finnish Swedish</option>
                  <option>Finns</option>
                  <option>French</option>
                  <option>Gabonese</option>
                  <option>Gambians</option>
                  <option>Georgians</option>
                  <option>Germans</option>
                  <option>Ghanaians</option>
                  <option>Gibraltarians</option>
                  <option>Greek Macedonians</option>
                  <option>Greeks</option>
                  <option>Greenlanders</option>
                  <option>Grenadians</option>
                  <option>Guatemalans</option>
                  <option>Guianese (French)</option>
                  <option>Guineans</option>
                  <option>GuineansPapua New Guineans</option>
                  <option>Guyanese</option>
                  <option>Haitians</option>
                  <option>Hondurans</option>
                  <option>Hong Kong</option>
                  <option>Hungarians</option>
                  <option>Icelanders</option>
                  <option>Indians</option>
                  <option>Indonesians</option>
                  <option>Iranians</option>
                  <option>Iraqis</option>
                  <option>Irish</option>
                  <option>Islanders</option>
                  <option>Israelis</option>
                  <option>Italians</option>
                  <option>Ivoirians</option>
                  <option>Jamaicans</option>
                  <option>Japanese</option>
                  <option>Jordanians</option>
                  <option>Kazakhs</option>
                  <option>Kenyans</option>
                  <option>Kiribati</option>
                  <option>Koreans</option>
                  <option>Kosovars</option>
                  <option>Kuwaitis</option>
                  <option>Kyrgyzs</option>
                  <option>Lao</option>
                  <option>Latvians</option>
                  <option>Lebanese</option>
                  <option>Liberians</option>
                  <option>Libyans</option>
                  <option>Liechtensteiners</option>
                  <option>Lithuanians</option>
                  <option>Luxembourgers</option>
                  <option>Macao</option>
                  <option>Macedonian Bulgarians</option>
                  <option>Macedonians</option>
                  <option>Malawians</option>
                  <option>Malaysians</option>
                  <option>Maldivians</option>
                  <option>Malians</option>
                  <option>Maltese</option>
                  <option>Manx</option>
                  <option>Marshallese</option>
                  <option>Mauritanians</option>
                  <option>Mauritians</option>
                  <option>Mexicans</option>
                  <option>Micronesians</option>
                  <option>Moldovans</option>
                  <option>Monégasque</option>
                  <option>Mongolians</option>
                  <option>Montenegrins</option>
                  <option>Moroccans</option>
                  <option>Mozambicans</option>
                  <option>Namibians</option>
                  <option>Naurans</option>
                  <option>Nepalese</option>
                  <option>New Zealanders</option>
                  <option>Nicaraguans</option>
                  <option>Nigerians</option>
                  <option>Nigeriens</option>
                  <option>Norwegians</option>
                  <option>Omani</option>
                  <option>Pakistanis</option>
                  <option>Palauans</option>
                  <option>Palestinians</option>
                  <option>Panamanians</option>
                  <option>Paraguayans</option>
                  <option>Peruvians</option>
                  <option>Poles</option>
                  <option>Portuguese</option>
                  <option>Puerto Ricans</option>
                  <option>Qatari</option>
                  <option>Quebecers</option>
                  <option>Réunionnais</option>
                  <option>Romanians</option>
                  <option>Russians</option>
                  <option>Rwandans</option>
                  <option>Saint Kitts and Nevis</option>
                  <option>Saint Lucians</option>
                  <option>Salvadorans</option>
                  <option>Sammarinese</option>
                  <option>Samoans</option>
                  <option>São Tomé and Príncipe</option>
                  <option>Saudis</option>
                  <option>Scots</option>
                  <option>Senegalese</option>
                  <option>Serbs</option>
                  <option>Seychellois</option>
                  <option>Sierra Leoneans</option>
                  <option>Singaporeans</option>
                  <option>Slovaks</option>
                  <option>Slovenes</option>
                  <option>Solomon Islanders</option>
                  <option>Somalilanders</option>
                  <option>Somalis</option>
                  <option>Sotho</option>
                  <option>South Africans</option>
                  <option>Spaniards</option>
                  <option>Sri Lankans</option>
                  <option>Sudanese</option>
                  <option>Swazi</option>
                  <option>Swedes</option>
                  <option>Swiss</option>
                  <option>Syriacs</option>
                  <option>Syrians</option>
                  <option>Taiwanese</option>
                  <option>Tajik</option>
                  <option>Tamils</option>
                  <option>Tanzanians</option>
                  <option>Thais</option>
                  <option>Tobagonians</option>
                  <option>Togolese</option>
                  <option>Tongans</option>
                  <option>Trinidadians</option>
                  <option>Tunisians</option>
                  <option>Turks</option>
                  <option>Tuvaluans</option>
                  <option>Ugandans</option>
                  <option>Ukrainians</option>
                  <option>Uruguayans</option>
                  <option>Uzbeks</option>
                  <option>Vanuatuans</option>
                  <option>Venezuelans</option>
                  <option>Vietnamese</option>
                  <option>Vincentians</option>
                  <option>Welsh</option>
                  <option>Yemenis</option>
                  <option>Zambians</option>
                  <option>Zimbabweans</option>
                </select>
              </div>

              <div className={`govuk-form-group ${errors.personType ? 'govuk-form-group--error' : ''}`}>
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
                        id="personType"
                        type="radio"
                        value="skipper"
                        onChange={(e) => handleChange(e)}
                      />
                      <label className="govuk-label govuk-radios__label" htmlFor="personType">
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
                        onChange={(e) => handleChange(e)}
                      />
                      <label className="govuk-label govuk-radios__label" htmlFor="personType-3">
                        Passenger
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div className={`govuk-form-group ${errors.travelDocumentType ? 'govuk-form-group--error' : ''}`}>
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
                        id="travelDocumentType"
                        name="travelDocumentType"
                        type="radio"
                        value="passport"
                        onChange={(e) => handleChange(e)}
                      />
                      <label className="govuk-label govuk-radios__label" htmlFor="travelDocumentType">
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
                        onChange={(e) => handleChange(e)}
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
                        onChange={(e) => handleChange(e)}
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
                    <input
                      className="govuk-input"
                      name="travelDocumentType"
                      type="text"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </fieldset>
              </div>

              <div className={`govuk-form-group ${errors.documentNumber ? 'govuk-form-group--error' : ''}`}>
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
                  onBlur={(e) => handleErrors(e, 'You must enter your document number')}
                  onKeyPress={(e) => handleErrors(e)}
                />
              </div>

              <div className={`govuk-form-group ${errors.issuingState ? 'govuk-form-group--error' : ''}`}>
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
                  value={formData.issuingState || ''}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleErrors(e, 'You must enter the issuing state')}
                  onKeyPress={(e) => handleErrors(e)}
                />
              </div>

              <div className={`govuk-form-group ${errors.expiryDate ? 'govuk-form-group--error' : ''}`}>
                <fieldset className="govuk-fieldset" role="group" aria-describedby="expiryDate-hint">
                  <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
                    <label className="govuk-label govuk-label--m" htmlFor="expiryDate">
                      Expiry date
                    </label>
                  </legend>
                  <span className="govuk-hint">
                    For example, 31 3 2022
                  </span>
                  <div className="govuk-date-input" >
                    <div className="govuk-date-input__item">
                      <div className="govuk-form-group">
                        <label className="govuk-label govuk-date-input__label" htmlFor="expiryDate-day">
                          Day
                        </label>
                        <input className="govuk-input govuk-date-input__input govuk-input--width-2" name="expiryDate-day" type="text" pattern="[0-9]*" inputMode="numeric" />
                      </div>
                    </div>
                    <div className="govuk-date-input__item">
                      <div className="govuk-form-group">
                        <label className="govuk-label govuk-date-input__label" htmlFor="expiryDate-month">
                          Month
                        </label>
                        <input className="govuk-input govuk-date-input__input govuk-input--width-2" name="expiryDate-month" type="text" pattern="[0-9]*" inputMode="numeric" />
                      </div>
                    </div>
                    <div className="govuk-date-input__item">
                      <div className="govuk-form-group">
                        <label className="govuk-label govuk-date-input__label" htmlFor="expiryDate-year">
                          Year
                        </label>
                        <input className="govuk-input govuk-date-input__input govuk-input--width-4" name="expiryDate-year" type="text" pattern="[0-9]*" inputMode="numeric" />
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
