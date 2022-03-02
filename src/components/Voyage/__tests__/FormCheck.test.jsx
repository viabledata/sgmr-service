import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import FormCheck from '../FormCheck';

const mockHandleSubmit = jest.fn();

const renderPage = (props = {
  voyageData: {
    arrivalDate: '2022-06-06',
    arrivalDateDay: '06',
    arrivalDateMonth: '06',
    arrivalDateYear: '2022',
    arrivalPort: 'PME',
    arrivalTime: '12:00:00',
    arrivalTimeHour: '12',
    arrivalTimeMinute: '00',
    departureDate: '2022-01-27',
    departureDateDay: '27',
    departureDateMonth: '01',
    departureDateYear: '2022',
    departurePort: 'DVR',
    departureTime: '12:00:00',
    departureTimeHour: '12',
    departureTimeMinute: '00',
    id: '1234',
    moorings: 'Port ',
    registration: 'Boat',
    responsibleAddressLine1: 'Address',
    responsibleContactNo: '12345678910',
    responsibleCounty: 'County',
    responsibleGivenName: 'John',
    responsiblePostcode: 'A1B2C3D4',
    responsibleSurname: 'Doe',
    responsibleTown: 'Town',
    status: { name: 'Draft' },
    vesselName: 'Boat',
    vesselType: 'Boat',
  },
  voyageId: '1234',
  handleSubmit: mockHandleSubmit,
  errors: {},
}) => {
  return render(
    <MemoryRouter>
      <FormCheck {...props} />
    </MemoryRouter>,
  );
};

describe('FormCheck', () => {
  it('should render the page without errors', () => {
    renderPage();

    expect(screen.getByText('Check the information provided before submitting your voyage plan')).toBeInTheDocument();
    expect(screen.getByText('Departure details')).toBeInTheDocument();
    expect(screen.getByText('27/01/2022')).toBeInTheDocument();
    expect(screen.getByText('06/06/2022')).toBeInTheDocument();
    expect(screen.getByText('Address, Town, County, A1B2C3D4')).toBeInTheDocument();
    expect(screen.getByText('Cancel voyage plan')).toBeInTheDocument();
    expect(screen.getByText('Accept and submit voyage plan')).toBeInTheDocument();
  });

  it('should call handleSubmit when submit is clicked', () => {
    renderPage();

    fireEvent.click(screen.getByText('Accept and submit voyage plan'));
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it('should not render CTAs if report has a status of cancelled', () => {
    renderPage({
      voyageData: {
        arrivalDate: '2022-06-06',
        arrivalDateDay: '06',
        arrivalDateMonth: '06',
        arrivalDateYear: '2022',
        arrivalPort: 'PME',
        arrivalTime: '12:00:00',
        arrivalTimeHour: '12',
        arrivalTimeMinute: '00',
        departureDate: '2022-01-27',
        departureDateDay: '27',
        departureDateMonth: '01',
        departureDateYear: '2022',
        departurePort: 'DVR',
        departureTime: '12:00:00',
        departureTimeHour: '12',
        departureTimeMinute: '00',
        id: '1234',
        moorings: 'Port ',
        registration: 'Boat',
        responsibleAddressLine1: 'Address',
        responsibleContactNo: '12345678910',
        responsibleCounty: 'County',
        responsibleGivenName: 'John',
        responsiblePostcode: 'A1B2C3D4',
        responsibleSurname: 'Doe',
        responsibleTown: 'Town',
        status: { name: 'Cancelled' },
        vesselName: 'Boat',
        vesselType: 'Boat',
      },
      voyageId: '1234',
      handleSubmit: () => { },
      errors: {},
    });

    expect(screen.queryByText('Accept and submit voyage plan')).not.toBeInTheDocument();
    expect(screen.queryByText('Cancel voyage plan')).not.toBeInTheDocument();
  });

  it('should not render page when there is no voyage data', () => {
    const { container } = renderPage({
      voyageData: null,
      voyageId: '1234',
      handleSubmit: () => { },
      errors: {},
    });
    // expect empty component
    expect(container.childElementCount).toEqual(0);
  });
});
