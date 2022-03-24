import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import VesselTable from '../VesselTable';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ children }) => children,
}));

const vesselData = [
  {
    id: '1',
    moorings: 'Port ',
    vesselName: 'Boat 1',
    vesselType: 'Sailboat',
  },
  {
    id: '2',
    moorings: 'Port ',
    vesselName: 'Boat 2',
    vesselType: 'Sailboat',
  },
  {
    id: '3',
    moorings: 'Port ',
    vesselName: 'Boat 3',
    vesselType: 'Sailboat',
  },
];

describe('VesselTable', () => {
  it('should render the page with pleasure crafts', () => {
    render(
      <VesselTable vesselData={vesselData} checkboxes="false" link="true" />,
    );

    expect(screen.getByText('Boat 1')).toBeInTheDocument();
    expect(screen.getByText('Boat 2')).toBeInTheDocument();
    expect(screen.getByText('Boat 3')).toBeInTheDocument();
  });

  it('should tick checkboxes correctly', () => {
    const handleCheckboxes = jest.fn();
    render(
      <VesselTable vesselData={vesselData} checkboxes="true" link="false" handleCheckboxes={handleCheckboxes} />,
    );

    fireEvent.click(screen.getByTestId('1'));
    expect(handleCheckboxes).toHaveBeenCalled();
  });
});
