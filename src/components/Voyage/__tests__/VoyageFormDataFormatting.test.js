import { formatDepartureArrival } from '@components/Voyage/VoyageFormDataFormatting';

test('Return default departure and arrival ports if field is null', () => {
  const data = {
    arrivalPort: null,
    departurePort: null,
  };
  const expectedDataList = {
    arrivalPort: 'ZZZA',
    departurePort: 'ZZZD',
    status: 'Draft',
  };

  const result = formatDepartureArrival('Draft', data);
  expect(result).toEqual(expectedDataList);
});

test('Return user departure and arrival ports if field is not null', () => {
  const data = {
    arrivalPort: 'Portsmouth',
    departurePort: 'Southampton',
  };
  const expectedDataList = {
    arrivalPort: 'Portsmouth',
    departurePort: 'Southampton',
    status: 'Draft',
  };

  const result = formatDepartureArrival('Draft', data);
  expect(result).toEqual(expectedDataList);
});

test('Format departure and arrival dates', () => {
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
    arrivalPort: 'ZZZA',
    departureDate: '2020-2-4',
    departurePort: 'ZZZD',
    status: 'Draft',
  };

  const result = formatDepartureArrival('Draft', data);
  expect(result).toEqual(expectedDataList);
});

test('Format departure and arrival times', () => {
  const data = {
    departureTimeHour: '11',
    departureTimeMinute: '33',
    arrivalTimeHour: '18',
    arrivalTimeMinute: '45',
  };
  const expectedDataList = {
    departurePort: 'ZZZD',
    departureTime: '11:33',
    arrivalPort: 'ZZZA',
    arrivalTime: '18:45',
    status: 'Draft',
  };

  const result = formatDepartureArrival('Draft', data);
  expect(result).toEqual(expectedDataList);
});

test('Return user departure and arrival lat/long coordinates if field is not null', () => {
  const data = {
    departureLat: '15989.0',
    departureLong: '288.3',
    arrivalLat: '12323.6',
    arrivalLong: '4.900',
  };
  const expectedDataList = {
    departurePort: 'ZZZD',
    departureLat: '15989.0',
    departureLong: '288.3',
    arrivalLat: '12323.6',
    arrivalLong: '4.900',
    arrivalPort: 'ZZZA',
    status: 'Draft',
  };

  const result = formatDepartureArrival('Draft', data);
  expect(result).toEqual(expectedDataList);
});
