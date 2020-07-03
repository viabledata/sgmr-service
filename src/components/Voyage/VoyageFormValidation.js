// App imports
import { isDateValid } from '@utils/date';
import { isTimeAndDateBeforeNow, isTimeValid } from '@utils/time';
import {
  arrivalValidationRules, departureValidationRules, personValidationRules, vesselValidationRules, voyageValidationRules,
} from '@components/Forms/validationRules';
import scrollToTopOnError from '@utils/scrollToTopOnError';

const VoyageFormValidation = (dataToValidate, source) => {
  const fieldsErroring = {};
  let validationRules;
  switch (source) {
    case 'check': validationRules = voyageValidationRules; break;
    case 'arrival': validationRules = arrivalValidationRules; break;
    case 'departure': validationRules = departureValidationRules; break;
    case 'newPerson': validationRules = personValidationRules; break;
    case 'person': validationRules = personValidationRules; break;
    case 'vessel': validationRules = vesselValidationRules; break;
    default: validationRules = null;
  }

  // Required fields must not be null
  if (validationRules) {
    validationRules.map((rule) => {
      if (!(rule.inputField in dataToValidate) || dataToValidate[rule.inputField] === '' || !dataToValidate[rule.inputField]) {
        fieldsErroring[rule.errorDisplayId] = rule.message;
      }
    });
  }

  // Departure & Arrival must include a Port OR a Lat & Long

  if (
    source === 'departure'
    && !dataToValidate.departurePort
    && (!dataToValidate.departureLat || !dataToValidate.departureLong)
  ) {
    fieldsErroring.departureLocation = 'You must enter either a departure port or the lat/long coordinates';
  }
  if (
    source === 'arrival'
    && !dataToValidate.arrivalPort
    && (!dataToValidate.arrivalLat || !dataToValidate.arrivalLong)
  ) {
    fieldsErroring.arrivalLocation = 'You must enter either an arrival port or the lat/long coordinates';
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
  if (dataToValidate.arrivalTimeHour && !(isTimeValid(dataToValidate.arrivalTimeHour, dataToValidate.arrivalTimeMinute))) {
    fieldsErroring.arrivalTime = 'You must enter a valid time';
  }
  // Departure date must be in the future
  if (isTimeAndDateBeforeNow(
    dataToValidate.departureDateYear,
    dataToValidate.departureDateMonth,
    dataToValidate.departureDateDay,
    dataToValidate.departureTimeHour,
    dataToValidate.departureTimeMinute,
  )) {
    fieldsErroring.departureDate = 'You must enter a departure time in the future';
  }
  // Arrival date must be in the future
  if (isTimeAndDateBeforeNow(
    dataToValidate.arrivalDateYear,
    dataToValidate.arrivalDateMonth,
    dataToValidate.arrivalDateDay,
    dataToValidate.arrivalTimeHour,
    dataToValidate.arrivalTimeMinute,
  )) {
    fieldsErroring.arrivalDate = 'You must enter an arrival time in the future';
  }
  // Arrival date must be after the departure date
  if (
    (new Date(
      dataToValidate.arrivalDateYear,
      (dataToValidate.arrivalDateMonth - 1),
      dataToValidate.arrivalDateDay,
      dataToValidate.arrivalTimeHour,
      dataToValidate.arrivalTimeMinute,
    ))
    < (new Date(
      dataToValidate.departureDateYear,
      (dataToValidate.departureDateMonth - 1),
      dataToValidate.departureDateDay,
      dataToValidate.departureTimeHour,
      dataToValidate.departureTimeMinute,
    ))
  ) {
    fieldsErroring.arrivalDate = 'You must enter an arrival time after your departure';
  }

  if (fieldsErroring) { scrollToTopOnError('voyageForm'); }
  return fieldsErroring;
};

export default VoyageFormValidation;
