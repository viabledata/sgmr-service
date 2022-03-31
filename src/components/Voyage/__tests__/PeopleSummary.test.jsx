import React from 'react';
import {
  render, screen, waitFor, within,
} from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { VOYAGE_REPORT_URL } from '../../../constants/ApiConstants';
import PeopleSummary from '../PeopleSummary';

describe('People table', () => {
  const mockAxios = new MockAdapter(axios);

  beforeEach(() => {
    mockAxios.reset();
  });

  it('should render people in alphabetical order by lastName then firstName', async () => {
    mockAxios
      .onGet(`${VOYAGE_REPORT_URL}/123/people`)
      .reply(200, {
        items: [
          {
            dateOfBirth: '1990-01-01',
            documentExpiryDate: '2050-01-01',
            documentIssuingState: 'GBR',
            documentNumber: '1',
            documentType: 'Passport',
            firstName: 'Bob',
            gender: 'Male',
            id: '1',
            lastName: 'Smith',
            nationality: 'HTI',
            peopleType: { name: 'Skipper' },
            placeOfBirth: 'london',
          },
          {
            dateOfBirth: '1990-01-01',
            documentExpiryDate: '2050-01-01',
            documentIssuingState: 'GBR',
            documentNumber: '2',
            documentType: 'Passport',
            firstName: 'Amy',
            gender: 'Male',
            id: '2',
            lastName: 'Smith',
            nationality: 'HTI',
            peopleType: { name: 'Skipper' },
            placeOfBirth: 'london',
          },
          {
            dateOfBirth: '1990-01-01',
            documentExpiryDate: '2050-01-01',
            documentIssuingState: 'GBR',
            documentNumber: '3',
            documentType: 'Passport',
            firstName: 'William',
            gender: 'Male',
            id: '3',
            lastName: 'Adams',
            nationality: 'HTI',
            peopleType: { name: 'Skipper' },
            placeOfBirth: 'london',
          },
          {
            dateOfBirth: '1990-01-01',
            documentExpiryDate: '2050-01-01',
            documentIssuingState: 'GBR',
            documentNumber: '4',
            documentType: 'Passport',
            firstName: 'zac',
            gender: 'Male',
            id: '4',
            lastName: 'allan',
            nationality: 'HTI',
            peopleType: { name: 'Skipper' },
            placeOfBirth: 'london',
          },
        ],
      });

    render(
      <PeopleSummary voyageId="123" />,
    );
    await waitFor(() => {
      expect(mockAxios.history.get.length).toBe(1);
    });

    const rows = screen.getAllByTestId('row');
    // test first names appear in correct order based on sort by lastName>firstName
    expect(within(rows[0]).queryByText('William')).toBeInTheDocument();
    expect(within(rows[1]).queryByText('zac')).toBeInTheDocument();
    expect(within(rows[2]).queryByText('Amy')).toBeInTheDocument();
    expect(within(rows[3]).queryByText('Bob')).toBeInTheDocument();
    // test last names appear based on sort by lastName>firstName
    expect(within(rows[0]).queryByText('Adams')).toBeInTheDocument();
    expect(within(rows[1]).queryByText('allan')).toBeInTheDocument();
    expect(within(rows[2]).queryByText('Smith')).toBeInTheDocument();
    expect(within(rows[3]).queryByText('Smith')).toBeInTheDocument();
  });
});
