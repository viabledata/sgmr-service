import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import FormArrival from '../FormArrival';
import FormVoyageContainer from '../VoyageFormContainer';

describe('FormArrival', () => {
  it('should render without errors', async () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/save-voyage/page-2' }]}>
        <FormVoyageContainer>
          <FormArrival />
        </FormVoyageContainer>
      </MemoryRouter>,
    );

    expect(screen.getByText('Intended arrival details')).toBeInTheDocument();
    expect(screen.getByText('Provide the intended arrival details for the voyage. You can update these details if your voyage plan changes because of '
      + 'the weather or an emergency on board.')).toBeInTheDocument();
    expect(screen.getByText('Arrival date')).toBeInTheDocument();
    expect(screen.getByText('For example, 20 2 2020')).toBeInTheDocument();
    expect(screen.getByText('Estimated arrival time (UTC)')).toBeInTheDocument();
    expect(screen.getByText('For example, 17 30')).toBeInTheDocument();
    expect(screen.getByText('Hour')).toBeInTheDocument();
    expect(screen.getByText('Minute')).toBeInTheDocument();
    expect(screen.getByText('Country of arrival')).toBeInTheDocument();
    expect(screen.getByText('Name of arrival port or location')).toBeInTheDocument();
    expect(screen.getByText('I cannot find the location in the list')).toBeInTheDocument();
    expect(screen.getByText('Save and continue')).toBeInTheDocument();
    expect(screen.getByText('Save and come back later')).toBeInTheDocument();

    expect(screen.getAllByRole('textbox').length).toBe(6); // day, month, year, hour, minute
    expect(screen.getAllByRole('combobox').length).toBe(2); // port
    expect(screen.getByTestId('portContainer')).toHaveAttribute('id', 'portsCombobox');
    expect(screen.getByTestId('portContainer')).toHaveAttribute('name', 'arrivalPort');
  });
});
