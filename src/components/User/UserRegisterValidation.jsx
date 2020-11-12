import {
  passwordValidation,
  userValidationRules,
  VALID_EMAIL_REGEX,
  VALID_MOBILE_REGEX,
} from '@components/Forms/validationRules';
import scrollToTopOnError from '@utils/scrollToTopOnError';

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
  if (!VALID_EMAIL_REGEX.test(dataToValidate.email)) {
    fieldsErroring.email = 'You must enter a valid email address';
  }

  // Mobile Number field must be valid
  if (!(VALID_MOBILE_REGEX.test(dataToValidate.mobileNumber))) {
    fieldsErroring.mobileNumber = 'You must enter a valid phone number';
  }


  // Password must be complex
  const passwordValidationError = passwordValidation(dataToValidate.password);
  if (passwordValidationError) {
    fieldsErroring.password = passwordValidationError;
  }

  // Confirm email must match email
  if (dataToValidate.email) {
    if (!dataToValidate.confirmEmail || dataToValidate.email.toLowerCase() !== dataToValidate.confirmEmail.toLowerCase()) {
      fieldsErroring.confirmEmail = 'Email addresses must match';
    }
  }

  // Confirm password must match password
  if (dataToValidate.password) {
    if (dataToValidate.password !== dataToValidate.confirmPassword) {
      fieldsErroring.confirmPassword = 'Passwords must match';
    }
  }

  scrollToTopOnError(fieldsErroring);
  return fieldsErroring;
};

export default UserRegisterValidation;
