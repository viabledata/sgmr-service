import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PleasureCraftDetailsForm from '../PleasureCraftDetailsForm';

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
  render(<PleasureCraftDetailsForm formData={emptyFormData} errors={emptyErrors} sourceForm="voyage" />);

  expect(screen.getByText('Does this pleasure craft have a registration number?')).toBeInTheDocument();
  expect(screen.getByText('Does this pleasure craft have an Automatic Identification System (AIS)?')).toBeInTheDocument();
  expect(screen.getByText('Does this pleasure craft have a Maritime Mobile Service Identify number (MMSI)?')).toBeInTheDocument();
  expect(screen.getByText('Does this pleasure craft have a callsign?')).toBeInTheDocument();
  expect(screen.queryAllByText('Yes')).toHaveLength(4);
  expect(screen.queryAllByText('No')).toHaveLength(4);

  expect(screen.queryByText('Registration number')).not.toBeInTheDocument();
  expect(screen.queryByText('Country of registration')).not.toBeInTheDocument();
  expect(screen.queryByText('MMSI number')).not.toBeInTheDocument();
  expect(screen.queryByText('Call sign')).not.toBeInTheDocument();
  expect(screen.queryByText('Save and continue')).not.toBeInTheDocument();
  expect(screen.queryByText('Delete this pleasure craft')).not.toBeInTheDocument();

  expect(screen.queryByText('You must select an option for the pleasure craft registration number')).not.toBeInTheDocument();
  expect(screen.queryByText('You must specify if the pleasure craft has an AIS')).not.toBeInTheDocument();
  expect(screen.queryByText('You must specify if the pleasure craft has a MMSI')).not.toBeInTheDocument();
  expect(screen.queryByText('You must specify if the pleasure craft has a call sign')).not.toBeInTheDocument();
});

test('Render the first page of the pleasure craft form with existing data, no errors, coming from a non-voyage source', () => {
  render(<PleasureCraftDetailsForm formData={existingFormData} errors={emptyErrors} sourceForm={undefined} vesselId={22312398} />);

  expect(screen.getByText('Registration number')).toBeInTheDocument();
  expect(screen.getByText('Country of registration')).toBeInTheDocument();
  expect(screen.getByText('MMSI number')).toBeInTheDocument();
  expect(screen.getByText('Call sign')).toBeInTheDocument();
  expect(screen.getByText('Save and continue')).toBeInTheDocument();
  expect(screen.getByText('Delete this pleasure craft')).toBeInTheDocument();
});

test('Render the first page of the pleasure craft form with no new data and existing errors, coming from a non-voyage source', () => {
  render(<PleasureCraftDetailsForm formData={emptyFormData} errors={expectedErrors} sourceForm={undefined} />);

  expect(screen.getByText('You must select an option for the pleasure craft registration number')).toBeInTheDocument();
  expect(screen.getByText('You must specify if the pleasure craft has an AIS')).toBeInTheDocument();
  expect(screen.getByText('You must specify if the pleasure craft has a MMSI')).toBeInTheDocument();
  expect(screen.getByText('You must specify if the pleasure craft has a call sign')).toBeInTheDocument();
});
