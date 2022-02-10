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

  it('should render ports in the autosuggest field when we have suggestions', async () => {
    mockAxios
      .onGet(`${PORTS_URL}?name=test`)
      .reply(200, [
        {
          name: 'TEST_NAME',
          unlocode: 'TEST_UNLOCODE',
        },
        {
          name: 'TEST_FOO',
          unlocode: 'BAR',
        },
        {
          name: 'TEST_NO_UNLOCODE',
          unlocode: null,
        },
      ]);

    render(<PortField />);

    await waitFor(() => fireEvent.change(screen.getByRole('combobox'), { target: { value: 'test' } }));

    expect(mockAxios.history.get.length).toBe(1);
    expect(screen.getAllByRole('option').length).toBe(3);
    expect(screen.queryByText('TEST_NAME (TEST_UNLOCODE)')).toBeInTheDocument();
    expect(screen.queryByText('TEST_FOO (BAR)')).toBeInTheDocument();
    expect(screen.queryByText('TEST_NO_UNLOCODE')).toBeInTheDocument();
  });

  it('should render default unlocode when user clicks on port with no unlocode', async () => {
    mockAxios
      .onGet(`${PORTS_URL}?name=test`)
      .reply(200, [
        {
          name: 'TEST_NAME',
          unlocode: null,
        },
      ]);

    render(<PortField />);

    await waitFor(() => fireEvent.change(screen.getByRole('combobox'), { target: { value: 'test' } }));
    await waitFor(() => fireEvent.click(screen.getByText('TEST_NAME')));

    expect(screen.queryByRole('combobox').value).toBe('ZZZD');
    expect(screen.getByTestId('portOtherInput')).not.toBeVisible();
  });

  it('should allow user to enter a location in a free text field if they click cannot find location in list', async () => {
    render(<PortField />);

    expect(screen.getByTestId('portOtherInput')).not.toBeVisible();
    await waitFor(() => fireEvent.click(screen.getByText('I cannot find the location in the list')));
    expect(screen.getByTestId('portOtherInput')).toBeVisible();
  });
});
