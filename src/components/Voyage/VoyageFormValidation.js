// App imports
import { isDateValid, isDateBefore } from '@utils/date';
import { isTimeAndDateBeforeNow, isTimeValid } from '@utils/time';
import {
  arrivalValidationRules,
  departureValidationRules,
  personValidationRules,
  responsiblePersonValidationRules,
  vesselValidationRules,
  voyageValidationRules,
} from '@components/Forms/validationRules';
import scrollToTopOnError from '@utils/scrollToTopOnError';
import { FORM_STEPS } from '@constants/ClientConstants';

const VoyageFormValidation = (dataToValidate, source) => {
  const fieldsErroring = {};
  let validationRules;
  switch (source) {
    case FORM_STEPS.CHECK: validationRules = voyageValidationRules; break;
    case FORM_STEPS.ARRIVAL: validationRules = arrivalValidationRules; break;
    case FORM_STEPS.DEPARTURE: validationRules = departureValidationRules; break;
    case FORM_STEPS.NEW_PERSON: validationRules = personValidationRules; break;
    case FORM_STEPS.PERSON: validationRules = personValidationRules; break;
    case FORM_STEPS.RESPONSIBLE_PERSON: validationRules = responsiblePersonValidationRules; break;
    case FORM_STEPS.VESSEL: validationRules = vesselValidationRules; break;
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
    source === FORM_STEPS.DEPARTURE
    && !dataToValidate.departurePort
    && (!dataToValidate.departureLat || !dataToValidate.departureLong)
  ) {
    fieldsErroring.departureLocation = 'You must enter a departure point';
  }
  if (
    source === FORM_STEPS.ARRIVAL
    && !dataToValidate.arrivalPort
    && (!dataToValidate.arrivalLat || !dataToValidate.arrivalLong)
  ) {
    fieldsErroring.arrivalLocation = 'You must enter an arrival point';
  }

  if (dataToValidate.departureDateYear && !(isDateValid(dataToValidate.departureDateYear, dataToValidate.departureDateMonth, dataToValidate.departureDateDay))) {
    fieldsErroring.departureDate = 'You must enter a valid date';
  }
  if (dataToValidate.arrivalDateYear && !(isDateValid(dataToValidate.arrivalDateYear, dataToValidate.arrivalDateMonth, dataToValidate.arrivalDateDay))) {
    fieldsErroring.arrivalDate = 'You must enter a valid date';
  }

  // For a New Person - document expiry date must be after today and DOB before today
  if (source === FORM_STEPS.NEW_PERSON
    && dataToValidate.documentExpiryDateYear
    && (isDateBefore(dataToValidate.documentExpiryDateYear, dataToValidate.documentExpiryDateMonth, dataToValidate.documentExpiryDateDay))) {
    fieldsErroring.documentExpiryDate = 'You must enter a valid document expiry date';
  }

  if (source === FORM_STEPS.NEW_PERSON
    && dataToValidate.dateOfBirthYear
    && !(isDateBefore(dataToValidate.dateOfBirthYear, dataToValidate.dateOfBirthMonth, dataToValidate.dateOfBirthDay))) {
    fieldsErroring.dateOfBirth = 'You must enter a valid date of birthå';
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
