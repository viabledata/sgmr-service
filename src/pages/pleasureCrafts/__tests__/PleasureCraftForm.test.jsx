import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
// eslint-disable-next-line import/no-extraneous-dependencies
import PleasureCraftForm from '../PleasureCraftForm';

const renderPage = ({
  type, source, pageNumber,
}) => {
  render(
    <MemoryRouter initialEntries={[{ pathname: `/page-${pageNumber}` }]}>
      <PleasureCraftForm type={type} source={source} />
    </MemoryRouter>,
  );
};

describe('Creating and editing people', () => {
  const mockAxios = new MockAdapter(axios);

  beforeEach(() => {
    mockAxios.reset();
    window.sessionStorage.removeItem('formData');
  });

  // it('should render different titles based on where the user comes from', () => {
  //   const testTitle = (text) => {
  //     expect(screen.getByText(text).outerHTML).toEqual(`<h1 class="govuk-heading-l">${text}</h1>`);
  //   };

  //   renderPage({ pageNumber: 1, source: 'onboarding' });
  //   testTitle('Add a pleasure craft');

  //   renderPage({ pageNumber: 2, source: 'onboarding' });
  //   testTitle('Add a pleasure craft');

  //   renderPage({ pageNumber: 1, source: 'voyage' });
  //   testTitle('Add a pleasure craft');

  //   renderPage({ pageNumber: 2, source: 'voyage' });
  //   testTitle('Add a pleasure craft');

  //   renderPage({ pageNumber: 1, source: 'edit' });
  //   testTitle('Update details of a pleasure craft');

  //   renderPage({ pageNumber: 2, source: 'edit' });
  //   testTitle('Update details of a pleasure craft');

  //   renderPage({ pageNumber: 1 });
  //   testTitle('Add a pleasure craft');

  //   renderPage({ pageNumber: 2 });
  //   testTitle('Add a pleasure craft');
  // });

  it('should render errors on continue if fields on page 1 are empty', async () => {
    renderPage({ pageNumber: 1 });
    await waitFor(() => fireEvent.click(screen.getByText('Continue')));
    expect(screen.queryAllByText('You must enter a pleasure craft name')).toHaveLength(2);
    expect(screen.queryAllByText('You must select a type of pleasure craft')).toHaveLength(2);
  });

  it('should render errors on continue if pleasure craft type is OTHER and other text input is null', async () => {
    renderPage({ pageNumber: 1 });
    expect(screen.queryByText('Please specify')).not.toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Other'));
    expect(screen.getByLabelText('Other')).toBeChecked();
    expect(screen.getByText('Please specify')).toBeInTheDocument();

    await waitFor(() => fireEvent.click(screen.getByText('Continue')));
    expect(screen.queryAllByText('You must select a type of pleasure craft')).toHaveLength(2);
  });

  // it('should scroll to error if user clicks on error text', async () => {
  //   renderPage({ pageNumber: 1 });
  //   await waitFor(() => fireEvent.click(screen.getByText('Continue')));
  //   expect(screen.queryAllByText('You must enter a pleasure craft name')).toHaveLength(2);
  //   expect(screen.getByRole('link', { name: 'You must enter a pleasure craft name' })).toBeInTheDocument();

  //   const scrollIntoViewMock = jest.fn();
  //   window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
  //   await waitFor(() => fireEvent.click(screen.getByRole('link', { name: 'You must enter a pleasure craft name' })));
  //   expect(scrollIntoViewMock).toBeCalled();
  // });

  // it('should load next page when user clicks continue and there are no errors', async () => {
  //   renderPage({ pageNumber: 1 });
  //   fireEvent.change(screen.getByLabelText('Name of pleasure craft'), { target: { value: 'Starlight' } });
  //   fireEvent.click(screen.getByLabelText('Motorboat'));
  //   await waitFor(() => fireEvent.click(screen.getByText('Continue')));
  //   expect(screen.getByText('Does this pleasure craft have a Registration number?')).toBeInTheDocument();
  // });

  // it('should render errors on save if fields on page 2 are empty', async () => {
  //   renderPage({ pageNumber: 1 });
  //   await waitFor(() => fireEvent.click(screen.getByText('Continue')));
  //   expect(screen.queryAllByText('You must select if the pleasure craft has a registration number')).toHaveLength(2);
  //   expect(screen.queryAllByText('You must select if the pleasure craft has an Automatic Identification System (AIS)')).toHaveLength(2);
  //   expect(screen.queryAllByText('You must select if the pleasure craft has a Maritime Mobile Service Identify number (MMSI)')).toHaveLength(2);
  //   expect(screen.queryAllByText('You must select if the pleasure craft has a Call sign')).toHaveLength(2);
  // });

  // it('should render errors on save if registration number is YES and other text input is null', async () => {
  //   renderPage({ pageNumber: 2 });
  //   expect(screen.queryByText('Registration number')).not.toBeInTheDocument();
  //   expect(screen.queryByText('Country of registration')).not.toBeInTheDocument();
  //   fireEvent.click(screen.getByLabelText('Yes'));
  //   expect(screen.getByLabelText('Yes')).toBeChecked();
  //   expect(screen.getByText('Registration number')).toBeInTheDocument();
  //   expect(screen.getByText('Country of registration')).toBeInTheDocument();

  //   await waitFor(() => fireEvent.click(screen.getByText('Save')));
  //   expect(screen.queryAllByText('You must enter a registration number')).toHaveLength(2);
  //   expect(screen.queryAllByText('You must enter a country of registration')).toHaveLength(2);
  // });

  // it('should render errors on save if call sign is YES and other text input is null', async () => {
  //   renderPage({ pageNumber: 2 });
  //   expect(screen.queryByText('Call sign')).not.toBeInTheDocument();
  //   fireEvent.click(screen.getByLabelText('Yes'));
  //   expect(screen.getByLabelText('Yes')).toBeChecked();
  //   expect(screen.getByText('Call sign')).toBeInTheDocument();

  //   await waitFor(() => fireEvent.click(screen.getByText('Save')));
  //   expect(screen.queryAllByText('You must enter a Call sign')).toHaveLength(2);
  // });

  // it('should load previous page when user clicks back regardless of errors', async () => {
  //   renderPage({ pageNumber: 2 });
  //   await waitFor(() => fireEvent.click(screen.getByText('Back')));
  //   expect(screen.getByText('Name of pleasure craft')).toBeInTheDocument();
  // });

  // it('should clear error for a field if user interacts with that field', async () => {
  //   renderPage({ pageNumber: 1 });
  //   await waitFor(() => fireEvent.click(screen.getByText('Continue')));
  //   expect(screen.queryAllByText('You must enter a pleasure craft name')).toHaveLength(2);
  //   expect(screen.queryAllByText('You must enter a type of pleasure craft')).toHaveLength(2);

  //   fireEvent.change(screen.getByLabelText('Name of pleasure craft'), { target: { value: 'S' } });
  //   expect(screen.queryAllByText('You must enter a pleasure craft name')).toHaveLength(0);
  //   expect(screen.queryAllByText('You must enter a type of pleasure craft')).toHaveLength(2);
  // });

  // it('should allow you to exit without saving even if required fields arent valid', async () => {
  //   renderPage({ pageNumber: 1 });
  //   await waitFor(() => fireEvent.click(screen.getByText('Exit without saving')));
  //   expect(screen.queryAllByText('There is a problem')).toHaveLength(0);
  // });
});
