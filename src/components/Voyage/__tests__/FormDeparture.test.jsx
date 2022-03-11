import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import FormDeparture from '../FormDeparture';
import FormVoyageContainer from '../VoyageFormContainer';

describe('FormDeparture', () => {
  it('should render without errors', async () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/save-voyage/page-1' }]}>
        <FormVoyageContainer>
          <FormDeparture />
        </FormVoyageContainer>
      </MemoryRouter>,
    );

    expect(screen.getByText('Intended departure details')).toBeInTheDocument();
    expect(screen.getByText('Provide the intended departure details for the voyage. You can update these details if your voyage plan changes because of '
      + 'the weather or an emergency on board.')).toBeInTheDocument();
    expect(screen.getByText('Departure date')).toBeInTheDocument();
    expect(screen.getByText('For example, 20 2 2020')).toBeInTheDocument();
    expect(screen.getByText('Estimated departure time (UTC)')).toBeInTheDocument();
    expect(screen.getByText('For example, 17 30')).toBeInTheDocument();
    expect(screen.getByText('Hour')).toBeInTheDocument();
    expect(screen.getByText('Minute')).toBeInTheDocument();
    expect(screen.getByText('Country of departure')).toBeInTheDocument();
    expect(screen.getByText('Name of departure port or location')).toBeInTheDocument();
    expect(screen.getByText('I cannot find the location in the list')).toBeInTheDocument();
    expect(screen.getByText('Save and continue')).toBeInTheDocument();
    expect(screen.getByText('Save and come back later')).toBeInTheDocument();

    expect(screen.getAllByRole('textbox').length).toBe(6); // day, month, year, hour, minute
    expect(screen.getAllByRole('combobox').length).toBe(2); // port
    expect(screen.getByTestId('portContainer')).toHaveAttribute('id', 'portsCombobox');
    expect(screen.getByTestId('portContainer')).toHaveAttribute('name', 'departurePort');
  });
});
