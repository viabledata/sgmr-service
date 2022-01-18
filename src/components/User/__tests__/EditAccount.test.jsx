import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import EditAccount from '../EditAccount';
import UserContext from '../../UserContext';

// Creates the EditAccount page filled with user details
const renderPage = (page, { userDetails }) => {
  return render(
    <BrowserRouter>
      <UserContext.Provider value={userDetails}>
        {page}
      </UserContext.Provider>
    </BrowserRouter>,
  );
};

const userDetails = {
  user: {
    dateCreated: '2020-10-05T09:39:21.824679',
    email: 'John_Doe@test.com',
    firstName: 'John',
    id: '44acf985-1982-49aa-ac3b-15d365de163a',
    lastName: 'Doe',
    lastUpdated: '2020-10-08T09:55:35.504039',
    mobileNumber: '07444112888',
    people: [],
    role: { name: 'User', id: '2a960d7a-6bca-4453-8f5c-acbb8b0f9403' },
    state: 'verified',
    vessels: [],
  },
};

describe('Edit Account page details', () => {
  it('should prepopulate the form with the users details', () => {
    renderPage(<EditAccount />, { userDetails });

    expect(screen.getByText('First name')).toBeInTheDocument();
    expect(screen.getByText('Last name')).toBeInTheDocument();
    expect(screen.getByText('Telephone number')).toBeInTheDocument();
    expect(screen.getByDisplayValue('John')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('07444112888')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Save changes');
  });
});

describe('Edit Account page errors', () => {
  // Remove values from inputs
  beforeEach(() => {
    renderPage(<EditAccount />, { userDetails });
    const saveChanges = screen.getByText('Save changes');
    fireEvent.change(screen.getByTestId('test-firstName'), { target: { value: '' } });
    fireEvent.change(screen.getByTestId('test-lastName'), { target: { value: '' } });
    fireEvent.change(screen.getByTestId('test-mobileNumber'), { target: { value: '' } });

    fireEvent.click(saveChanges);
  });

  it('should render errors when save changes is clicked and inputs are empty', () => {
    expect(screen.queryAllByText('You must enter your first name')).toHaveLength(2);
    expect(screen.queryAllByText('You must enter your last name')).toHaveLength(2);
    expect(screen.queryAllByText('You must enter your telephone number')).toHaveLength(2);
  });

  it('should remove errors when the user types', () => {
    fireEvent.change(screen.getByTestId('test-firstName'), { target: { value: 'J' } });
    fireEvent.change(screen.getByTestId('test-lastName'), { target: { value: 'D' } });
    fireEvent.change(screen.getByTestId('test-mobileNumber'), { target: { value: '0' } });

    expect(screen.queryByText('You must enter your first name')).not.toBeInTheDocument();
    expect(screen.queryByText('You must enter your last name')).not.toBeInTheDocument();
    expect(screen.queryByText('You must enter your telephone number')).not.toBeInTheDocument();
    expect(screen.queryByText('You must enter a valid telephone number e.g. 07700 900982, +33 63998 010101')).not.toBeInTheDocument();
  });

  it('should throw an error when telephone number is not valid', () => {
    const saveChanges = screen.getByText('Save changes');
    fireEvent.change(screen.getByTestId('test-mobileNumber'), { target: { value: 'a' } });
    fireEvent.click(saveChanges);

    expect(screen.queryAllByText('You must enter a valid telephone number e.g. 07700 900982, +33 63998 010101')).toHaveLength(2);
  });

  it('should navigate to the input error when error summary link is clicked', () => {
    const firstName = screen.getByTestId('firstName');
    const lastName = screen.getByTestId('lastName');
    const telephone = screen.getByTestId('mobileNumber');

    fireEvent.click(firstName);
    expect(firstName).toHaveAttribute('href', '#firstName');

    fireEvent.click(lastName);
    expect(lastName).toHaveAttribute('href', '#lastName');

    fireEvent.click(telephone);
    expect(telephone).toHaveAttribute('href', '#mobileNumber');
  });
});
