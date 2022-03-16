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
    expect(screen.getAllByRole('textbox').length).toBe(6); // day, month, year, hour, minute
    expect(screen.getAllByRole('combobox').length).toBe(1); // port
    expect(screen.getByTestId('portContainer')).toHaveAttribute('id', 'portsCombobox');
  });
});
