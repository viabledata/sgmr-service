import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import UserRegister from '../UserRegister';
import { REGISTRATION_URL } from '../../../constants/ApiConstants';

const mockHistoryPush = jest.fn();
const mockHistoryGoBack = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
    goBack: mockHistoryGoBack,
  }),
}));

describe('UserRegister page', () => {
  const mockAxios = new MockAdapter(axios);

  beforeEach(() => {
    mockAxios.reset();
  });

  it('should render page elements', () => {
    render(
      <BrowserRouter>
        <UserRegister />
      </BrowserRouter>,
    );

    expect(screen.getByText('Create an account')).toBeInTheDocument();
    expect(screen.getByText('First name')).toBeInTheDocument();
    expect(screen.getByText('Last name')).toBeInTheDocument();
    expect(screen.getByText('Mobile number')).toBeInTheDocument();
    expect(screen.getByText('We will send an access code to this number. For international numbers include the country code.')).toBeInTheDocument();
    expect(screen.getByText('Email address')).toBeInTheDocument();
    expect(screen.getByText('You will use this to sign into your account.')).toBeInTheDocument();
    expect(screen.getByText('Confirm email address')).toBeInTheDocument();
    expect(screen.getByText('Create password')).toBeInTheDocument();
    expect(screen.getByText('Confirm password')).toBeInTheDocument();
    expect(screen.getByText('Declaration')).toBeInTheDocument();
    expect(screen.getByText('By creating this account, you agree:')).toBeInTheDocument();
    expect(screen.getByText('that the information you have provided is correct to the best of your knowledge')).toBeInTheDocument();
    expect(screen.getByText('that you have read and accept our')).toBeInTheDocument();
    expect(screen.getByText('privacy policy')).toBeInTheDocument();
    expect(screen.getByText('Agree and submit')).toBeInTheDocument();
  });

  it('should render errors', () => {
    render(
      <BrowserRouter>
        <UserRegister />
      </BrowserRouter>,
    );

    const submit = screen.getByText('Agree and submit');
    fireEvent.click(submit);

    expect(screen.queryByText('You must enter your first name')).toBeInTheDocument();
    expect(screen.queryByText('You must enter your last name')).toBeInTheDocument();
    expect(screen.queryByText('You must enter a valid phone number e.g. 07700 900982, +33 63998 010101')).toBeInTheDocument();
    expect(screen.queryByText('You must enter a valid email address')).toBeInTheDocument();
    expect(screen.queryByText('Enter your new password')).toBeInTheDocument();
  });

  it('should remove errors when an input is typed into', () => {
    render(
      <BrowserRouter>
        <UserRegister />
      </BrowserRouter>,
    );

    const submit = screen.getByText('Agree and submit');
    fireEvent.click(submit);

    expect(screen.queryByText('You must enter your first name')).toBeInTheDocument();
    fireEvent.change(screen.getByTestId('firstName-field'), { target: { value: 'J' } });
    expect(screen.queryByText('You must enter your first name')).not.toBeInTheDocument();
  });

  it('should handleSubmit when there are no errors', async () => {
    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      mobileNumber: '07444112888',
      email: 'john_doe@test.com',
      password: 'Password123!',
    };
    mockAxios.onPost(REGISTRATION_URL, formData).reply(200, {});

    render(
      <BrowserRouter>
        <UserRegister />
      </BrowserRouter>,
    );

    fireEvent.change(screen.getByTestId('firstName-field'), { target: { value: 'John' } });
    fireEvent.change(screen.getByTestId('lastName-field'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByTestId('mobileNumber-field'), { target: { value: '07444112888' } });
    fireEvent.change(screen.getByTestId('email-field'), { target: { value: 'john_doe@test.com' } });
    fireEvent.change(screen.getByTestId('confirmEmail-field'), { target: { value: 'john_doe@test.com' } });
    fireEvent.change(screen.getByTestId('password-field'), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByTestId('confirmPassword-field'), { target: { value: 'Password123!' } });

    fireEvent.click(screen.getByText('Agree and submit'));

    await waitFor(() => {
      expect(mockAxios.history.post.length).toBe(1);
      expect(mockHistoryPush).toHaveBeenCalledWith('/registration-confirmation?email=john_doe@test.com');
    });
  });

  it('should go back when user clicks back', () => {
    render(
      <BrowserRouter>
        <UserRegister />
      </BrowserRouter>,
    );

    fireEvent.click(screen.getByText('Back'));

    expect(mockHistoryGoBack).toHaveBeenCalled();
  });
});
