import '@testing-library/jest-dom/extend-expect';
import UserRegisterValidation from '../UserRegisterValidation';

const validData = {
  confirmEmail: 'John_Doe@test.com',
  confirmPassword: 'ABCdef23',
  email: 'John_Doe@test.com',
  firstName: 'John',
  lastName: 'Doe',
  mobileNumber: '07444112888',
  password: 'ABCdef23',
};

const invalidData = {
  confirmEmail: 'Jhon_Doe1234',
  confirmPassword: 'ABCd',
  email: 'Jhon_Doe532',
  firstName: 'Jhon',
  lastName: 'Doe',
  mobileNumber: 'abdcefghijklmnop',
  password: 'ABCde',
};

describe('UserRegisterValidation', () => {
  it('should have no errors', () => {
    expect(Object.keys(UserRegisterValidation(validData)).length).toEqual(0);
  });

  it('should have errors', () => {
    expect(Object.keys(UserRegisterValidation(invalidData)).length).not.toEqual(0);
  });
});
