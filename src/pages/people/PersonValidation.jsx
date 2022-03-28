import { isDateValid, isInThePast } from '../../utils/date';

const personValidationRules = {
  page1: [
    {
      inputField: 'firstName',
      errorDisplayId: 'firstName',
      type: 'required',
      message: 'You must enter a given name',
    },
    {
      inputField: 'lastName',
      errorDisplayId: 'lastName',
      type: 'required',
      message: 'You must enter a surname',
    },
    {
      inputField: 'dateOfBirthYear',
      errorDisplayId: 'dateOfBirth',
      type: 'required',
      message: 'You must enter a date of birth',
    },
    {
      inputField: 'dateOfBirthMonth',
      errorDisplayId: 'dateOfBirth',
      type: 'required',
      message: 'You must enter a date of birth',
    },
    {
      inputField: 'dateOfBirthDay',
      errorDisplayId: 'dateOfBirth',
      type: 'required',
      message: 'You must enter a date of birth',
    },
    {
      inputField: 'dateOfBirthDay',
      errorDisplayId: 'dateOfBirth',
      type: 'async',
      callback: async (formData) => {
        // DoB must be valid and not in the future
        if (formData.dateOfBirthYear || formData.dateOfBirthMonth || formData.dateOfBirthDay) {
          const isValidFormat = isDateValid(formData.dateOfBirthYear, formData.dateOfBirthMonth, formData.dateOfBirthDay);
          const isDobInPast = isInThePast(formData.dateOfBirthYear, formData.dateOfBirthMonth, formData.dateOfBirthDay);

          return isValidFormat && isDobInPast;
        }
        return true;
      },
      message: 'You must enter a valid date of birth',
    },
    {
      inputField: 'placeOfBirth',
      errorDisplayId: 'placeOfBirth',
      type: 'required',
      message: 'You must enter a place of birth',
    },
    {
      inputField: 'gender',
      errorDisplayId: 'gender',
      type: 'required',
      message: 'You must select a gender',
    },
  ],
  page2: [
    {
      inputField: 'documentType',
      errorDisplayId: 'documentType',
      type: 'required',
      message: 'You must select a document type',
    },
    {
      inputField: 'documentNumber',
      errorDisplayId: 'documentNumber',
      type: 'required',
      message: 'You must enter a document number',
    },
    {
      inputField: 'documentIssuingState',
      errorDisplayId: 'documentIssuingState',
      type: 'required',
      message: 'You must select a document issuing state',
    },
    {
      inputField: 'nationality',
      errorDisplayId: 'nationality',
      type: 'required',
      message: 'You must select a nationality',
    },
    {
      inputField: 'documentExpiryDateYear',
      errorDisplayId: 'documentExpiryDate',
      type: 'required',
      message: 'You must enter an expiry date',
    },
    {
      inputField: 'documentExpiryDateMonth',
      errorDisplayId: 'documentExpiryDate',
      type: 'required',
      message: 'You must enter an expiry date',
    },
    {
      inputField: 'documentExpiryDateDay',
      errorDisplayId: 'documentExpiryDate',
      type: 'required',
      message: 'You must enter an expiry date',
    },
    {
      inputField: 'documentExpiryDateDay',
      errorDisplayId: 'documentExpiryDate',
      type: 'async',
      callback: async (values) => {
        // Expiry Date must be valid and in the future
        if (values.documentExpiryDateYear || values.documentExpiryDateMonth || values.documentExpiryDateDay) {
          const isValidFormat = isDateValid(values.documentExpiryDateYear, values.documentExpiryDateMonth, values.documentExpiryDateDay);
          const isExpiryDateInPast = isInThePast(values.documentExpiryDateYear, values.documentExpiryDateMonth, values.documentExpiryDateDay);

          return isValidFormat && !isExpiryDateInPast;
        }
        return true;
      },
      message: 'You must enter a valid document expiry date',
    },
  ],
};

export default personValidationRules;
