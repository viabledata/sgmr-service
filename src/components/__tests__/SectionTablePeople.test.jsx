import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  render, screen, waitFor, within,
} from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { PEOPLE_URL } from '../../constants/ApiConstants';
import SectionTablePeople from '../SectionTablePeople';

describe('People table', () => {
  const mockAxios = new MockAdapter(axios);

  beforeEach(() => {
    mockAxios.reset();
  });

  it('should render people in alphabetical order by lastName then firstName', async () => {
    mockAxios
      .onGet(`${PEOPLE_URL}?pagination=false`)
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
      ]);

    render(
      <BrowserRouter>
        <SectionTablePeople
          page="/people"
          pageData={{ reportTitles: ['Last Name', 'First Name', 'Type'] }}
        />
      </BrowserRouter>,
    );
    await waitFor(() => {
      expect(mockAxios.history.get.length).toBe(1);
    });

    const rows = screen.getAllByTestId('row');
    // test first names appear in correct order based on sort by lastName>firstName
    expect(within(rows[0]).queryByText('William')).toBeInTheDocument();
    expect(within(rows[1]).queryByText('Amy')).toBeInTheDocument();
    expect(within(rows[2]).queryByText('Bob')).toBeInTheDocument();
    // test last names appear based on sort by lastName>firstName
    expect(within(rows[0]).queryByText('Adams')).toBeInTheDocument();
    expect(within(rows[1]).queryByText('Smith')).toBeInTheDocument();
    expect(within(rows[2]).queryByText('Smith')).toBeInTheDocument();
  });
});
