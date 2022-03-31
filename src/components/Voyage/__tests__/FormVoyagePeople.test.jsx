import React from 'react';
import {
  render, screen, waitFor, within,
} from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { PEOPLE_URL } from '../../../constants/ApiConstants';
import FormVoyagePeople from '../FormVoyagePeople';

describe('People table', () => {
  const mockAxios = new MockAdapter(axios);

  beforeEach(() => {
    mockAxios.reset();
  });

  it('should render people in alphabetical order by lastName then firstName', async () => {
    mockAxios
      .onGet(PEOPLE_URL)
      .reply(200, [
        {
          id: '1',
          firstName: 'Bob',
          lastName: 'Smith',
          peopleType: {
            name: 'Crew',
          },
        },
        {
          id: '2',
          firstName: 'Amy',
          lastName: 'Smith',
          peopleType: {
            name: 'Crew',
          },
        },
        {
          id: '3',
          firstName: 'William',
          lastName: 'Adams',
          peopleType: {
            name: 'Crew',
          },
        },
        {
          id: '4',
          firstName: 'zac',
          lastName: 'allan',
          peopleType: {
            name: 'Crew',
          },
        },
      ]);

    render(
      <FormVoyagePeople voyageId="123" />,
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
