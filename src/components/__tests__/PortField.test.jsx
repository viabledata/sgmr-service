import React from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

    await waitFor(() => fireEvent.change(screen.getByRole('combobox'), { target: { value: 'TEST_FOO' } }));

    expect(mockAxios.history.get.length).toBe(2);
    expect(screen.queryByText('TEST_NAME (TEST_UNLOCODE)')).toBeInTheDocument();
    expect(screen.queryByText('TEST_FOO (BAR)')).toBeInTheDocument();
    expect(screen.queryByText('TEST_NO_UNLOCODE')).toBeInTheDocument();
  });

  it('should allow user to enter a location in a free text field if they click cannot find location in list', async () => {
    render(<PortField />);
    expect(screen.getByTestId('portOther')).not.toBeVisible();
    await waitFor(() => fireEvent.click(screen.getByText('I cannot find the location in the list')));
    expect(screen.getByTestId('portOther')).toBeVisible();
    expect(screen.getByTestId('portOtherInput')).toBeVisible();
    fireEvent.change(screen.getByTestId('portOtherInput'), { target: { value: 'TEST' } });
    expect(screen.getByTestId('portOtherInput').value).toBe('TEST');
  });

  it('should clear the value of combo box when optional field entered and vice versa', async () => {
    mockAxios
      .onGet(`${PORTS_URL}?name=test`)
      .reply(200, [
        {
          name: 'TEST_NAME',
          unlocode: null,
        },
      ]);

    render(<PortField />);

    expect(screen.getByTestId('portOther')).not.toBeVisible();
    fireEvent.change(screen.getByTestId('port'), { target: { value: 'TEST2' } });
    await waitFor(() => fireEvent.click(screen.getByText('I cannot find the location in the list')));
    fireEvent.change(screen.getByTestId('portOtherInput'), { target: { value: 'TEST' } });
    expect(screen.getByTestId('port').value).toBe('');

    fireEvent.change(screen.getByTestId('port'), { target: { value: 'test' } });
    userEvent.selectOptions(screen.getByTestId('portContainer'), 'TEST_NAME');
    expect(screen.getByTestId('portOtherInput').value).toBe('');
  });
});
