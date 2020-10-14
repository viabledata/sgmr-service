import VoyageFormValidation from '@components/Voyage/VoyageFormValidation';

test('Validates responsible person', () => {
  const expectedErrors = {
    responsibleAddressLine1: 'You must enter the first line of your address',
    responsibleAddressLine2: 'You must enter the second line of your address',
    responsibleContactNo: 'You must enter a contact number',
    responsibleCounty: 'You must enter a country name',
    responsibleGivenName: 'You must enter a given name',
    responsiblePostcode: 'You must enter a postcode',
    responsibleSurname: 'You must enter a given name',
    responsibleTown: 'You must enter a town or a city name',
  };
  const result = VoyageFormValidation({}, 'responsiblePerson');
  expect(result).toEqual(expectedErrors);
});
