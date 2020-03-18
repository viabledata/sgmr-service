import React from 'react';
import { useLocation } from 'react-router-dom';

const CreatePerson = ({ handleSubmit, handleChange, data, errors }) => {
  const urlParams = location.search.split('source=');
  const source = urlParams[1];

  return (
    <section>
      <div id="firstName" className={`govuk-form-group ${errors.firstName ? 'govuk-form-group--error' : ''}`}>
        <label className="govuk-label" htmlFor="firstName">
          Given name
        </label>
        {errors.firstName
          && (
          <span className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span> {errors.firstName}
          </span>
          )
        }
        <input
          className="govuk-input"
          name="firstName"
          type="text"
          value={data.firstName || ''}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div id="lastName" className={`govuk-form-group ${errors.lastName ? 'govuk-form-group--error' : ''}`}>
        <label className="govuk-label" htmlFor="lastName">
          Surname
        </label>
        {errors.lastName
          && (
          <span className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span> {errors.lastName}
          </span>
          )
        }
       <input
          className="govuk-input"
          name="lastName"
          type="text"
          value={data.lastName || ''}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div id="gender" className="govuk-form-group">
        <label className="govuk-label" htmlFor="gender">
          Gender
        </label>
        <select
          className="govuk-select"
          name="gender"
          type="text"
          value={data.gender || 'Please select'}
          onChange={(e) => handleChange(e)}
        >
          <option disabled>Please select</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="unspecified">Unspecified</option>
        </select>
      </div>

      <div id="dateOfBirth" className="govuk-form-group">
        <fieldset className="govuk-fieldset" role="group" aria-describedby="dob-hint">
          <legend className="govuk-fieldset__legend">
            <label className="govuk-label" htmlFor="dateOfBirth">
              What is your date of birth?
            </label>
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
                  className="govuk-input govuk-date-input__input govuk-input--width-2"
                  name="dobDay"
                  type="text"
                  maxLength="2"
                  autoComplete="bday-day"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  value={data.dobDay || ''}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className="govuk-date-input__item">
              <div className="govuk-form-group">
                <label className="govuk-label govuk-date-input__label" htmlFor="dobMonth">
                  Month
                </label>
                <input
                  className="govuk-input govuk-date-input__input govuk-input--width-2"
                  name="dobMonth"
                  type="text"
                  maxLength="2"
                  autoComplete="bday-month"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  value={data.dobMonth || ''}
                  onChange={(e) => handleChange(e)}
              />
              </div>
            </div>
            <div className="govuk-date-input__item">
              <div className="govuk-form-group">
                <label className="govuk-label govuk-date-input__label" htmlFor="dobYear">
                  Year
                </label>
                <input
                  className="govuk-input govuk-date-input__input govuk-input--width-4"
                  name="dobYear"
                  type="text"
                  maxLength="4"
                  autoComplete="bday-year"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  value={data.dobYear || ''}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
          </div>
        </fieldset>
      </div>

      <div id="placeOfBirth" className="govuk-form-group">
        <label className="govuk-label" htmlFor="placeOfBirth">
          Place of birth
        </label>
        <input
          className="govuk-input"
          name="placeOfBirth"
          type="text"
          value={data.placeOfBirth || ''}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div id="nationality" className="govuk-form-group">
        <label className="govuk-label" htmlFor="nationality">
          Nationality
        </label>
        <select
          className="govuk-select"
          name="nationality"
          type="text"
          value={data.nationality || 'Please select'}
          onChange={(e) => handleChange(e)}
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
              <span className="govuk-visually-hidden">Error:</span> {errors.peopleType}
            </span>
            )
          }
            <div className="govuk-radios__item">
              <input
                className="govuk-radios__input"
                name="peopleType"
                id="peopleType-1"
                type="radio"
                value="Skipper"
                checked={data.peopleType === 'Skipper' ? 'checked' : ''}
                onChange={(e) => handleChange(e)}
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
                checked={data.peopleType === 'Crew' ? 'checked' : ''}
                onChange={(e) => handleChange(e)}
              />
              <label className="govuk-label govuk-radios__label" htmlFor="peopleType-2">
                Crew
              </label>
            </div>
            <div className="govuk-radios__item">
              <input
                className="govuk-radios__input"
                name="peopleType"
                id="peopleType-3"
                type="radio"
                value="passenger"
                checked={data.peopleType === 'passenger' ? 'checked' : ''}
                onChange={(e) => handleChange(e)}
              />
              <label className="govuk-label govuk-radios__label" htmlFor="peopleType-3">
                Passenger
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
                <span className="govuk-visually-hidden">Error:</span> {errors.documentType}
              </span>
              )
            }
            <div className="govuk-radios__item">
              <input
                className="govuk-radios__input"
                id="documentType-1"
                name="documentType"
                type="radio"
                value="Passport"
                checked={data.documentType === 'Passport' ? 'checked' : ''}
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
                checked={data.documentType === 'IdentityCard' ? 'checked' : ''}
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
                checked={data.documentType === 'Other' ? 'checked' : ''}
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
              If "Other", please specify
            </label>
            <input
              className="govuk-input"
              name="documentType"
              type="text"
              onChange={(e) => handleChange(e)}
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
            <span className="govuk-visually-hidden">Error:</span> {errors.documentNumber}
          </span>
          )
        }
         <input
          className="govuk-input"
          name="documentNumber"
          type="text"
          value={data.documentNumber || ''}
          onChange={(e) => handleChange(e)}
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
              <span className="govuk-visually-hidden">Error:</span> {errors.documentIssuingState}
            </span>
            )
          }
        <input
          className="govuk-input govuk-input--width-3"
          name="documentIssuingState"
          type="text"
          maxLength="3"
          value={data.documentIssuingState || ''}
          onChange={(e) => handleChange(e)}
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
          <div className="govuk-date-input" >
            {errors.documentExpiryDate
              && (
              <span className="govuk-error-message">
                <span className="govuk-visually-hidden">Error:</span> {errors.documentExpiryDate}
              </span>
              )
            }
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
                  maxLength="2"
                  value={data.documentExpiryDateDay || ''}
                  onChange={(e) => handleChange(e)}
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
                  maxLength="2"
                  value={data.documentExpiryDateMonth || ''}
                  onChange={(e) => handleChange(e)}
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
                  maxLength="4"
                  value={data.documentExpiryDateYear || ''}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
          </div>
        </fieldset>
      </div>

      <div id="submitBlock">
        <button
          className="govuk-button"
          data-module="govuk-button"
          onClick={(e) => handleSubmit(e)}
        >
          {source === 'voyage' ? 'Add to manifest' : 'Add to saved people list'}
        </button>
      </div>
    </section>
  );
};

export default CreatePerson;
