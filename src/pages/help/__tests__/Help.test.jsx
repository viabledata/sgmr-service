import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Help from '../Help';
import { USER_VOYAGE_REPORT_URL } from '../../../constants/ApiConstants';

const mockHistoryPush = jest.fn();
const mockHistoryGoBack = jest.fn();

// Mocking useHistory
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
    goBack: mockHistoryGoBack.mock,
  }),
}));

describe('Help', () => {
  const mockAxios = new MockAdapter(axios);

  beforeEach(() => {
    mockAxios.reset();
  });

  it('should render the help with the CTAs for the voyage form', () => {
    render(<Help source="voyage" />);

    const contentH1 = screen.getByText('Telling us about your voyage plan');
    expect(contentH1.outerHTML).toEqual('<h1 class="govuk-heading-l">Telling us about your voyage plan</h1>');
    expect(screen.getByText(
      'You can draft a voyage plan anytime. You should submit your plan at least two hours before you depart, but no more than 24 hours before you depart.',
    )).toBeInTheDocument();
    expect(screen.getByText(
      'We\'ll ask you when you plan to depart and arrive, and where from. You can enter a time range of up to 1 hour for your intended departure and arrival times.',
    )).toBeInTheDocument();

    const contentH2 = screen.getByText('If your voyage plan changes');
    expect(contentH2.outerHTML).toEqual('<h2 class="govuk-heading-s">If your voyage plan changes</h2>');
    expect(screen.getByText(
      'We expect you to update your voyage plan for our records, as soon as possible.',
    )).toBeInTheDocument();
    expect(screen.getByText(
      'This includes changes to the date, departure or arrival point, people on board and significant changes to your intended departure or arrival time.',
    )).toBeInTheDocument();
    expect(screen.getByText('You can sign into your account to change the voyage plan you submitted.')).toBeInTheDocument();

    const contentH3 = screen.getByText(
      'In an emergency, or if you can\'t update your account online, you should call Border Force as soon as possible.',
    );
    expect(contentH3.outerHTML).toEqual(
      '<h3 class="govuk-heading-s">In an emergency, or if you can\'t update your account online, you should call Border Force as soon as possible.</h3>',
    );
    expect(screen.getByText('The number which you call depends upon which UK region you arrive to or depart from:')).toBeInTheDocument();
    expect(screen.getByText('South: +44 (0)1293 501266')).toBeInTheDocument();
    expect(screen.getByText('South East: +44 (0)130 329 9157')).toBeInTheDocument();
    expect(screen.getByText('North: +44 (0)300 106 5725')).toBeInTheDocument();
    expect(screen.getByText('Central: +44 (0)300 072 4322')).toBeInTheDocument();

    const primaryButton = screen.getByTitle('saveButton');
    expect(primaryButton).toHaveTextContent('Continue');
    expect(primaryButton.outerHTML).toEqual(
      '<button title="saveButton" type="button" class="govuk-button" data-module="govuk-button">Continue</button>',
    );

    const secondaryButton = screen.getByTitle('cancelButton');
    expect(secondaryButton).toHaveTextContent('Cancel');
    expect(secondaryButton.outerHTML).toEqual(
      '<button title="cancelButton" type="button" class="govuk-button govuk-button--secondary" data-module="govuk-button">Cancel</button>',
    );
  });

  it('should make a post request when user clicks continue', async () => {
    mockAxios
      .onPost(USER_VOYAGE_REPORT_URL)
      .reply(200, { id: '1', status: { name: 'Draft' } });

    render(<Help source="voyage" />);

    fireEvent.click(screen.getByText('Continue'));

    await waitFor(() => {
      expect(mockAxios.history.post.length).toBe(1);
    });
  });

  it('should redirect the user when they click cancel', async () => {
    render(<Help source="voyage" />);

    fireEvent.click(screen.getByText('Cancel'));

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith('/voyage-plans');
    });
  });
});
