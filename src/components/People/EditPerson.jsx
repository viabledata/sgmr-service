import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';

// App imports
import FormPerson from './FormPerson';
import { personValidationRules, validate } from '../Forms/validationRules';
import { PEOPLE_URL } from '../../constants/ApiConstants';
import { PEOPLE_PAGE_URL } from '../../constants/ClientConstants';
import { getData, patchData } from '../../utils/apiHooks';
import { formatDate } from '../../utils/date';
import getId from '../../utils/getIdHook';
import scrollToTopOnError from '../../utils/scrollToTopOnError';

const EditPerson = () => {
  document.title = 'Edit person';

  const history = useHistory();
  const [personId, setPersonId] = useState();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const getPersonData = async () => {
    const resp = await getData(`${PEOPLE_URL}/${personId}`, 'people');
    const [documentExpiryDateYear, documentExpiryDateMonth, documentExpiryDateDay] = resp.documentExpiryDate.split('-');
    const [dateOfBirthYear, dateOfBirthMonth, dateOfBirthDay] = resp.dateOfBirth.split('-');

    setFormData({
      ...resp,
      documentExpiryDateYear,
      documentExpiryDateMonth,
      documentExpiryDateDay,
      dateOfBirthYear,
      dateOfBirthMonth,
      dateOfBirthDay,
      peopleType: resp.peopleType.name,
    });
  };

  // Clear errors
  const removeError = (fieldName) => {
    const errorList = { ...errors };
    let key;

    if (fieldName.includes('dateOfBirth')) {
      key = 'dateOfBirth';
    } else if (fieldName.includes('documentExpiryDate')) {
      key = 'documentExpiryDate';
    } else {
      key = fieldName;
    }
    delete errorList[key];
    setErrors(errorList);
  };

  // Update form data as user enters it
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    removeError(e.target.name);
  };

  // Check fields that are required exist & fields with rules match
  const validateForm = async (dataToValidate) => {
    const newErrors = await validate(personValidationRules, dataToValidate);

    setErrors(newErrors);
    scrollToTopOnError(newErrors);
    return Object.keys(newErrors).length > 0;
  };

  // Format data to submit
  const formatDataToSubmit = (data) => {
    return {
      firstName: data.firstName,
      lastName: data.lastName,
      documentType: data.documentType,
      documentNumber: data.documentNumber,
      documentExpiryDate: formatDate(data.documentExpiryDateYear, data.documentExpiryDateMonth, data.documentExpiryDateDay),
      documentIssuingState: data.documentIssuingState,
      peopleType: data.peopleType,
      gender: data.gender,
      dateOfBirth: formatDate(data.dateOfBirthYear, data.dateOfBirthMonth, data.dateOfBirthDay),
      placeOfBirth: data.placeOfBirth,
      nationality: data.nationality,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!await validateForm(formData)) {
      await patchData(`${PEOPLE_URL}/${personId}`, formatDataToSubmit(formData));
      history.push(PEOPLE_PAGE_URL);
    }
  };

  // Triggers
  useEffect(() => {
    setPersonId(getId('people'));
  }, []);

  useEffect(() => {
    if (personId) { getPersonData(); }
  }, [personId]);

  return (
    <div className="govuk-width-container ">
      <div className="govuk-breadcrumbs">
        <ol className="govuk-breadcrumbs__list">
          <li className="govuk-breadcrumbs__list-item">
            <a className="govuk-breadcrumbs__link" href={PEOPLE_PAGE_URL}>People</a>
          </li>
          <li className="govuk-breadcrumbs__list-item" aria-current="page">Edit person</li>
        </ol>
      </div>
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-xl">Edit person</h1>
            <p className="govuk-body-l">Update the details of the person you want to edit.</p>
            <form id="EditPerson">

              {Object.keys(errors).length >= 1 && (
              <div className="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabIndex="-1" data-module="govuk-error-summary">
                <h2 className="govuk-error-summary__title">
                  There is a problem
                </h2>
                <div className="govuk-error-summary__body">
                  <ul className="govuk-list govuk-error-summary__list">
                    {Object.entries(errors).reverse().map((elem) => (
                      <li key={elem[0]}>
                        <a href={`#${elem[0]}`}>{elem[1]}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              )}

              <FormPerson
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                formData={formData}
                errors={errors || ''}
              />

            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default withRouter(EditPerson);
