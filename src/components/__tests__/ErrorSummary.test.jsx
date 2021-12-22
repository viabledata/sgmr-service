import React from 'react';
import { render, screen } from '@testing-library/react';

import ErrorSummary from '@components/ErrorSummary';
import Banner from '../Banner';

test('Renders the ErrorSummary with errors', () => {
  render(<ErrorSummary errors={['Error 1', 'Other error']} />);
  expect(screen.getByTestId('error-summary'))
    .toHaveTextContent(
      'There is a problem'
      + 'Error 1'
      + 'Other error',
    );
});

test('Does NOT render the ErrorSummary without errors', () => {
  render(<Banner />);
  expect(screen.queryByTestId('error-summary')).toBeNull();
});
