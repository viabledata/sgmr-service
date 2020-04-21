// App imports
import { isDateValid } from '@utils/date';
import isTimeValid from '@utils/time';
import { departureValidationRules, vesselValidationRules } from '@components/Forms/validationRules';


const VoyageFormValidation = (dataToValidate, source) => {
  const fieldsErroring = {};
  let validationRules;
  switch (source) {
    case 'departure': validationRules = departureValidationRules; break;
    case 'vessel': validationRules = vesselValidationRules; break;
    default: null;
  }

  // Required fields must not be null
  if (validationRules) {
    validationRules.map((rule) => {
      if (!(rule.inputField in dataToValidate) || dataToValidate[rule.inputField] === '') {
        fieldsErroring[rule.errorDisplayId] = rule.message;
      }
    });
  }

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

  // Time fields must be valid
  if (dataToValidate.departureTimeHour && !(isTimeValid(dataToValidate.departureTimeHour, dataToValidate.departureTimeMinute))) {
    fieldsErroring.departureTime = 'You must enter a valid time';
  }

  return fieldsErroring;
};

export default VoyageFormValidation;
