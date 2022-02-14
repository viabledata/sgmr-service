import { passwordValidation, responsiblePersonValidationRules, validate } from '../validationRules';

describe('passwordValidation', () => {
  const passwords = [
    ['', 'Enter your new password'],
    ['123', 'Passwords must be at least 8 characters long'],
    ['12345678', 'The password must contain 3 of the following: an uppercase letter, a lowercase letter, a symbol, a number'],
    ['abcdefgh', 'The password must contain 3 of the following: an uppercase letter, a lowercase letter, a symbol, a number'],
    ['ABCDEFGH', 'The password must contain 3 of the following: an uppercase letter, a lowercase letter, a symbol, a number'],
    ['abcdEFGH', 'The password must contain 3 of the following: an uppercase letter, a lowercase letter, a symbol, a number'],
    ['!@#$%^&*', 'The password must contain 3 of the following: an uppercase letter, a lowercase letter, a symbol, a number'],
    ['ABC@@@@@', 'The password must contain 3 of the following: an uppercase letter, a lowercase letter, a symbol, a number'],
    ['abc@@@@@', 'The password must contain 3 of the following: an uppercase letter, a lowercase letter, a symbol, a number'],
    ['ABC12345', 'The password must contain 3 of the following: an uppercase letter, a lowercase letter, a symbol, a number'],
    ['abc12345', 'The password must contain 3 of the following: an uppercase letter, a lowercase letter, a symbol, a number'],
    ['1234@@@@', 'The password must contain 3 of the following: an uppercase letter, a lowercase letter, a symbol, a number'],
    ['abcEFG12345', undefined],
    ['abcEFG!@#$%^&', undefined],
    ['abc123!@#$%^&', undefined],
    ['ABC123!@#$%^&', undefined],
  ];

  test.each(passwords)(
    'Should validate %s as &s',
    (password, message) => {
      expect(passwordValidation(password)).toEqual(message);
    },
  );
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
    responsibleTown: 'Town',
  };
  it('should validate the data and create an error object when data is missing', async () => {
    expect(await validate(responsiblePersonValidationRules, data))
      .toEqual({ responsibleGivenName: 'You must enter a first name', responsibleSurname: 'You must enter a last name' });
  });
});
