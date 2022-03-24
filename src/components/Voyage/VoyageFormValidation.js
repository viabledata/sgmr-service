// App imports
import { FORM_STEPS } from '../../constants/ClientConstants';
import { isDateValid, isInThePast } from '../../utils/date';
import scrollToTopOnError from '../../utils/scrollToTopOnError';
import { isDateToday, isTimeAndDateBeforeNow, isTimeValid } from '../../utils/time';
import {
  arrivalValidationRules,
  departureValidationRules,
  personValidationRules,
  responsiblePersonValidationRules, validate, VALID_INTERNATIONAL_MOBILE_REGEX,
  vesselValidationRules,
  voyageValidationRules,
} from '../Forms/validationRules';

const VoyageFormValidation = async (dataToValidate, source) => {
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
  const errors = await validate(validationRules, dataToValidate);

  // Validate skipper phone number
  if (source === FORM_STEPS.RESPONSIBLE_PERSON && dataToValidate.responsibleContactNo) {
    if (!(VALID_INTERNATIONAL_MOBILE_REGEX.test(dataToValidate.responsibleContactNo))) {
      errors.responsibleContactNo = 'You must enter a valid phone number e.g. 07700 900982, +33 63998 010101';
    }
  }

  // Departure & Arrival must include a Port OR a Lat & Long

  if (
    source === FORM_STEPS.DEPARTURE
    && !dataToValidate.departurePortName
    && (!dataToValidate.departureLat || !dataToValidate.departureLong)
  ) {
    errors.departureLocation = 'You must enter a departure point';
  }
  if (
    source === FORM_STEPS.ARRIVAL
    && !dataToValidate.arrivalPortName
    && (!dataToValidate.arrivalLat || !dataToValidate.arrivalLong)
  ) {
    errors.arrivalLocation = 'You must enter an arrival point';
  }

  if (dataToValidate.departureDateYear && !(isDateValid(dataToValidate.departureDateYear, dataToValidate.departureDateMonth, dataToValidate.departureDateDay))) {
    errors.departureDate = 'You must enter a valid date';
  }
  if (dataToValidate.arrivalDateYear && !(isDateValid(dataToValidate.arrivalDateYear, dataToValidate.arrivalDateMonth, dataToValidate.arrivalDateDay))) {
    errors.arrivalDate = 'You must enter a valid date';
  }

  // DoB must be valid and not in the future
  if (source === FORM_STEPS.NEW_PERSON && (dataToValidate.dateOfBirthYear || dataToValidate.dateOfBirthMonth || dataToValidate.dateOfBirthDay)) {
    const isValidFormat = isDateValid(dataToValidate.dateOfBirthYear, dataToValidate.dateOfBirthMonth, dataToValidate.dateOfBirthDay);
    const isDobInPast = isInThePast(dataToValidate.dateOfBirthYear, dataToValidate.dateOfBirthMonth, dataToValidate.dateOfBirthDay);

    if (!isValidFormat || !isDobInPast) {
      errors.dateOfBirth = 'You must enter a valid date of birth';
    }
  }

  // Expiry Date must be valid and in the future
  if (source === FORM_STEPS.NEW_PERSON && (dataToValidate.documentExpiryDateYear || dataToValidate.documentExpiryDateMonth || dataToValidate.documentExpiryDateDay)) {
    const isValidFormat = isDateValid(dataToValidate.documentExpiryDateYear, dataToValidate.documentExpiryDateMonth, dataToValidate.documentExpiryDateDay);
    const isExpiryDateInPast = isInThePast(dataToValidate.documentExpiryDateYear, dataToValidate.documentExpiryDateMonth, dataToValidate.documentExpiryDateDay);

    if (!isValidFormat || isExpiryDateInPast) {
      errors.documentExpiryDate = 'You must enter a valid document expiry date';
    }
  }

  // Time fields must be valid
  if (dataToValidate.departureTimeHour && !(isTimeValid(dataToValidate.departureTimeHour, dataToValidate.departureTimeMinute))) {
    errors.departureTime = 'You must enter a valid time';
  }
  if (dataToValidate.arrivalTimeHour && !(isTimeValid(dataToValidate.arrivalTimeHour, dataToValidate.arrivalTimeMinute))) {
    errors.arrivalTime = 'You must enter a valid time';
  }
  // Departure date must be in the future
  if (isTimeAndDateBeforeNow(
    dataToValidate.departureDateYear,
    dataToValidate.departureDateMonth,
    dataToValidate.departureDateDay,
    dataToValidate.departureTimeHour,
    dataToValidate.departureTimeMinute,
  )) {
    if (isDateToday(dataToValidate.departureDateYear, dataToValidate.departureDateMonth, dataToValidate.departureDateDay)) {
      errors.departureTime = 'You must enter a departure time in the future';
    } else {
      errors.departureDate = 'You must enter a departure date in the future';
    }
  }
  // Arrival date must be in the future
  if (isTimeAndDateBeforeNow(
    dataToValidate.arrivalDateYear,
    dataToValidate.arrivalDateMonth,
    dataToValidate.arrivalDateDay,
    dataToValidate.arrivalTimeHour,
    dataToValidate.arrivalTimeMinute,
  )) {
    if (isDateToday(dataToValidate.arrivalDateYear, dataToValidate.arrivalDateMonth, dataToValidate.arrivalDateDay)) {
      errors.arrivalTime = 'You must enter an arrival time in the future';
    } else {
      errors.arrivalDate = 'You must enter an arrival date in the future';
    }
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
    errors.arrivalDate = 'You must enter an arrival date after your departure';
  }

  if (errors) { scrollToTopOnError('voyageForm'); }
  return errors;
};

export default VoyageFormValidation;
