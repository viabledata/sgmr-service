import React from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import PortField from '../PortField';
import { PORTS_URL } from '../../constants/ApiConstants';

jest.mock('lodash.debounce', () => (fn) => {
  fn.debounce = jest.fn();
  return fn;
});

describe('PortField', () => {
  const mockAxios = new MockAdapter(axios);

  beforeEach(() => {
    mockAxios.reset();
  });

  it('should render ports without error', async () => {
    mockAxios
      .onGet(`${PORTS_URL}?name=test`)
      .reply(200, [
        {
          name: 'TEST_NAME',
          unlocode: 'TEST_UNLOCODE',
        },
        {
          name: 'FOO',
          unlocode: 'BAR',
        },
      ]);

    render(<PortField />);

    await waitFor(() => fireEvent.change(screen.getByRole('combobox'), { target: { value: 'test' } }));

    expect(mockAxios.history.get.length).toBe(1);
    expect(screen.getAllByRole('option').length).toBe(2);
    expect(screen.queryByText('TEST_NAME (TEST_UNLOCODE)')).toBeInTheDocument();
    expect(screen.queryByText('FOO (BAR)')).toBeInTheDocument();
  });

  it('should render default unlocode when user clicks on port with no unlocode', async () => {
    mockAxios
      .onGet(`${PORTS_URL}?name=test`)
      .reply(200, [
        {
          name: 'TEST_NAME',
          unlocode: '',
        },
      ]);

    render(<PortField />);

    await waitFor(() => fireEvent.change(screen.getByRole('combobox'), { target: { value: 'test' } }));
    await waitFor(() => fireEvent.click(screen.getByText('TEST_NAME')));

    expect(screen.queryByRole('combobox').value).toBe('ZZZD');
  });

  it('should handle 500 response when getting ports gracefully', async () => {
    mockAxios
      .onGet(`${PORTS_URL}?name=test`)
      .reply(500);

    render(<PortField />);

    await waitFor(() => fireEvent.change(screen.getByRole('combobox'), { target: { value: 'test' } }));

    expect(screen.queryAllByRole('option').length).toBe(0);
    expect(screen.queryByRole('combobox').value).toBe('test');
  });
});
