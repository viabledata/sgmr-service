import React from 'react';

// app imports

const Validate = (formData) => {
  const validationCheck = [];

  switch (formData) {
    case 'email': (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) ? 'valid' : validationCheck.push({ email: 'Email address required' }); break;
  //   // case 'confirmEmail': formData.email.toLowerCase() === formData.confirmEmail.toLowerCase() ? removeError('confirmEmail') : setErrors({ ...errors, confirmEmail: errorText }); break;
  //   // case 'confirmPassword': formData.password === formData.confirmPassword ? removeError('confirmPassword') : setErrors({ ...errors, confirmPassword: errorText }); break;
    default: null;
  }

  return validationCheck;
};

export default Validate;
