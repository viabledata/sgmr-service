import React from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import ManageReports from '../ManageReports';
import { USER_VOYAGE_REPORT_URL, VOYAGE_REPORT_URL } from '../../constants/ApiConstants';
import { pageSizeParam } from '../../lib/config';

// Mocking Link in Browser Router
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ children }) => children,
}));

// Mocking result of pagination hook
jest.mock('../../utils/usePagination', () => ({
  usePagination: jest.fn().mockReturnValue([1]),
}));

const renderPage = () => {
  return render(
    <ManageReports pageData="/voyage-plans" />,
  );
};

describe('ManageReports', () => {
  const mockAxios = new MockAdapter(axios);

  beforeEach(() => {
    mockAxios.reset();
  });

  it('should display draft reports on load', async () => {
    mockAxios
      .onGet(`${USER_VOYAGE_REPORT_URL}?${pageSizeParam}&page=1&status=Draft`)
      .reply(200, {
        _meta: {
          toatalItems: 2,
        },
        items: [
          {
            vesselName: 'Boat 1',
            departureDate: '2022-12-30',
            departurePort: 'GB BPT',
            departureTime: '12:00:00',
            arrivalPort: 'GB BPT',
            id: '1',
            status: {
              name: 'Draft',
            },
          },
          {
            vesselName: 'Boat 2',
            departureDate: '2022-12-30',
            departurePort: 'GB BPT',
            departureTime: '12:00:00',
            arrivalPort: 'GB BPT',
            id: '2',
            status: {
              name: 'Draft',
            },
          },
        ],
      });
    renderPage();

    await waitFor(() => {
      expect(screen.getByText('Manage your voyage plans')).toBeInTheDocument();
      expect(screen.getAllByText('Draft').length).toBe(2);
      expect(screen.getByText('Submitted')).toBeInTheDocument();
      expect(screen.getByText('Cancelled')).toBeInTheDocument();
      expect(screen.getByText('Boat 1')).toBeInTheDocument();
      expect(screen.getByText('Boat 2')).toBeInTheDocument();
    });
  });

  it('should display submitted reports on submitted tab', async () => {
    // Draft reports load on page render
    mockAxios
      .onGet(`${USER_VOYAGE_REPORT_URL}?${pageSizeParam}&page=1&status=Draft`)
      .reply(200, {
        _meta: {
          toatalItems: 2,
        },
        items: [],
      });

    // Second call when status tab changes
    mockAxios
      .onGet(`${USER_VOYAGE_REPORT_URL}?${pageSizeParam}&page=1&status=Submitted&status=PreSubmitted&status=Failed`)
      .reply(200, {
        _meta: {
          toatalItems: 3,
        },
        items: [
          {
            vesselName: 'Boat 1',
            departureDate: '2022-12-30',
            departurePort: 'GB BPT',
            departureTime: '12:00:00',
            arrivalPort: 'GB BPT',
            id: '1',
            status: {
              name: 'Submitted',
            },
          },
          {
            vesselName: 'Boat 2',
            departureDate: '2022-12-30',
            departurePort: 'GB BPT',
            departureTime: '12:00:00',
            arrivalPort: 'GB BPT',
            id: '2',
            status: {
              name: 'PreSubmitted',
            },
          },
          {
            vesselName: 'Boat 3',
            departureDate: '2022-12-30',
            departurePort: 'GB BPT',
            departureTime: '12:00:00',
            arrivalPort: 'GB BPT',
            id: '3',
            status: {
              name: 'Failed',
            },
          },
        ],
      });
    renderPage();

    fireEvent.click(screen.getByText('Submitted'));

    await waitFor(() => {
      expect(screen.getAllByText('Submitted').length).toBe(2);
      expect(screen.getByText('Boat 1')).toBeInTheDocument();
      expect(screen.getByText('Boat 2')).toBeInTheDocument();
      expect(screen.getByText('Boat 3')).toBeInTheDocument();
    });
  });

  it('should display cancelled reports on cancelled tab', async () => {
    mockAxios
      .onGet(`${USER_VOYAGE_REPORT_URL}?${pageSizeParam}&page=1&status=Draft`)
      .reply(200, {
        _meta: {
          toatalItems: 2,
        },
        items: [],
      });

    mockAxios
      .onGet(`${USER_VOYAGE_REPORT_URL}?${pageSizeParam}&page=1&status=Cancelled&status=PreCancelled`)
      .reply(200, {
        _meta: {
          toatalItems: 2,
        },
        items: [
          {
            vesselName: 'Boat 1',
            departureDate: '2022-12-30',
            departurePort: 'GB BPT',
            departureTime: '12:00:00',
            arrivalPort: 'GB BPT',
            id: '1',
            status: {
              name: 'Cancelled',
            },
          },
          {
            vesselName: 'Boat 2',
            departureDate: '2022-12-30',
            departurePort: 'GB BPT',
            departureTime: '12:00:00',
            arrivalPort: 'GB BPT',
            id: '2',
            status: {
              name: 'PreCancelled',
            },
          },
        ],
      });
    renderPage();

    fireEvent.click(screen.getByText('Cancelled'));

    await waitFor(() => {
      expect(screen.getAllByText('Cancelled').length).toBe(2);
      expect(screen.getByText('Boat 1')).toBeInTheDocument();
      expect(screen.getByText('Boat 2')).toBeInTheDocument();
    });
  });

  it('should delete a voyage plan if departure data is missing', async () => {
    mockAxios
      .onGet(`${USER_VOYAGE_REPORT_URL}?${pageSizeParam}&page=1&status=Draft`)
      .reply(200, {
        _meta: {
          toatalItems: 2,
        },
        items: [
          {
            vesselName: 'Boat 1',
            departureDate: '2022-12-30',
            departurePort: 'GB BPT',
            departureTime: '12:00:00',
            arrivalPort: 'GB BPT',
            id: '1',
            status: {
              name: 'Draft',
            },
          },
          {
            vesselName: 'Boat 2',
            id: '2',
            status: {
              name: 'Draft',
            },
          },
        ],
      });

    mockAxios.onDelete(`${VOYAGE_REPORT_URL}/2`).reply(200);
    renderPage();

    await waitFor(() => {
      expect(mockAxios.history.delete.length).toBe(1);
      expect(screen.getByText('Boat 1')).toBeInTheDocument();
      expect(screen.queryByText('Boat 2')).not.toBeInTheDocument();
    });
  });
});