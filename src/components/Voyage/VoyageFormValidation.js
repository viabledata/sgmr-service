// App imports
import { isDateValid } from '@utils/date';
import { voyageValidationRules } from '@components/Forms/validationRules';


const VoyageFormValidation = (dataToValidate) => {
  const fieldsErroring = {};

  // Required fields must not be null
  voyageValidationRules.map((rule) => {
    (!(rule.inputField in dataToValidate) || dataToValidate[rule.inputField] === '')
      ? fieldsErroring[rule.inputField] = rule.message
      : null;
  });

  // Date fields must be valid
  if (dataToValidate.documentExpiryDateYear && !(isDateValid(dataToValidate.documentExpiryDateYear, dataToValidate.documentExpiryDateMonth, dataToValidate.documentExpiryDateDay))) {
    fieldsErroring.documentExpiryDate = 'You must enter a valid date';
  }
  if (dataToValidate.dateOfBirthYear && !(isDateValid(dataToValidate.dateOfBirthYear, dataToValidate.dateOfBirthMonth, dataToValidate.dateOfBirthDay))) {
    fieldsErroring.dateOfBirth = 'You must enter a valid date';
  }
  if (dataToValidate.departureDateYear && !(isDateValid(dataToValidate.departureDateYear, dataToValidate.departureDateMonth, dataToValidate.departureDateDay))) {
    fieldsErroring.departureDate = 'You must enter a valid date';
  }
  if (dataToValidate.arrivalDateYear && !(isDateValid(dataToValidate.arrivalDateYear, dataToValidate.arrivalDateMonth, dataToValidate.arrivalDateDay))) {
    fieldsErroring.arrivalDate = 'You must enter a valid date';
  }

  return fieldsErroring;
};

export default VoyageFormValidation;
