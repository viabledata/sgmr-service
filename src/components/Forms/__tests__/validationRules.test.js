import { passwordValidation } from '@components/Forms/validationRules';

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
