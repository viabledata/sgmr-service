import React from 'react';
import { render, screen } from '@testing-library/react';
import ManageReports from '../ManageReports';

test('Renders the manage reports table', () => {
  render(<ManageReports />);

  expect(screen.getByText('Manage your voyage plans')).toBeInTheDocument();
  expect(screen.getByText(
    'Click on one of your voyage plans below to view, edit, cancel or delete it, depending on its status. '
  + 'For example, you can edit a draft or submitted voyage plan, but you can\'t edit a cancelled voyage plan.',
  )).toBeInTheDocument();
  expect(screen.getByText('Pleasure craft')).toBeInTheDocument();
  expect(screen.getByText('Departure date')).toBeInTheDocument();
  expect(screen.getByText('Departure port')).toBeInTheDocument();
  expect(screen.getByText('Arrival port')).toBeInTheDocument();

  expect(screen.getAllByText('Draft').length).toBe(2);
  expect(screen.getByText('Submitted')).toBeInTheDocument();
  expect(screen.getByText('Cancelled')).toBeInTheDocument();
  expect(screen.getByText('Presubmitted')).toBeInTheDocument();
  expect(screen.getByText('Precancelled')).toBeInTheDocument();
  expect(screen.getByText('Failed')).toBeInTheDocument();
});
