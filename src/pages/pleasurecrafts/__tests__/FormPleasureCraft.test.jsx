import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PleasureCraftForm from '../PleasureCraftForm';

const emptyFormData = {
  undefined,
};

const emptyErrors = {
  undefined,
};

const existingFormData = {
  vesselName: 'Reliable Cruiser',
  vesselType: 'Sailboat',
  registration: 8932714,
  ais: 'yes',
  mmsi: 23642398625,
  callsign: 'R3L1',
};

const expectedErrors = {
  vesselName: 'You must enter a pleasure craft name',
  vesselType: 'You must enter a pleasure craft type',
  registration: 'You must select an option for the pleasure craft registration number',
  ais: 'You must specify if the pleasure craft has an AIS',
  mmsi: 'You must specify if the pleasure craft has a MMSI',
  callsign: 'You must specify if the pleasure craft has a call sign',
};

test('Render the first page of the pleasure craft form with no new data, no errors, coming from a voyage source', () => {
  render(<PleasureCraftForm formData={emptyFormData} errors={emptyErrors} sourceForm="voyage" />);

  expect(screen.getByText('Name of pleasure craft')).toBeInTheDocument();
  expect(screen.getByText('Type of pleasure craft')).toBeInTheDocument();
  expect(screen.getByText('Sailing boat')).toBeInTheDocument();
  expect(screen.getByText('Motorboat')).toBeInTheDocument();
  expect(screen.getByText('Other')).toBeInTheDocument();

  expect(screen.queryByText('Save and continue')).not.toBeInTheDocument();
  expect(screen.queryByText('Delete this pleasure craft')).not.toBeInTheDocument();
  expect(screen.queryByText('You must enter a pleasure craft name')).not.toBeInTheDocument();
  expect(screen.queryByText('You must enter a pleasure craft type')).not.toBeInTheDocument();
});

test('Render the first page of the pleasure craft form with existing data, no errors, coming from a non-voyage source', () => {
  render(<PleasureCraftForm formData={existingFormData} errors={emptyErrors} sourceForm={undefined} vesselId={22312398} />);

  expect(screen.getByText('Save and continue')).toBeInTheDocument();
  expect(screen.getByText('Delete this pleasure craft')).toBeInTheDocument();
});

test('Render the first page of the pleasure craft form with no new data and existing errors, coming from a non-voyage source', () => {
  render(<PleasureCraftForm formData={emptyFormData} errors={expectedErrors} sourceForm={undefined} />);

  expect(screen.getByText('You must enter a pleasure craft name')).toBeInTheDocument();
  expect(screen.getByText('You must enter a pleasure craft type')).toBeInTheDocument();
});
