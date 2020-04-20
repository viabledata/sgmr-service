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

export const vesselValidationRules = [
  {
    inputField: 'vesselName',
    rule: 'required',
    message: 'You must enter a vessel name',
  },
  {
    inputField: 'vesselType',
    rule: 'required',
    message: 'You must enter a vessel type',
  },
  {
    inputField: 'moorings',
    rule: 'required',
    message: 'You must enter the vessel usual mooring',
  },
  {
    inputField: 'registration',
    rule: 'required',
    message: 'You must enter the vessel registration',
  },
];

export const voyageValidationRules = [
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

export const timeValidation = (name, value) => {
  switch (name) {
    case 'departureTimeHour':
      return /^([0-9]|0[0-9]|1[0-9]|2[0-3])$/.test(value)
        ? { departureTimeHour: value }
        : 'error';
    case 'departureTimeMinute':
      return /^[0-5][0-9]$/.test(value)
        ? { departureTimeMinute: value }
        : 'error';
    default: return null;
  }
};
