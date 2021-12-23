import VoyageFormValidation from '@components/Voyage/VoyageFormValidation';
import { FORM_STEPS } from '@constants/ClientConstants';

test('Validates responsible person', async () => {
  const expectedErrors = {
    responsibleAddressLine1: 'You must enter the first line of your address',
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
