import { formatDepartureArrival } from '@components/Voyage/VoyageFormDataFormatting';

describe('Test formatDepartureArrival', () => {
  test('Return default departure and arrival ports if field is null', () => {
    const data = {
      arrivalPort: null,
      arrivalDate: null,
      arrivalTime: null,
      departurePort: null,
      departureDate: null,
      departureTime: null,
    };
    const expectedDataList = {
      arrivalPort: 'ZZZA',
      departurePort: 'ZZZD',
      status: 'Draft',
    };

    const result = formatDepartureArrival('Draft', data);
    expect(result).toEqual(expectedDataList);
  });

  test('Return formatted departure and arrival dates', () => {
    const data = {
      arrivalDateDay: '5',
      arrivalDateMonth: '2',
      arrivalDateYear: '2020',
      departureDateDay: '4',
      departureDateMonth: '2',
      departureDateYear: '2020',
    };
    const expectedDataList = {
      arrivalDate: '2020-2-5',
      departureDate: '2020-2-4',
      status: 'Draft',
    };

    const result = formatDepartureArrival('Draft', data);
    expect(result).toEqual(expectedDataList);
  });

  test('Return formatted departure and arrival times', () => {
    const data = {
      arrivalTimeHour: '15',
      arrivalTimeMinute: '2',
      departureTimeHour: '12',
      departureTimeMinute: '4',
    };
    const expectedDataList = {
      arrivalTime: '15:2',
      departureTime: '12:4',
      status: 'Draft',
    };

    const result = formatDepartureArrival('Draft', data);
    expect(result).toEqual(expectedDataList);
  });
});
