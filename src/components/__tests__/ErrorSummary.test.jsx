import React from 'react';
import { render, screen } from '@testing-library/react';

import ErrorSummary from '@components/ErrorSummary';
import Banner from '../Banner';

describe('Error summary', () => {
  it('should render the ErrorSummary with errors', () => {
    render(<ErrorSummary errors={['Error 1', 'Other error']} />);
    expect(screen.getByTestId('error-summary'))
      .toHaveTextContent(
        'There is a problem'
      + 'Error 1'
      + 'Other error',
      );
  });

  it('should NOT render the ErrorSummary without errors', () => {
    render(<Banner />);
    expect(screen.queryByTestId('error-summary')).toBeNull();
  });
});
