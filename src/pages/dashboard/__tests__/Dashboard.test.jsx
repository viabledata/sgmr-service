import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { USER_URL, USER_VOYAGE_REPORT_URL } from '../../../constants/ApiConstants';
import { pageSizeParam } from '../../../lib/config';
import mockedNewUser from '../../__fixtures__/NewUser.fixture.json';
import mockedUserWithPeople from '../../__fixtures__/UserWithPeople.fixture.json';
import mockedUserWithPeopleAndVessels from '../../__fixtures__/UserWithPeopleAndVessels.fixture.json';
import mockedUserWithVessels from '../../__fixtures__/UserWithVessels.fixture.json';
import mockedVoyageReports from '../../__fixtures__/VoyageReports.fixture.json';
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

    await waitFor(() => render(<Router><Dashboard /></Router>));
    expect(screen.getByText('Welcome back, Fred')).toBeInTheDocument();
    expect(screen.getByText('Create a voyage plan')).toBeInTheDocument();
    expect(screen.getByText('Tell Border Force and HMRC that you are planning to sail to or from the UK.')).toBeInTheDocument();
    expect(screen.getByText('Create a new voyage plan')).toBeInTheDocument();
    expect(screen.getByText('Manage your voyage plans')).toBeInTheDocument();
    expect(screen.getByText('You can view, update or cancel voyage plans you created up to 12 months ago.')).toBeInTheDocument();
  });

  it('should show 0 counts of your voyages when there are none', async () => {
    mockAxios
      .onGet(`${USER_VOYAGE_REPORT_URL}?${pageSizeParam}`)
      .reply(200, { items: [] })
      .onGet(USER_URL)
      .reply(200, mockedNewUser);

    await waitFor(() => render(<Router><Dashboard /></Router>));
    expect(screen.getByTestId('draft-count')).toHaveTextContent(0);
    // Count should include Submitted, PreSubmitted and Failed reports
    expect(screen.getByTestId('submitted-count')).toHaveTextContent(0);
    // Count should include Cancelled and PreCancelled
    expect(screen.getByTestId('cancelled-count')).toHaveTextContent(0);
  });

  it('should show the counts of your voyages', async () => {
    mockAxios
      .onGet(`${USER_VOYAGE_REPORT_URL}?${pageSizeParam}`)
      .reply(200, mockedVoyageReports)
      .onGet(USER_URL)
      .reply(200, mockedNewUser);

    await waitFor(() => render(<Router><Dashboard /></Router>));
    expect(screen.getByTestId('draft-count')).toHaveTextContent(3);
    // Count should include Submitted, PreSubmitted and Failed reports
    expect(screen.getByTestId('submitted-count')).toHaveTextContent(5);
    // Count should include Cancelled and PreCancelled
    expect(screen.getByTestId('cancelled-count')).toHaveTextContent(2);
  });

  it('should show onboarding section when conditions are met', async () => {
    // conditions: user has no people, user has no vessels, voyage has no reports
    mockAxios
      .onGet(`${USER_VOYAGE_REPORT_URL}?${pageSizeParam}`)
      .reply(200, { items: [] })
      .onGet(USER_URL)
      .reply(200, mockedNewUser);

    await waitFor(() => render(<Router><Dashboard /></Router>));
    // Onboarding section
    expect(screen.getByText('Add information to your account')).toBeInTheDocument();
    // eslint-disable-next-line max-len
    expect(screen.getByText('Save time in the future by adding your pleasure craft and travel document details for the skipper and people you frequently sail with.')).toBeInTheDocument();
    expect(screen.getByText('Start now')).toBeInTheDocument();
  });

  it('should NOT show onboarding section when voyage reports exist', async () => {
    // condition tested: user has no people, user has no vessels, voyage HAS reports
    mockAxios
      .onGet(`${USER_VOYAGE_REPORT_URL}?${pageSizeParam}`)
      .reply(200, mockedVoyageReports)
      .onGet(USER_URL)
      .reply(200, mockedNewUser);

    await waitFor(() => render(<Router><Dashboard /></Router>));
    // Onboarding section
    expect(screen.queryByText('Add information to your account')).not.toBeInTheDocument();
    // eslint-disable-next-line max-len
    expect(screen.queryByText('Save time in the future by adding your pleasure craft and travel document details for the skipper and people you frequently sail with.')).not.toBeInTheDocument();
    expect(screen.queryByText('Start now')).not.toBeInTheDocument();
  });

  it('should NOT show onboarding section when vessels exist', async () => {
    // conditions: user has no people, user HAS vessels, voyage has no reports
    mockAxios
      .onGet(`${USER_VOYAGE_REPORT_URL}?${pageSizeParam}`)
      .reply(200, { items: [] })
      .onGet(USER_URL)
      .reply(200, mockedUserWithVessels);

    await waitFor(() => render(<Router><Dashboard /></Router>));
    // Onboarding section
    expect(screen.queryByText('Add information to your account')).not.toBeInTheDocument();
    // eslint-disable-next-line max-len
    expect(screen.queryByText('Save time in the future by adding your pleasure craft and travel document details for the skipper and people you frequently sail with.')).not.toBeInTheDocument();
    expect(screen.queryByText('Start now')).not.toBeInTheDocument();
  });

  it('should NOT show onboarding section when people exist', async () => {
    // conditions: user HAS people, user has no vessels, voyage has no reports
    mockAxios
      .onGet(`${USER_VOYAGE_REPORT_URL}?${pageSizeParam}`)
      .reply(200, { items: [] })
      .onGet(USER_URL)
      .reply(200, mockedUserWithPeople);

    await waitFor(() => render(<Router><Dashboard /></Router>));
    // Onboarding section
    expect(screen.queryByText('Add information to your account')).not.toBeInTheDocument();
    // eslint-disable-next-line max-len
    expect(screen.queryByText('Save time in the future by adding your pleasure craft and travel document details for the skipper and people you frequently sail with.')).not.toBeInTheDocument();
    expect(screen.queryByText('Start now')).not.toBeInTheDocument();
  });

  it('should NOT show onboarding section when people, vessels, and voyages exist', async () => {
    // conditions: user HAS people, user has no vessels, voyage has no reports
    mockAxios
      .onGet(`${USER_VOYAGE_REPORT_URL}?${pageSizeParam}`)
      .reply(200, mockedVoyageReports)
      .onGet(USER_URL)
      .reply(200, mockedUserWithPeopleAndVessels);

    await waitFor(() => render(<Router><Dashboard /></Router>));
    // Onboarding section
    expect(screen.queryByText('Add information to your account')).not.toBeInTheDocument();
    // eslint-disable-next-line max-len
    expect(screen.queryByText('Save time in the future by adding your pleasure craft and travel document details for the skipper and people you frequently sail with.')).not.toBeInTheDocument();
    expect(screen.queryByText('Start now')).not.toBeInTheDocument();
  });

  it('should show the create a new voyage plan button as a secondary button when onboarding is true', async () => {
    // conditions: user has no people, user HAS vessels, voyage has no reports
    mockAxios
      .onGet(`${USER_VOYAGE_REPORT_URL}?${pageSizeParam}`)
      .reply(200, { items: [] })
      .onGet(USER_URL)
      .reply(200, mockedNewUser);

    await waitFor(() => render(<Router><Dashboard /></Router>));
    expect(screen.getByText('Create a new voyage plan')).toHaveClass('govuk-button');
    expect(screen.getByText('Create a new voyage plan')).toHaveClass('govuk-button--secondary');
  });

  it('should show the create a new voyage plan button as a primary button when onboarding is true', async () => {
    // conditions: user has no people, user HAS vessels, voyage has no reports
    mockAxios
      .onGet(`${USER_VOYAGE_REPORT_URL}?${pageSizeParam}`)
      .reply(200, { items: [] })
      .onGet(USER_URL)
      .reply(200, mockedUserWithPeopleAndVessels);

    await waitFor(() => render(<Router><Dashboard /></Router>));
    expect(screen.getByText('Create a new voyage plan')).toHaveClass('govuk-button');
    expect(screen.getByText('Create a new voyage plan')).not.toHaveClass('govuk-button--secondary');
  });
  // test api fails
});
