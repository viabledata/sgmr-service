// App imports
import { userValidationRules } from '@components/Forms/validationRules';
import ScrollToTopOnError from '@utils/ScrollToTopOnError';


const UserRegisterValidation = (dataToValidate) => {
  const fieldsErroring = {};

  // Required fields must not be null
  userValidationRules.map((rule) => {
    // eslint-disable-next-line no-unused-expressions
    (!(rule.inputField in dataToValidate) || dataToValidate[rule.inputField] === '')
      ? fieldsErroring[rule.errorDisplayId] = rule.message
      : null;
  });

  // Email field must be valid
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(dataToValidate.email)) {
    fieldsErroring.email = 'You must enter a valid email address';
  }

  // Mobile Number field must be valid
  if (!parseInt(dataToValidate.mobileNumber, 10)) {
    fieldsErroring.mobileNumber = 'You must enter a valid phone number';
  }

  // Password field must be at least 8 characters
  if (dataToValidate.password && dataToValidate.password.length < 8) {
    fieldsErroring.password = 'Passwords must be at least 8 characters long';
  }

  // Confirm email must match email
  if (dataToValidate.email) {
    if (!dataToValidate.confirmEmail || dataToValidate.email.toLowerCase() !== dataToValidate.confirmEmail.toLowerCase()) {
      fieldsErroring.confirmEmail = 'Email addresses must match';
    }
  }

  // Confirm password must match email
  if (dataToValidate.password) {
    if (dataToValidate.password !== dataToValidate.confirmPassword) {
      fieldsErroring.confirmPassword = 'Passwords must match';
    }
  }

  ScrollToTopOnError(fieldsErroring);
  return fieldsErroring;
};

export default UserRegisterValidation;
