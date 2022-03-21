import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../LoadingSpinner';

describe('Loading spinner', () => {
  it('should show spinner when loading equals true', () => {
    render(<LoadingSpinner loading />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('should not show spinner if loading equals false', () => {
    render(<LoadingSpinner loading={false} />);
    expect(screen.queryByText('Loading')).toBeNull();
  });
});
