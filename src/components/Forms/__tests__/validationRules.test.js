import { passwordValidation, responsiblePersonValidationRules, validate } from '../validationRules';

describe('passwordValidation', () => {
  const passwords = [
    { password: '', message: 'Enter your new password' },
    { password: '123', message: 'Passwords must be at least 8 characters long' },
    { password: '12345678', message: 'The password must contain 3 of the following: an uppercase letter, a lowercase letter, a symbol, a number' },
    { password: 'abc@@@@@', message: 'The password must contain 3 of the following: an uppercase letter, a lowercase letter, a symbol, a number' },
    { password: 'abcEFG1234' },
    { password: 'abc123!@#$%^&' },
  ];
  passwords.forEach(({ password, message }) => {
    it(`Should validate ${password || '[empty string]'}`, () => {
      expect(passwordValidation(password)).toEqual(message);
    });
  });
});

describe('validate', () => {
  // Testing errors when inputs are null or empty
  const data = {
    responsibleAddressLine1: '123 Street',
    responsibleContactNo: '01234567891',
    responsibleCounty: 'County',
    responsiblePostcode: 'AB1 2CD',
    responsibleGivenName: null,
    responsibleSurname: '',
    responsibleTown: 'Town'
  }
  it ('should validate the data and create an error object when data is missing', async () => {
    expect(await validate(responsiblePersonValidationRules, data))
    .toEqual({responsibleGivenName: 'You must enter a first name', responsibleSurname: 'You must enter a last name'})
  })
})