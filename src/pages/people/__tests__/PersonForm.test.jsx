import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { PEOPLE_URL } from '../../../constants/ApiConstants';
import PersonForm from '../PersonForm';

const renderPage = ({
  type, source, pageNumber,
}) => {
  render(
    <MemoryRouter initialEntries={[{ pathname: `/page-${pageNumber}` }]}>
      <PersonForm type={type} source={source} />
    </MemoryRouter>,
  );
};

describe('Creating and editing people', () => {
  const mockAxios = new MockAdapter(axios);

  beforeEach(() => {
    mockAxios.reset();
    window.sessionStorage.removeItem('formData');
  });

  it('should render different titles based on where the user comes from', () => {
    const testTitle = (text) => {
      expect(screen.getByText(text).outerHTML).toEqual(`<h1 class="govuk-heading-l">${text}</h1>`);
    };

    renderPage({ pageNumber: 1, source: 'onboarding' });
    testTitle('Add details of a person you frequently sail with');

    renderPage({ pageNumber: 2, source: 'onboarding' });
    testTitle('Add details of a person you frequently sail with');

    renderPage({ pageNumber: 1, source: 'voyage' });
    testTitle('Add details of the person you are sailing with');

    renderPage({ pageNumber: 2, source: 'voyage' });
    testTitle('Add details of the person you are sailing with');

    renderPage({ pageNumber: 1, source: 'edit' });
    testTitle('Update details of the person you sail with');

    renderPage({ pageNumber: 2, source: 'edit' });
    testTitle('Update details of the person you sail with');

    renderPage({ pageNumber: 1 });
    testTitle('Add details of the person you frequently sail with');

    renderPage({ pageNumber: 2 });
    testTitle('Add details of the person you frequently sail with');
  });

  it('should render errors on continue if fields on page 1 are empty', async () => {
    renderPage({ pageNumber: 1 });
    await waitFor(() => fireEvent.click(screen.getByText('Continue')));
    expect(screen.queryAllByText('You must enter a given name')).toHaveLength(2);
    expect(screen.queryAllByText('You must enter a surname')).toHaveLength(2);
    expect(screen.queryAllByText('You must enter a date of birth')).toHaveLength(2);
    expect(screen.queryAllByText('You must enter a place of birth')).toHaveLength(2);
    expect(screen.queryAllByText('You must select a gender')).toHaveLength(2);
  });

  it('should render errors on continue when date of birth is invalid', async () => {
    renderPage({ pageNumber: 1 });
    fireEvent.change(screen.getByLabelText('Day'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Month'), { target: { value: '22' } });
    fireEvent.change(screen.getByLabelText('Year'), { target: { value: '1990' } });
    await waitFor(() => fireEvent.click(screen.getByText('Continue')));
    expect(screen.queryAllByText('You must enter a valid date of birth')).toHaveLength(2);

    fireEvent.change(screen.getByLabelText('Day'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Month'), { target: { value: '12' } });
    fireEvent.change(screen.getByLabelText('Year'), { target: { value: '2030' } });
    await waitFor(() => fireEvent.click(screen.getByText('Continue')));
    expect(screen.queryAllByText('You must enter a valid date of birth')).toHaveLength(2);
  });

  it('should scroll to error if user clicks on error text', async () => {
    renderPage({ pageNumber: 1 });
    await waitFor(() => fireEvent.click(screen.getByText('Continue')));
    expect(screen.queryAllByText('You must enter a given name')).toHaveLength(2);
    expect(screen.getByRole('link', { name: 'You must enter a given name' })).toBeInTheDocument();

    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
    await waitFor(() => fireEvent.click(screen.getByRole('link', { name: 'You must enter a given name' })));
    expect(scrollIntoViewMock).toBeCalled();
  });

  it('should load next page when user clicks continue and there are no errors', async () => {
    renderPage({ pageNumber: 1 });
    fireEvent.change(screen.getByLabelText('Given name(s)'), { target: { value: 'Joe' } });
    fireEvent.change(screen.getByLabelText('Surname'), { target: { value: 'Bloggs' } });
    fireEvent.change(screen.getByLabelText('Day'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Month'), { target: { value: '11' } });
    fireEvent.change(screen.getByLabelText('Year'), { target: { value: '1990' } });
    fireEvent.change(screen.getByLabelText('Place of birth'), { target: { value: 'London' } });
    fireEvent.click(screen.getByLabelText('Male'));
    await waitFor(() => fireEvent.click(screen.getByText('Continue')));
    expect(screen.getByText('Select a travel document type')).toBeInTheDocument();
  });

  it('should load previous page when user clicks back regardless of errors', async () => {
    renderPage({ pageNumber: 2 });
    await waitFor(() => fireEvent.click(screen.getByText('Back')));
    expect(screen.getByText('Given name(s)')).toBeInTheDocument();
  });

  it('should render errors on save if fields on page 2 are empty', async () => {
    renderPage({ pageNumber: 2 });
    await waitFor(() => fireEvent.click(screen.getByText('Save')));
    expect(screen.queryAllByText('You must select a document type')).toHaveLength(2);
    expect(screen.queryAllByText('You must enter a document number')).toHaveLength(2);
    expect(screen.queryAllByText('You must select a document issuing state')).toHaveLength(2);
    expect(screen.queryAllByText('You must select a nationality')).toHaveLength(2);
    expect(screen.queryAllByText('You must enter an expiry date')).toHaveLength(2);
  });

  it('should render errors on save if document type is OTHER and other text input is null', async () => {
    renderPage({ pageNumber: 2 });
    expect(screen.queryByText('Please specify')).not.toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Another travel document'));
    expect(screen.getByLabelText('Another travel document')).toBeChecked();
    expect(screen.getByText('Please specify')).toBeInTheDocument();

    await waitFor(() => fireEvent.click(screen.getByText('Save')));
    expect(screen.queryAllByText('You must select a document type')).toHaveLength(2);
  });

  it('should render errors on save when expiry is invalid', async () => {
    renderPage({ pageNumber: 2 });
    fireEvent.change(screen.getByTestId('documentExpiryDateDay-field'), { target: { value: '1' } });
    fireEvent.change(screen.getByTestId('documentExpiryDateMonth-field'), { target: { value: '22' } });
    fireEvent.change(screen.getByTestId('documentExpiryDateYear-field'), { target: { value: '2030' } });
    await waitFor(() => fireEvent.click(screen.getByText('Save')));
    expect(screen.queryAllByText('You must enter a valid document expiry date')).toHaveLength(2);

    fireEvent.change(screen.getByTestId('documentExpiryDateDay-field'), { target: { value: '1' } });
    fireEvent.change(screen.getByTestId('documentExpiryDateMonth-field'), { target: { value: '12' } });
    fireEvent.change(screen.getByTestId('documentExpiryDateYear-field'), { target: { value: '1990' } });
    await waitFor(() => fireEvent.click(screen.getByText('Save')));
    expect(screen.queryAllByText('You must enter a valid document expiry date')).toHaveLength(2);
  });

  it('should clear error for a field if user interacts with that field', async () => {
    renderPage({ pageNumber: 1 });
    await waitFor(() => fireEvent.click(screen.getByText('Continue')));
    expect(screen.queryAllByText('You must enter a given name')).toHaveLength(2);
    expect(screen.queryAllByText('You must enter a surname')).toHaveLength(2);
    expect(screen.queryAllByText('You must enter a date of birth')).toHaveLength(2);

    fireEvent.change(screen.getByLabelText('Given name(s)'), { target: { value: 'J' } });
    expect(screen.queryAllByText('You must enter a given name')).toHaveLength(0);
    expect(screen.queryAllByText('You must enter a surname')).toHaveLength(2);
    expect(screen.queryAllByText('You must enter a date of birth')).toHaveLength(2);
  });

  it('should allow you to exit without saving even if required fields arent valid', async () => {
    renderPage({ pageNumber: 1 });
    await waitFor(() => fireEvent.click(screen.getByText('Exit without saving')));
    expect(screen.queryAllByText('There is a problem')).toHaveLength(0);
  });

  it('should store form data in the session for use on refresh', async () => {
    const expectedPage1FormData = '{"firstName":"Joe","lastName":"Blogs","dateOfBirthDay":"1","dateOfBirthMonth":"11","dateOfBirthYear":"1990","placeOfBirth":"London","gender":"Male"}';
    // eslint-disable-next-line max-len
    const expectedPage2FormData = '{"firstName":"Joe","lastName":"Blogs","dateOfBirthDay":"1","dateOfBirthMonth":"11","dateOfBirthYear":"1990","placeOfBirth":"London","gender":"Male","documentType":"Passport","documentNumber":"abc123","documentIssuingState":"GBR","nationality":"AUS","documentExpiryDateDay":"1","documentExpiryDateMonth":"11","documentExpiryDateYear":"2025"}';
    renderPage({ pageNumber: 1 });
    fireEvent.change(screen.getByLabelText('Given name(s)'), { target: { value: 'Joe' } });
    fireEvent.change(screen.getByLabelText('Surname'), { target: { value: 'Blogs' } });
    fireEvent.change(screen.getByLabelText('Day'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Month'), { target: { value: '11' } });
    fireEvent.change(screen.getByLabelText('Year'), { target: { value: '1990' } });
    fireEvent.change(screen.getByLabelText('Place of birth'), { target: { value: 'London' } });
    fireEvent.click(screen.getByLabelText('Male'));
    expect(window.sessionStorage.getItem('formData')).toStrictEqual(expectedPage1FormData);

    renderPage({ pageNumber: 2 });
    fireEvent.click(screen.getByLabelText('Passport'));
    fireEvent.change(screen.getByLabelText('Travel document number'), { target: { value: 'abc123' } });
    fireEvent.change(screen.getByLabelText('Issuing state'), { target: { value: 'GBR' } });
    fireEvent.change(screen.getByTestId('nationality-field'), { target: { value: 'AUS' } });
    fireEvent.change(screen.getByTestId('documentExpiryDateDay-field'), { target: { value: '1' } });
    fireEvent.change(screen.getByTestId('documentExpiryDateMonth-field'), { target: { value: '11' } });
    fireEvent.change(screen.getByTestId('documentExpiryDateYear-field'), { target: { value: '2025' } });
    expect(window.sessionStorage.getItem('formData')).toStrictEqual(expectedPage2FormData);
  });

  it('should prefill person details if type is edit', async () => {
    const history = createMemoryHistory();
    const state = { peopleId: 'person123', source: 'edit' };
    history.push('/people/edit-person/page-1', state);
    mockAxios
      .onGet(`${PEOPLE_URL}/person123`)
      .reply(200, {
        id: 'person123',
        firstName: 'Joe',
        lastName: 'Blogs',
        dateOfBirth: '1990-11-01',
        gender: 'Male',
        nationality: 'AIA',
        placeOfBirth: 'London',
        documentIssuingState: 'GBR',
        documentType: 'Passport',
        documentNumber: '12345',
        documentExpiryDate: '2025-02-22',
      });

    await waitFor(() => {
      render(
        <Router history={history}>
          <PersonForm type="edit" source="edit" />
        </Router>,
      );
    });

    expect(screen.getByText('Update details of the person you sail with').outerHTML).toEqual('<h1 class="govuk-heading-l">Update details of the person you sail with</h1>');
    expect(screen.getByDisplayValue('Joe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Blogs')).toBeInTheDocument();
    expect(screen.getByDisplayValue('01')).toBeInTheDocument();
    expect(screen.getByDisplayValue('11')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1990')).toBeInTheDocument();
    expect(screen.getByDisplayValue('London')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Male')).toBeChecked();

    await waitFor(() => {
      renderPage({
        type: 'edit', source: 'edit', pageNumber: 2,
      });
    });
    expect(screen.getByDisplayValue('Passport')).toBeChecked();
    expect(screen.getByDisplayValue('12345')).toBeInTheDocument();
    expect(screen.queryByRole('combobox').value).toBe('AIA');
    expect(screen.getByDisplayValue('GBR')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2025')).toBeInTheDocument();
    expect(screen.getByDisplayValue('02')).toBeInTheDocument();
    expect(screen.getByDisplayValue('22')).toBeInTheDocument();
  });

  it('should show a delete option if you are in edit type', async () => {
    renderPage({ type: 'edit', source: 'edit', pageNumber: 1 });
    expect(screen.getByText('Delete this person')).toBeInTheDocument();
  });

  it('should show NOT a delete option if you are NOT in edit type', async () => {
    renderPage({ pageNumber: 1 });
    expect(screen.queryByText('Delete this person')).not.toBeInTheDocument();
  });
});