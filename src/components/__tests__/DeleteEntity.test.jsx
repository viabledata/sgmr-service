import React from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import '@testing-library/jest-dom/extend-expect';

import { BrowserRouter } from 'react-router-dom';
import { AlertContextProvider } from '../AlertContext';
import DeleteEntity from '../DeleteEntity';
import { VESSELS_URL } from '../../constants/ApiConstants';

// Mocking AlertContext
const renderPage = (props = {
  title: 'Success',
  heading: 'Pleasure craft successfully deleted.',
  entity: 'pleasure craft',
  baseURL: VESSELS_URL,
  redirectURL: '/pleasure-crafts',
}, alertContext = null, setAlertContext = jest.fn()) => {
  return render(
    <BrowserRouter>
      <AlertContextProvider value={{ alertContext, setAlertContext }}>
        <DeleteEntity notification={props} />
      </AlertContextProvider>
    </BrowserRouter>,
  );
};

describe('DeleteEntity', () => {
  const mockAxios = new MockAdapter(axios);

  beforeEach(() => {
    mockAxios.reset();
  });

  it('should render page and elements correctly', () => {
    renderPage();

    expect(screen.getByText('Are you sure you want to delete this pleasure craft?')).toBeInTheDocument();
    expect(screen.getByText('Continue')).toBeInTheDocument();
  });

  it('should invoke delete function on submit', async () => {
    mockAxios.onDelete(`${VESSELS_URL}/1a2b3c`)
      .reply(200);
    renderPage();

    fireEvent.click(screen.getByTestId('confirm-yes'));
    fireEvent.click(screen.getByText('Continue'));

    await waitFor(() => {
      expect(mockAxios.history.delete.length).toBe(1);
    });
  });

  it('should handle errors correctly', async () => {
    mockAxios.onDelete(`${VESSELS_URL}/1a2b3c`)
      .reply(500);
    renderPage();

    fireEvent.click(screen.getByTestId('confirm-yes'));
    fireEvent.click(screen.getByText('Continue'));

    await waitFor(() => {
      expect(screen.getByText('Cannot delete this pleasure craft right now, try again later')).toBeInTheDocument();
    });
  });
});
