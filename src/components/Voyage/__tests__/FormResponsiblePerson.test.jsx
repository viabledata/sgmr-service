import React from 'react';
import { render, screen } from '@testing-library/react';

import FormResponsiblePerson from '../FormResponsiblePerson';

test('Renders with errors', () => {
  render(<FormResponsiblePerson
    data={{
      responsibleGivenName: 'responsibleGivenNameValue',
      responsibleSurname: 'responsibleSurnameValue',
      responsibleContactNo: 'responsibleContactNoValue',
      responsibleAddressLine1: 'responsibleAddressLine1Value',
      responsibleTown: 'responsibleTownValue',
      responsibleCounty: 'responsibleCountyValue',
      responsiblePostcode: 'responsiblePostcodeValue',
    }}
    errors={{
      responsibleGivenName: 'responsibleGivenNameError',
      responsibleSurname: 'responsibleSurnameError',
      responsibleContactNo: 'responsibleContactNoError',
      responsibleAddressLine1: 'responsibleAddressLine1Error',
      responsibleTown: 'responsibleTownError',
      responsibleCounty: 'responsibleCountyError',
      responsiblePostcode: 'responsiblePostcodeError',
    }}
  />);

  expect(screen.getByText('responsibleGivenNameError')).toBeInTheDocument();
  expect(screen.getByText('responsibleSurnameError')).toBeInTheDocument();
  expect(screen.getByText('responsibleContactNoError')).toBeInTheDocument();
  expect(screen.getByText('responsibleAddressLine1Error')).toBeInTheDocument();
  expect(screen.getByText('responsibleTownError')).toBeInTheDocument();
  expect(screen.getByText('responsibleCountyError')).toBeInTheDocument();
  expect(screen.getByText('responsiblePostcodeError')).toBeInTheDocument();
});
