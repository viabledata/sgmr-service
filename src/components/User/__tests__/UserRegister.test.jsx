import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import UserRegister from '../UserRegister';

describe('UserRegister page', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <UserRegister />
      </BrowserRouter>,
    );
  });

  it('should render page elements', async () => {
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

  it('should render errors', async () => {
    const submit = screen.getByText('Agree and submit');
    fireEvent.click(submit);

    expect(screen.queryByText('You must enter your first name')).toBeInTheDocument();
    expect(screen.queryByText('You must enter your last name')).toBeInTheDocument();
    expect(screen.queryByText('You must enter a valid phone number e.g. 07700 900982, +33 63998 010101')).toBeInTheDocument();
    expect(screen.queryByText('You must enter a valid email address')).toBeInTheDocument();
    expect(screen.queryByText('Enter your new password')).toBeInTheDocument();
  });
});
