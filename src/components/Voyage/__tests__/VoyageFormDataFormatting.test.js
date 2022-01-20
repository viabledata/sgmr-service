import {
  formatDepartureArrival, formatNewPerson, formatResponsiblePerson, formatVessel,
} from '../VoyageFormDataFormatting';

describe('Voyage form data formatting', () => {
  it('Should return default departure and arrival ports if field is null', () => {
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

  it('should return user departure and arrival ports if field is not null', () => {
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

  it('shoild format departure and arrival dates', () => {
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

  it('should format departure and arrival times', () => {
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

  it('should return user departure and arrival lat/long coordinates if field is not null', () => {
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

  it('should format new person data', () => {
    const data = {
      dateOfBirthDay: '12',
      dateOfBirthMonth: '12',
      dateOfBirthYear: '1985',
      documentExpiryDateDay: '12',
      documentExpiryDateMonth: '12',
      documentExpiryDateYear: '2022',
      documentIssuingState: 'GBR',
      documentNumber: '1234',
      documentType: 'Passport',
      firstName: 'John',
      gender: 'Male',
      lastName: 'Doe',
      nationality: 'GBR',
      peopleType: 'Skipper',
      placeOfBirth: 'London',
    };
    const expectedDataList = {
      people: [{
        dateOfBirth: '1985-12-12',
        documentExpiryDate: '2022-12-12',
        documentIssuingState: 'GBR',
        documentNumber: '1234',
        documentType: 'Passport',
        firstName: 'John',
        gender: 'Male',
        lastName: 'Doe',
        nationality: 'GBR',
        peopleType: 'Skipper',
        placeOfBirth: 'London',

      }],
      status: 'Draft',
    };

    const result = formatNewPerson('Draft', data);
    expect(result).toEqual(expectedDataList);
  });

  it('should format responsible person data', () => {
    const voyageData = {
      responsibleAddressLine1: null,
      responsibleAddressLine2: null,
      responsibleContactNo: null,
      responsibleCounty: null,
      responsibleGivenName: null,
      responsiblePostcode: null,
      responsibleSurname: null,
      responsibleTown: null,
    };
    const data = {
      responsibleAddressLine1: '123 Street',
      responsibleContactNo: '01234567891',
      responsibleCounty: 'County',
      responsibleGivenName: 'John',
      responsiblePostcode: 'AB1 2CD',
      responsibleSurname: 'Doe',
      responsibleTown: 'Town',
      status: 'Draft',
    };

    const result = formatResponsiblePerson('Draft', data, voyageData);
    expect(result).toEqual(data);
  });

  it('should format vessel data', () => {
    const voyageData = {
      moorings: null,
      portOfRegistry: null,
      registration: null,
      vesselName: null,
      vesselNationality: null,
      vesselType: null,
    };
    const data = {
      moorings: 'port',
      portOfRegistry: 'port',
      registration: '12345',
      vesselName: 'Boat',
      vesselNationality: 'British',
      vesselType: 'Boat',
      status: 'Draft',
    };
    
    const result = formatVessel('Draft', data, voyageData);
    expect(result).toEqual(data);
  });
});
