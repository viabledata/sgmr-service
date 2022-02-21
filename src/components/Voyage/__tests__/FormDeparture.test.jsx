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
    expect(screen.getAllByRole('textbox').length).toBe(7); // day, month, year, hour, minute, port input
    expect(screen.getAllByRole('combobox').length).toBe(1); // port
    expect(screen.getByRole('combobox')).toHaveAttribute('id', 'portsCombobox');
    expect(screen.getByRole('combobox')).toHaveAttribute('name', 'departurePort');
  });
});
