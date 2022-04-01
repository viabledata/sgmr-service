import React from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Dashboard from '../Dashboard';
import { USER_VOYAGE_REPORT_URL, VOYAGE_REPORT_URL } from '../../constants/ApiConstants';
import { pageSizeParam } from '../../lib/config';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  Link: ({ children }) => children,
}));

const renderPage = () => {
  return render(
    <Dashboard pageData="/voyage-plans" />,
  );
};

describe('Dashboard', () => {
  const mockAxios = new MockAdapter(axios);

  beforeEach(() => {
    mockAxios.reset();
  });

  it('should filter by status correctly', async () => {
    mockAxios
      .onGet(`${USER_VOYAGE_REPORT_URL}?${pageSizeParam}`)
      .reply(200, {
        items: [
          {
            departureDate: '2022-12-30',
            departurePort: 'GB BPT',
            departureTime: '12:00:00',
            id: '1',
            status: {
              name: 'Draft',
            },
          },
          {
            departureDate: '2022-12-30',
            departurePort: 'GB BPT',
            departureTime: '12:00:00',
            id: '2',
            status: {
              name: 'Submitted',
            },
          },
          {
            departureDate: '2022-12-30',
            departurePort: 'GB BPT',
            departureTime: '12:00:00',
            id: '3',
            status: {
              name: 'PreSubmitted',
            },
          },
          {
            departureDate: '2022-12-30',
            departurePort: 'GB BPT',
            departureTime: '12:00:00',
            id: '4',
            status: {
              name: 'Cancelled',
            },
          },
          {
            departureDate: '2022-12-30',
            departurePort: 'GB BPT',
            departureTime: '12:00:00',
            id: '5',
            status: {
              name: 'PreCancelled',
            },
          },
          {
            departureDate: '2022-12-30',
            departurePort: 'GB BPT',
            departureTime: '12:00:00',
            id: '6',
            status: {
              name: 'Failed',
            },
          },
        ],
      });
    renderPage();

    await waitFor(() => {
      expect(screen.getByTestId('draft-count')).toHaveTextContent(1);
      // Count should include Submitted, PreSubmitted and Failed reports
      expect(screen.getByTestId('submitted-count')).toHaveTextContent(3);
      // Count should include Cancelled and PreCancelled
      expect(screen.getByTestId('cancelled-count')).toHaveTextContent(2);
    });
  });

  it('should delete voyage plan if departure data is missing', async () => {
    mockAxios
      .onGet(`${USER_VOYAGE_REPORT_URL}?${pageSizeParam}`)
      .reply(200, {
        items: [
          {
            departureDate: '2022-12-30', departurePort: 'GB BPT', departureTime: '12:00:00', id: '1', status: { name: 'Draft' },
          },
          { id: '2', status: { name: 'Draft' } },
        ],
      });

    mockAxios.onDelete(`${VOYAGE_REPORT_URL}/2`).reply(200);
    renderPage();

    await waitFor(() => {
      expect(mockAxios.history.delete.length).toBe(1);
      expect(screen.getByTestId('draft-count')).toHaveTextContent(1);
    });
  });

  it('should redirect when a user clicks start now', async () => {
    mockAxios
      .onGet(`${USER_VOYAGE_REPORT_URL}?${pageSizeParam}`)
      .reply(200, {
        items: [],
      });

    renderPage();

    await waitFor(() => {
      fireEvent.click(screen.getByText('Start now'));

      expect(mockHistoryPush).toHaveBeenCalled();
      expect(mockHistoryPush).toHaveBeenCalledWith('/voyage-plans/start');
    });
  });
});
