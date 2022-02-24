import { FORM_STEPS } from '../../../constants/ClientConstants';
import VoyageFormValidation from '../VoyageFormValidation';

describe('Voyage form required fields errors', () => {
  it('should validate responsible person', async () => {
    const expectedErrors = {
      responsibleAddressLine1: 'You must enter a first address line',
      responsibleContactNo: 'You must enter a contact number',
      responsibleCounty: 'You must enter a country name',
      responsibleGivenName: 'You must enter a first name',
      responsiblePostcode: 'You must enter a postcode',
      responsibleSurname: 'You must enter a last name',
      responsibleTown: 'You must enter a town or a city name',
    };
    const result = await VoyageFormValidation({}, FORM_STEPS.RESPONSIBLE_PERSON);
    expect(result).toEqual(expectedErrors);
  });

  it('should validate person', async () => {
    const expectedErrors = {
      dateOfBirth: 'You must enter a date of birth',
      documentExpiryDate: 'You must enter an expiry date',
      documentIssuingState: 'You must enter the document issuing state',
      documentNumber: 'You must enter a document number',
      documentType: 'You must select a document type',
      firstName: 'You must enter a first name',
      gender: 'You must select a gender',
      lastName: 'You must enter a last name',
      nationality: 'You must enter a nationality',
      peopleType: 'You must enter a person type',
      placeOfBirth: 'You must enter a place of birth',
    };
    const result = await VoyageFormValidation({}, FORM_STEPS.NEW_PERSON);
    expect(result).toEqual(expectedErrors);
  });

  it('should validate vessel', async () => {
    const expectedErrors = {
      vesselName: 'You must enter a pleasure craft name',
      vesselType: 'You must enter a pleasure craft type',
      registration: 'You must select an option for the pleasure craft registration number',
      ais: 'You must specify if the pleasure craft has an AIS',
      mmsi: 'You must specify if the pleasure craft has a MMSI',
      callsign: 'You must specify if the pleasure craft has a call sign',
    };
    const result = await VoyageFormValidation({}, FORM_STEPS.VESSEL);
    expect(result).toEqual(expectedErrors);
  });

  it('should validate arrival', async () => {
    const expectedErrors = {
      arrivalDate: 'You must enter an arrival date',
      arrivalTime: 'You must enter an arrival time',
      arrivalLocation: 'You must enter an arrival point',
    };
    const result = await VoyageFormValidation({}, FORM_STEPS.ARRIVAL);
    expect(result).toEqual(expectedErrors);
  });

  it('should validate departure', async () => {
    const expectedErrors = {
      departureDate: 'You must enter a departure date',
      departureTime: 'You must enter a departure time',
      departureLocation: 'You must enter a departure point',
    };
    const result = await VoyageFormValidation({}, FORM_STEPS.DEPARTURE);
    expect(result).toEqual(expectedErrors);
  });

  it('should validate voyage check', async () => {
    const expectedErrors = {
      arrivalDate: 'You must enter an arrival date',
      arrivalTime: 'You must enter an arrival time',
      departureDate: 'You must enter a departure date',
      departureTime: 'You must enter a departure time',
      registration: 'You must enter a pleasure craft registration',
      responsibleGivenName: "You must enter the responsible person's details",
      vesselName: 'You must enter a pleasure craft name',
    };
    const result = await VoyageFormValidation({}, FORM_STEPS.CHECK);
    expect(result).toEqual(expectedErrors);
  });
});

describe('Voyage form invalid inputs', () => {
  it('should throw errors if arrival date is not valid', async () => {
    const expectedErrors = {
      arrivalDate: 'You must enter a valid date',
      arrivalTime: 'You must enter a valid time',
    };
    const data = {
      // Invalid date and time
      arrivalDateDay: '32',
      arrivalDateMonth: '13',
      arrivalDateYear: '2022',
      arrivalTimeHour: '24',
      arrivalTimeMinute: '00',
      arrivalPort: 'BRP',
    };

    const result = await VoyageFormValidation(data, FORM_STEPS.ARRIVAL);
    expect(result).toEqual(expectedErrors);
  });

  it('should throw errors if departure date is not valid', async () => {
    const expectedErrors = {
      departureDate: 'You must enter a valid date',
      departureTime: 'You must enter a valid time',
    };
    const data = {
      // Invalid date and time
      departureDateDay: '32',
      departureDateMonth: '13',
      departureDateYear: '2022',
      departureTimeHour: '24',
      departureTimeMinute: '00',
      departurePort: 'BRP',
    };

    const result = await VoyageFormValidation(data, FORM_STEPS.DEPARTURE);
    expect(result).toEqual(expectedErrors);
  });

  it('should throw error if arrival date is in the past', async () => {
    const expectedErrors = {
      arrivalDate: 'You must enter an arrival time in the future',
    };
    const data = {
      arrivalDateDay: '01',
      arrivalDateMonth: '01',
      arrivalDateYear: '2020',
      arrivalTimeHour: '12',
      arrivalTimeMinute: '00',
      arrivalPort: 'BRP',
    };

    const result = await VoyageFormValidation(data, FORM_STEPS.ARRIVAL);
    expect(result).toEqual(expectedErrors);
  });

  it('should throw error if departure date is in the past', async () => {
    const expectedErrors = {
      departureDate: 'You must enter a departure time in the future',
    };
    const data = {
      departureDateDay: '01',
      departureDateMonth: '01',
      departureDateYear: '2020',
      departureTimeHour: '12',
      departureTimeMinute: '00',
      departurePort: 'BRP',
    };

    const result = await VoyageFormValidation(data, FORM_STEPS.DEPARTURE);
    expect(result).toEqual(expectedErrors);
  });

  it('should throw error if arrival date is before departure', async () => {
    const expectedErrors = {
      arrivalDate: 'You must enter an arrival time after your departure',
    };
    const data = {
      // arrival date is a day before departure
      arrivalDateDay: '01',
      arrivalDateMonth: '01',
      arrivalDateYear: '2023',
      arrivalTimeHour: '12',
      arrivalTimeMinute: '00',
      arrivalPort: 'BRP',
      departureDateDay: '02',
      departureDateMonth: '01',
      departureDateYear: '2023',
      departureTimeHour: '12',
      departureTimeMinute: '00',
      departurePort: 'BRP',
    };

    const result = await VoyageFormValidation(data, FORM_STEPS.ARRIVAL);
    expect(result).toEqual(expectedErrors);
  });

  it('should throw errors if person dates are invalid', async () => {
    const expectedErrors = {
      // invalid document expiry and DOB
      documentExpiryDate: 'You must enter a valid document expiry date',
      dateOfBirth: 'You must enter a valid date of birth',

      documentIssuingState: 'You must enter the document issuing state',
      documentNumber: 'You must enter a document number',
      documentType: 'You must select a document type',
      firstName: 'You must enter a first name',
      gender: 'You must select a gender',
      lastName: 'You must enter a last name',
      nationality: 'You must enter a nationality',
      peopleType: 'You must enter a person type',
      placeOfBirth: 'You must enter a place of birth',
    };
    const data = {
      // Invalid dates
      documentExpiryDateDay: '13',
      documentExpiryDateMonth: '12',
      documentExpiryDateYear: '2000',
      dateOfBirthDay: '32',
      dateOfBirthMonth: '12',
      dateOfBirthYear: '2023',
    };

    const result = await VoyageFormValidation(data, FORM_STEPS.NEW_PERSON);
    expect(result).toEqual(expectedErrors);
  });

  it('should throw error when responsible person telephone number is invalid', async () => {
    const expectedErrors = {
      responsibleContactNo: 'You must enter a valid phone number e.g. 07700 900982, +33 63998 010101',
    };
    const data = {
      responsibleAddressLine1: '123 Street',
      responsibleContactNo: 'a',
      responsibleCounty: 'County',
      responsibleGivenName: 'John',
      responsiblePostcode: 'AB1 2CD',
      responsibleSurname: 'Doe',
      responsibleTown: 'Town',
    };
    const result = await VoyageFormValidation(data, FORM_STEPS.RESPONSIBLE_PERSON);
    expect(result).toEqual(expectedErrors);
  });
});
