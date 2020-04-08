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
    default: return null;
  }
};

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
