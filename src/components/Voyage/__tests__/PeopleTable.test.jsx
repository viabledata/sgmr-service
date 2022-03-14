import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PeopleTable from '../PeopleTable';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ children }) => children,
}));

const peopleData = [
  {
    firstName: 'John',
    lastName: 'Doe',
    id: '1',
  },
  {
    firstName: 'Jane',
    lastName: 'Boe',
    id: '2',
  },
];

describe('PeopleTable', () => {
  it('should render the page with saved people', () => {
    const selectionChange = jest.fn();
    render(
      <PeopleTable peopleData={peopleData} onSelectionChange={selectionChange} />,
    );

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.getByText('Boe')).toBeInTheDocument();
  });

  it('should check a checkbox', () => {
    const selectionChange = jest.fn();
    render(
      <PeopleTable peopleData={peopleData} onSelectionChange={selectionChange} />,
    );

    fireEvent.click(screen.getByTestId('1'));
    expect(selectionChange).toHaveBeenCalled();
  });

  it('should uncheck a checked checkbox', () => {
    const selectionChange = jest.fn();
    render(
      <PeopleTable peopleData={peopleData} onSelectionChange={selectionChange} />,
    );

    fireEvent.click(screen.getByTestId('1'));
    fireEvent.click(screen.getByTestId('1'));
    expect(selectionChange).toHaveBeenCalled();
    // Is called once by use effect then twice more when checkbox is clicked
    expect(selectionChange).toHaveBeenCalledTimes(3);
  });
});
