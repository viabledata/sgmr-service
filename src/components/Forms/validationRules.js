import * as axios from 'axios';
import { COUNTRIES_URL } from '../../constants/ApiConstants';
import Auth from '../../lib/Auth';
import { isDateValid, isInThePast } from '../../utils/date';

export const VALID_EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const COMPLEX_PASSWORD_REGEX = /(\d+)|([a-z]+)|([A-Z]+)|([!@$%^&\\(){}[\]:;<>,*.?/~_+-=|]+)+/g;
export const VALID_MOBILE_REGEX = /^[0|+]([ 0-9]{3,20})$/i;
export const VALID_INTERNATIONAL_MOBILE_REGEX = /^[0-9-+()" "]*$/;

export const personValidationRules = [
  {
    inputField: 'firstName',
    errorDisplayId: 'firstName',
    type: 'required',
    message: 'You must enter a first name',
  },
  {
    inputField: 'lastName',
    errorDisplayId: 'lastName',
    type: 'required',
    message: 'You must enter a last name',
  },
  {
    inputField: 'gender',
    errorDisplayId: 'gender',
    type: 'required',
    message: 'You must select a gender',
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
  {
    inputField: 'placeOfBirth',
    errorDisplayId: 'placeOfBirth',
    type: 'required',
    message: 'You must enter a place of birth',
  },
  {
    inputField: 'nationality',
    errorDisplayId: 'nationality',
    type: 'required',
    message: 'You must enter a nationality',
  },
  {
    inputField: 'peopleType',
    errorDisplayId: 'peopleType',
    type: 'required',
    message: 'You must enter a person type',
  },
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
    message: 'You must enter the document issuing state',
  },
  {
    inputField: 'documentIssuingState',
    errorDisplayId: 'documentIssuingState',
    type: 'async',
    callback: async (value) => {
      const resp = await axios.get(`${COUNTRIES_URL}?iso3=${encodeURIComponent(value)}`, {
        headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
      });
      return resp.data.data.length > 0;
    },
    message: 'You must enter a valid ISO country code',
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
    callback: async (value, values) => {
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
];

export const responsiblePersonValidationRules = [
  {
    inputField: 'responsibleGivenName',
    errorDisplayId: 'responsibleGivenName',
    type: 'required',
    message: 'You must enter a first name',
  },
  {
    inputField: 'responsibleSurname',
    errorDisplayId: 'responsibleSurname',
    type: 'required',
    message: 'You must enter a last name',
  },
  {
    inputField: 'responsibleContactNo',
    errorDisplayId: 'responsibleContactNo',
    type: 'required',
    message: 'You must enter a contact number',
  },
  {
    inputField: 'responsibleAddressLine1',
    errorDisplayId: 'responsibleAddressLine1',
    type: 'required',
    message: 'You must enter a first address line',
  },
  {
    inputField: 'responsibleTown',
    errorDisplayId: 'responsibleTown',
    type: 'required',
    message: 'You must enter a town or a city name',
  },
  {
    inputField: 'responsibleCounty',
    errorDisplayId: 'responsibleCounty',
    type: 'required',
    message: 'You must enter a country name',
  },
];

export const vesselValidationRules = [
  {
    inputField: 'vesselName',
    errorDisplayId: 'vesselName',
    type: 'required',
    message: 'You must enter a pleasure craft name',
  },
  {
    inputField: 'vesselType',
    errorDisplayId: 'vesselType',
    type: 'required',
    message: 'You must enter a pleasure craft type',
  },
  {
    inputField: 'moorings',
    errorDisplayId: 'moorings',
    type: 'required',
    message: 'You must enter the pleasure craft usual mooring',
  },
  {
    inputField: 'registration',
    errorDisplayId: 'registration',
    type: 'required',
    message: 'You must enter the pleasure craft registration',
  },
];

export const userValidationRules = [
  {
    inputField: 'firstName',
    errorDisplayId: 'firstName',
    type: 'required',
    message: 'You must enter your first name',
  },
  {
    inputField: 'lastName',
    errorDisplayId: 'lastName',
    type: 'required',
    message: 'You must enter your last name',
  },
  {
    inputField: 'mobileNumber',
    errorDisplayId: 'mobileNumber',
    type: 'required',
    message: 'You must enter your mobile number',
  },
  {
    inputField: 'email',
    errorDisplayId: 'email',
    type: 'required',
    message: 'You must enter your email address',
  },
];

export const arrivalValidationRules = [
  {
    inputField: 'arrivalDateYear',
    errorDisplayId: 'arrivalDate',
    type: 'required',
    message: 'You must enter an arrival date',
  },
  {
    inputField: 'arrivalDateMonth',
    errorDisplayId: 'arrivalDate',
    type: 'required',
    message: 'You must enter an arrival date',
  },
  {
    inputField: 'arrivalDateDay',
    errorDisplayId: 'arrivalDate',
    type: 'required',
    message: 'You must enter an arrival date',
  },
  {
    inputField: 'arrivalTimeHour',
    errorDisplayId: 'arrivalTime',
    type: 'required',
    message: 'You must enter an arrival time',
  },
  {
    inputField: 'arrivalTimeMinute',
    errorDisplayId: 'arrivalTime',
    type: 'required',
    message: 'You must enter an arrival time',
  },
];

export const departureValidationRules = [
  {
    inputField: 'departureDateYear',
    errorDisplayId: 'departureDate',
    type: 'required',
    message: 'You must enter a departure date',
  },
  {
    inputField: 'departureDateMonth',
    errorDisplayId: 'departureDate',
    type: 'required',
    message: 'You must enter a departure date',
  },
  {
    inputField: 'departureDateDay',
    errorDisplayId: 'departureDate',
    type: 'required',
    message: 'You must enter a departure date',
  },
  {
    inputField: 'departureTimeHour',
    errorDisplayId: 'departureTime',
    type: 'required',
    message: 'You must enter a departure time',
  },
  {
    inputField: 'departureTimeMinute',
    errorDisplayId: 'departureTime',
    type: 'required',
    message: 'You must enter a departure time',
  },
];

export const voyageValidationRules = [
  {
    inputField: 'departureDateYear',
    errorDisplayId: 'departureDate',
    type: 'required',
    message: 'You must enter a departure date',
  },
  {
    inputField: 'departureDateMonth',
    errorDisplayId: 'departureDate',
    type: 'required',
    message: 'You must enter a departure date',
  },
  {
    inputField: 'departureDateDay',
    errorDisplayId: 'departureDate',
    type: 'required',
    message: 'You must enter a departure date',
  },
  {
    inputField: 'departureTimeHour',
    errorDisplayId: 'departureTime',
    type: 'required',
    message: 'You must enter a departure time',
  },
  {
    inputField: 'departureTimeMinute',
    errorDisplayId: 'departureTime',
    type: 'required',
    message: 'You must enter a departure time',
  },
  {
    inputField: 'arrivalTimeHour',
    errorDisplayId: 'arrivalTime',
    type: 'required',
    message: 'You must enter an arrival time',
  },
  {
    inputField: 'arrivalTimeMinute',
    errorDisplayId: 'arrivalTime',
    type: 'required',
    message: 'You must enter an arrival time',
  },
  {
    inputField: 'arrivalDateYear',
    errorDisplayId: 'arrivalDate',
    type: 'required',
    message: 'You must enter an arrival date',
  },
  {
    inputField: 'arrivalDateMonth',
    errorDisplayId: 'arrivalDate',
    type: 'required',
    message: 'You must enter an arrival date',
  },
  {
    inputField: 'arrivalDateDay',
    errorDisplayId: 'arrivalDate',
    type: 'required',
    message: 'You must enter an arrival date',
  },
  {
    inputField: 'vesselName',
    errorDisplayId: 'vesselName',
    type: 'required',
    message: 'You must enter a pleasure craft name',
  },
  {
    inputField: 'registration',
    errorDisplayId: 'registration',
    type: 'required',
    message: 'You must enter a pleasure craft registration',
  },
  {
    inputField: 'responsibleGivenName',
    errorDisplayId: 'responsibleGivenName',
    type: 'required',
    message: 'You must enter the responsible person\'s details',
  },
];

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

export const validate = async (rules, data) => {
  const errors = {};
  if (rules) {
    const promises = rules.map((rule) => {
      return new Promise((resolve) => {
        const value = data[rule.inputField];
        switch (rule.type) {
          case 'pattern':
            if (value && !rule.pattern.test(value)) {
              return { [rule.errorDisplayId]: rule.message };
            }
            break;
          case 'async':
            if (value) {
              rule.callback(value, data).then((valid) => {
                if (!valid) {
                  resolve({ [rule.errorDisplayId]: rule.message });
                } else {
                  resolve(undefined);
                }
              });
            } else {
              resolve(undefined);
            }
            break;
          case 'required':
            if (value === '' || !value) {
              resolve({ [rule.errorDisplayId]: rule.message });
            } else {
              resolve(undefined);
            }
            break;
          default:
        }
      });
    });

    const results = await Promise.all(promises);
    return results.filter(Boolean).reduce((acc, error) => {
      if (error) {
        return {
          ...error,
          ...acc,
        };
      }
    }, {});
  }
  return errors;
};
