export const peopleRules = [
  {
    field: 'firstName',
    rule: 'required',
    message: 'You must enter a first name',
  },
  {
    field: 'lastName',
    rule: 'required',
    message: 'You must enter a last name',
  },
  {
    field: 'peopleType',
    rule: 'required',
    message: 'You must enter a person type',
  },
  {
    field: 'documentType',
    rule: 'required',
    message: 'You must select a document type',
  },
  {
    field: 'documentNumber',
    rule: 'required',
    message: 'You must enter a document number',
  },
  {
    field: 'documentIssuingState',
    rule: 'required',
    message: 'You must enter the document issuing state',
  },
  {
    field: 'documentExpiryDateYear', // testing against year as it's the last piece of the date field
    rule: 'required',
    message: 'You must enter an expiry date',
  },
  {
    field: 'gender',
    rule: 'required',
    message: 'You must select a gender',
  },
  {
    field: 'dateOfBirthYear',
    rule: 'required',
    message: 'You must enter a date of birth',
  },
  {
    field: 'placeOfBirth',
    rule: 'required',
    message: 'You must enter a place of birth',
  },
  {
    field: 'nationality',
    rule: 'required',
    message: 'You must enter a nationality',
  },
];
