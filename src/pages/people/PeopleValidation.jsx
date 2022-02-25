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
      callback: async (value, formData) => {
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
  ],
};

export default personValidationRules;
