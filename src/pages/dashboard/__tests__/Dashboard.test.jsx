import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { USER_URL, USER_VOYAGE_REPORT_URL } from '../../../constants/ApiConstants';
import { pageSizeParam } from '../../../lib/config';
import mockedNewUser from '../../__fixtures__/NewUser.fixture.json';
import Dashboard from '../Dashboard';

describe('Dashboard', () => {
  const mockAxios = new MockAdapter(axios);

  beforeEach(() => {
    mockAxios.reset();
  });

  it('should load with common content', async () => {
    mockAxios
      .onGet(`${USER_VOYAGE_REPORT_URL}?${pageSizeParam}`)
      .reply(200, { items: [] })
      .onGet(USER_URL)
      .reply(200, mockedNewUser);

    await waitFor(() => render(<Dashboard />));
    expect(screen.getByText('Create a voyage plan')).toBeInTheDocument();
    expect(screen.getByText('Tell Border Force and HMRC that you are planning to sail to or from the UK.')).toBeInTheDocument();
    expect(screen.getByText('Create a new voyage plan')).toBeInTheDocument();
    expect(screen.getByText('Manage your voyage plans')).toBeInTheDocument();
    expect(screen.getByText('You can view, update or cancel voyage plans you created up to 12 months ago.')).toBeInTheDocument();
  });

  // it should load with onboarding
  // it should show counts
  // it should colour button grey or green depending on onboarding
});
