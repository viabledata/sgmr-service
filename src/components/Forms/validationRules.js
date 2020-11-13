export const VALID_EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const COMPLEX_PASSWORD_REGEX = /(\d+)|([a-z]+)|([A-Z]+)|([!@$%^&\\(){}[\]:;<>,*.?/~_+-=|]+)+/g;
export const VALID_MOBILE_REGEX = /^[0|+]([ 0-9]{3,20})$/i;

export const personValidationRules = [
  {
    inputField: 'firstName',
    errorDisplayId: 'firstName',
    rule: 'required',
    message: 'You must enter a first name',
  },
  {
    inputField: 'lastName',
    errorDisplayId: 'lastName',
    rule: 'required',
    message: 'You must enter a last name',
  },
  {
    inputField: 'peopleType',
    errorDisplayId: 'peopleType',
    rule: 'required',
    message: 'You must enter a person type',
  },
  {
    inputField: 'documentType',
    errorDisplayId: 'documentType',
    rule: 'required',
    message: 'You must select a document type',
  },
  {
    inputField: 'documentNumber',
    errorDisplayId: 'documentNumber',
    rule: 'required',
    message: 'You must enter a document number',
  },
  {
    inputField: 'documentIssuingState',
    errorDisplayId: 'documentIssuingState',
    rule: 'required',
    message: 'You must enter the document issuing state',
  },
  {
    inputField: 'documentExpiryDateYear',
    errorDisplayId: 'documentExpiryDate',
    rule: 'required',
    message: 'You must enter an expiry date',
  },
  {
    inputField: 'documentExpiryDateMonth',
    errorDisplayId: 'documentExpiryDate',
    rule: 'required',
    message: 'You must enter an expiry date',
  },
  {
    inputField: 'documentExpiryDateDay',
    errorDisplayId: 'documentExpiryDate',
    rule: 'required',
    message: 'You must enter an expiry date',
  },
  {
    inputField: 'gender',
    errorDisplayId: 'gender',
    rule: 'required',
    message: 'You must select a gender',
  },
  {
    inputField: 'dateOfBirthYear',
    errorDisplayId: 'dateOfBirth',
    rule: 'required',
    message: 'You must enter an expiry date',
  },
  {
    inputField: 'dateOfBirthMonth',
    errorDisplayId: 'dateOfBirth',
    rule: 'required',
    message: 'You must enter an expiry date',
  },
  {
    inputField: 'dateOfBirthDay',
    errorDisplayId: 'dateOfBirth',
    rule: 'required',
    message: 'You must enter a date of birth',
  },
  {
    inputField: 'placeOfBirth',
    errorDisplayId: 'placeOfBirth',
    rule: 'required',
    message: 'You must enter a place of birth',
  },
  {
    inputField: 'nationality',
    errorDisplayId: 'nationality',
    rule: 'required',
    message: 'You must enter a nationality',
  },
];

export const responsiblePersonValidationRules = [
  {
    inputField: 'responsibleGivenName',
    errorDisplayId: 'responsibleGivenName',
    rule: 'required',
    message: 'You must enter a first name',
  },
  {
    inputField: 'responsibleSurname',
    errorDisplayId: 'responsibleSurname',
    rule: 'required',
    message: 'You must enter a last name',
  },
  {
    inputField: 'responsibleContactNo',
    errorDisplayId: 'responsibleContactNo',
    rule: 'required',
    message: 'You must enter a contact number',
  },
  {
    inputField: 'responsibleAddressLine1',
    errorDisplayId: 'responsibleAddressLine1',
    rule: 'required',
    message: 'You must enter the first line of your address',
  },
  {
    inputField: 'responsibleAddressLine2',
    errorDisplayId: 'responsibleAddressLine2',
    rule: 'required',
    message: 'You must enter the second line of your address',
  },
  {
    inputField: 'responsibleTown',
    errorDisplayId: 'responsibleTown',
    rule: 'required',
    message: 'You must enter a town or a city name',
  },
  {
    inputField: 'responsibleCounty',
    errorDisplayId: 'responsibleCounty',
    rule: 'required',
    message: 'You must enter a country name',
  },
  {
    inputField: 'responsiblePostcode',
    errorDisplayId: 'responsiblePostcode',
    rule: 'required',
    message: 'You must enter a postcode',
  },
];

export const vesselValidationRules = [
  {
    inputField: 'vesselName',
    errorDisplayId: 'vesselName',
    rule: 'required',
    message: 'You must enter a vessel name',
  },
  {
    inputField: 'vesselType',
    errorDisplayId: 'vesselType',
    rule: 'required',
    message: 'You must enter a vessel type',
  },
  {
    inputField: 'moorings',
    errorDisplayId: 'moorings',
    rule: 'required',
    message: 'You must enter the vessel usual mooring',
  },
  {
    inputField: 'registration',
    errorDisplayId: 'registration',
    rule: 'required',
    message: 'You must enter the vessel registration',
  },
];

export const userValidationRules = [
  {
    inputField: 'firstName',
    errorDisplayId: 'firstName',
    rule: 'required',
    message: 'You must enter your first name',
  },
  {
    inputField: 'lastName',
    errorDisplayId: 'lastName',
    rule: 'required',
    message: 'You must enter your last name',
  },
  {
    inputField: 'mobileNumber',
    errorDisplayId: 'mobileNumber',
    rule: 'required',
    message: 'You must enter your mobile number',
  },
  {
    inputField: 'email',
    errorDisplayId: 'email',
    rule: 'required',
    message: 'You must enter your email address',
  },
];

export const arrivalValidationRules = [
  {
    inputField: 'arrivalDateYear',
    errorDisplayId: 'arrivalDate',
    rule: 'required',
    message: 'You must enter an arrival date',
  },
  {
    inputField: 'arrivalDateMonth',
    errorDisplayId: 'arrivalDate',
    rule: 'required',
    message: 'You must enter an arrival date',
  },
  {
    inputField: 'arrivalDateDay',
    errorDisplayId: 'arrivalDate',
    rule: 'required',
    message: 'You must enter an arrival date',
  },
  {
    inputField: 'arrivalTimeHour',
    errorDisplayId: 'arrivalTime',
    rule: 'required',
    message: 'You must enter an arrival time',
  },
  {
    inputField: 'arrivalTimeMinute',
    errorDisplayId: 'arrivalTime',
    rule: 'required',
    message: 'You must enter an arrival time',
  },
];

export const departureValidationRules = [
  {
    inputField: 'departureDateYear',
    errorDisplayId: 'departureDate',
    rule: 'required',
    message: 'You must enter a departure date',
  },
  {
    inputField: 'departureDateMonth',
    errorDisplayId: 'departureDate',
    rule: 'required',
    message: 'You must enter a departure date',
  },
  {
    inputField: 'departureDateDay',
    errorDisplayId: 'departureDate',
    rule: 'required',
    message: 'You must enter a departure date',
  },
  {
    inputField: 'departureTimeHour',
    errorDisplayId: 'departureTime',
    rule: 'required',
    message: 'You must enter a departure time',
  },
  {
    inputField: 'departureTimeMinute',
    errorDisplayId: 'departureTime',
    rule: 'required',
    message: 'You must enter a departure time',
  },
];

export const voyageValidationRules = [
  {
    inputField: 'vesselName',
    errorDisplayId: 'vesselName',
    rule: 'required',
    message: 'You must enter a vessel name',
  },
  {
    inputField: 'registration',
    errorDisplayId: 'registration',
    rule: 'required',
    message: 'You must enter a vessel registration',
  },
  {
    inputField: 'departureDateYear',
    errorDisplayId: 'departureDate',
    rule: 'required',
    message: 'You must enter a departure date',
  },
  {
    inputField: 'departureDateMonth',
    errorDisplayId: 'departureDate',
    rule: 'required',
    message: 'You must enter a departure date',
  },
  {
    inputField: 'departureDateDay',
    errorDisplayId: 'departureDate',
    rule: 'required',
    message: 'You must enter a departure date',
  },
  {
    inputField: 'departureTimeHour',
    errorDisplayId: 'departureTime',
    rule: 'required',
    message: 'You must enter a departure time',
  },
  {
    inputField: 'departureTimeMinute',
    errorDisplayId: 'departureTime',
    rule: 'required',
    message: 'You must enter a departure time',
  },
  {
    inputField: 'arrivalTimeHour',
    errorDisplayId: 'arrivalTime',
    rule: 'required',
    message: 'You must enter an arrival time',
  },
  {
    inputField: 'arrivalTimeMinute',
    errorDisplayId: 'arrivalTime',
    rule: 'required',
    message: 'You must enter an arrival time',
  },
  {
    inputField: 'arrivalDateYear',
    errorDisplayId: 'arrivalDate',
    rule: 'required',
    message: 'You must enter an arrival date',
  },
  {
    inputField: 'arrivalDateMonth',
    errorDisplayId: 'arrivalDate',
    rule: 'required',
    message: 'You must enter an arrival date',
  },
  {
    inputField: 'arrivalDateDay',
    errorDisplayId: 'arrivalDate',
    rule: 'required',
    message: 'You must enter an arrival date',
  },
  {
    inputField: 'responsibleGivenName',
    errorDisplayId: 'responsibleGivenName',
    rule: 'required',
    message: 'You must enter the responsible person\'s details',
  },
];

export const dateValidation = (name, value) => {
  switch (name) {
    case 'documentExpiryDateYear':
      return /^(19|20)\d{2}$/i.test(value)
        ? { documentExpiryDateYear: value }
        : 'error';
    case 'documentExpiryDateMonth':
      return /^(0?[1-9]|1[012])$/i.test(value)
        ? { documentExpiryDateMonth: value }
        : 'error';
    case 'documentExpiryDateDay':
      return /^(0?[1-9]|[12][0-9]|3[01])$/i.test(value)
        ? { documentExpiryDateDay: value }
        : 'error';

    case 'dateOfBirthYear':
      return /^(19|20)\d{2}$/i.test(value)
        ? { dateOfBirthYear: value }
        : 'error';
    case 'dateOfBirthMonth':
      return /^(0?[1-9]|1[012])$/i.test(value)
        ? { dateOfBirthMonth: value }
        : 'error';
    case 'dateOfBirthDay':
      return /^(0?[1-9]|[12][0-9]|3[01])$/i.test(value)
        ? { dateOfBirthDay: value }
        : 'error';

    case 'departureDateYear':
      return /^(19|20)\d{2}$/i.test(value)
        ? { departureDateYear: value }
        : 'error';
    case 'departureDateMonth':
      return /^(0?[1-9]|1[012])$/i.test(value)
        ? { departureDateMonth: value }
        : 'error';
    case 'departureDateDay':
      return /^(0?[1-9]|[12][0-9]|3[01])$/i.test(value)
        ? { departureDateDay: value }
        : 'error';
    default: return null;
  }
};

// Validates if password is 8 characters long and contain 3 of the following:
// an uppercase letter, a lowercase letter, a symbol, a number
export const passwordValidation = (password) => {
  if (!password) {
    return 'Enter your new password';
  }
  if (password && password.length < 8) {
    return 'Passwords must be at least 8 characters long';
  }
  if (password.match(COMPLEX_PASSWORD_REGEX).length < 3) {
    return 'The password must contain 3 of the following: an uppercase letter, a lowercase letter, a symbol, a number';
  }
};
