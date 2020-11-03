import React from 'react';
import { render, screen } from '@testing-library/react';

import Banner from '../Banner';

test('Renders the banner', () => {
  render(<Banner />);
  expect(screen.getByText('beta')).toBeInTheDocument();
  expect(screen.getByTestId('banner-text'))
    .toHaveTextContent('This is a new service – your feedback will help us to improve it.');
  expect(screen.getByText('feedback')).toBeInTheDocument();
});
