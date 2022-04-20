/* eslint-disable jest/no-commented-out-tests */
import React from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
} from '@testing-library/react';

import PortField from '../PortField';

jest.mock('lodash.debounce', () => (fn) => {
  fn.debounce = jest.fn();
  return fn;
});

describe('PortField', () => {
  beforeEach(() => {
    render(<PortField />);
  });

  it('should allow user to enter a location in a free text field if they click cannot find location in list', async () => {
    expect(screen.getByTestId('portOther')).not.toBeVisible();

    await waitFor(() => fireEvent.click(screen.getByText('I cannot find the location in the list')));
    expect(screen.getByTestId('portOther')).toBeVisible();
    expect(screen.getByTestId('portOtherInput')).toBeVisible();

    fireEvent.change(screen.getByTestId('portOtherInput'), { target: { value: 'TEST' } });
    expect(screen.getByTestId('portOtherInput').value).toBe('TEST');
  });

  it('should mirror the input of the the free text field on the combobox input when the free text field input changed', async () => {
    expect(screen.getByTestId('portOther')).not.toBeVisible();
    fireEvent.change(screen.getByTestId('portInput'), { target: { value: 'OTHER_VALUE' } });

    await waitFor(() => fireEvent.click(screen.getByText('I cannot find the location in the list')));
    fireEvent.change(screen.getByTestId('portOtherInput'), { target: { value: 'TEST' } });
    expect(screen.getByTestId('portInput').value).toBe('TEST');
  });
});
