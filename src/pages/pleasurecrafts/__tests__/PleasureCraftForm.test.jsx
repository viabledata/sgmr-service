import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { VESSELS_URL } from '../../../constants/ApiConstants';
import PleasureCraftForm from '../PleasureCraftForm';

const renderPage = ({
  type, source, vesselId, pageNumber,
}) => {
  render(
    <MemoryRouter initialEntries={[{ pathname: `/page-${pageNumber}` }]}>
      <PleasureCraftForm type={type} source={source} vesselId={vesselId} />
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
      expect(screen.getAllByText(text)[0].outerHTML).toEqual(`<h1 class="govuk-heading-l">${text}</h1>`);
    };

    renderPage({ pageNumber: 1, source: 'onboarding' });
    testTitle('Add details of a pleasure craft you frequently sail with');

    renderPage({ pageNumber: 2, source: 'onboarding' });
    testTitle('Add details of a pleasure craft you frequently sail with');

    renderPage({ pageNumber: 1, source: 'voyage' });
    testTitle('Add details of a pleasure craft you are sailing with');

    renderPage({ pageNumber: 2, source: 'voyage' });
    testTitle('Add details of a pleasure craft you are sailing with');

    renderPage({ pageNumber: 1, source: 'edit' });
    testTitle('Update details of a pleasure craft you sail with');

    renderPage({ pageNumber: 2, source: 'edit' });
    testTitle('Update details of a pleasure craft you sail with');

    renderPage({ pageNumber: 1 });
    testTitle('Add details of a pleasure craft you frequently sail with');

    renderPage({ pageNumber: 2 });
    testTitle('Add details of a pleasure craft you frequently sail with');
  });

  it('should render errors on continue if fields on page 1 are empty', async () => {
    renderPage({ pageNumber: 1 });
    await waitFor(() => fireEvent.click(screen.getByText('Continue')));
    expect(screen.queryAllByText('You must enter a pleasure craft name')).toHaveLength(2);
    expect(screen.queryAllByText('You must enter a pleasure craft type')).toHaveLength(2);
  });

  it('should scroll to error if user clicks on error text', async () => {
    renderPage({ pageNumber: 1 });
    await waitFor(() => fireEvent.click(screen.getByText('Continue')));
    expect(screen.queryAllByText('You must enter a pleasure craft name')).toHaveLength(2);
    expect(screen.getByRole('link', { name: 'You must enter a pleasure craft name' })).toBeInTheDocument();

    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
    await waitFor(() => fireEvent.click(screen.getByRole('link', { name: 'You must enter a pleasure craft name' })));
    expect(scrollIntoViewMock).toBeCalled();
  });

  it('should load next page when user clicks continue and there are no errors', async () => {
    renderPage({ pageNumber: 1 });
    fireEvent.change(screen.getByLabelText('Name of pleasure craft'), { target: { value: 'Viable Cruiser' } });
    fireEvent.click(screen.getByLabelText('Sailing boat'));
    await waitFor(() => fireEvent.click(screen.getByText('Continue')));
    expect(screen.getByText('Does this pleasure craft have a registration number?')).toBeInTheDocument();
  });

  it('should load previous page when user clicks back regardless of errors', async () => {
    renderPage({ pageNumber: 2 });
    await waitFor(() => fireEvent.click(screen.getByText('Back')));
    expect(screen.getByText('Name of pleasure craft')).toBeInTheDocument();
  });

  it('should render errors on save if fields on page 2 are empty', async () => {
    renderPage({ pageNumber: 2 });
    await waitFor(() => fireEvent.click(screen.getByText('Save')));
    expect(screen.queryAllByText('You must select an option for the pleasure craft registration number')).toHaveLength(2);
    expect(screen.queryAllByText('You must enter the pleasure craft nationality')).toHaveLength(2);
    expect(screen.queryAllByText('You must specify if the pleasure craft has an AIS')).toHaveLength(2);
    expect(screen.queryAllByText('You must specify if the pleasure craft has a MMSI')).toHaveLength(2);
    expect(screen.queryAllByText('You must specify if the pleasure craft has a callsign')).toHaveLength(2);
  });

  it('should render errors on save if pleasure craft type is OTHER and other text input is null', async () => {
    renderPage({ pageNumber: 1 });
    expect(screen.queryByText('Please specify')).not.toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Other'));
    expect(screen.getByLabelText('Other')).toBeChecked();
    expect(screen.getByText('Please specify')).toBeInTheDocument();

    await waitFor(() => fireEvent.click(screen.getByText('Continue')));
    expect(screen.queryAllByText('You must enter a pleasure craft type')).toHaveLength(2);
  });

  it('should clear error for a field if user interacts with that field', async () => {
    renderPage({ pageNumber: 1 });
    await waitFor(() => fireEvent.click(screen.getByText('Continue')));
    expect(screen.queryAllByText('You must enter a pleasure craft name')).toHaveLength(2);
    expect(screen.queryAllByText('You must enter a pleasure craft type')).toHaveLength(2);

    fireEvent.change(screen.getByLabelText('Name of pleasure craft'), { target: { value: 'J' } });
    expect(screen.queryAllByText('You must enter a pleasure craft name')).toHaveLength(0);
    expect(screen.queryAllByText('You must enter a pleasure craft type')).toHaveLength(2);
  });

  it('should allow you to exit without saving even if required fields arent valid', async () => {
    renderPage({ pageNumber: 1 });
    await waitFor(() => fireEvent.click(screen.getByText('Exit without saving')));
    expect(screen.queryAllByText('There is a problem')).toHaveLength(0);
  });

  it('should store form data in the session for use on refresh', async () => {
    const expectedPage1FormData = '{"vesselName":"Viable Cruiser","vesselType":"sailingBoat"}';
    // eslint-disable-next-line max-len
    const expectedPage2FormData = '{"vesselName":"Viable Cruiser","vesselType":"sailingBoat","registration":"3278462","nationality":"GBR","ais":"yes","mmsi":"324838","callsign":"V14BL"}';
    renderPage({ pageNumber: 1 });
    fireEvent.change(screen.getByLabelText('Name of pleasure craft'), { target: { value: 'Viable Cruiser' } });
    fireEvent.click(screen.getByLabelText('Sailing boat'));
    expect(window.sessionStorage.getItem('formData')).toStrictEqual(expectedPage1FormData);

    renderPage({ pageNumber: 2 });
    fireEvent.click(screen.getAllByLabelText('Yes')[0]);
    fireEvent.change(screen.getByLabelText('Registration number'), { target: { value: '3278462' } });
    fireEvent.change(screen.getByLabelText('Country of registration'), { target: { value: 'GBR' } });
    // await waitFor(() => fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Australia' } }));
    fireEvent.click(screen.getAllByLabelText('Yes')[1]);
    fireEvent.click(screen.getAllByLabelText('Yes')[2]);
    fireEvent.click(screen.getAllByLabelText('Yes')[3]);
    fireEvent.change(screen.getByLabelText('MMSI number'), { target: { value: '324838' } });
    fireEvent.change(screen.getByLabelText('Call sign'), { target: { value: 'V14BL' } });
    expect(window.sessionStorage.getItem('formData')).toStrictEqual(expectedPage2FormData);
  });

  it('should prefill pleasure craft details if type is edit', async () => {
    mockAxios
      .onGet(`${VESSELS_URL}/vessel123`)
      .reply(200, {
        vesselId: 'vessel123',
        vesselName: 'Viable Cruiser',
        vesselType: 'sailingBoat',
        registration: '3278462',
        nationality: 'GBR',
        ais: 'yes',
        mmsi: '324838',
        callsign: 'V14BL',
      });

    await waitFor(() => {
      renderPage({
        type: 'edit', source: 'edit', vesselId: 'vessel123', pageNumber: 1,
      });
    });

    // eslint-disable-next-line max-len
    expect(screen.getByText('Update details of a pleasure craft you sail with').outerHTML).toEqual('<h1 class="govuk-heading-l">Update details of a pleasure craft you sail with</h1>');
    // expect(screen.getByDisplayValue('Viable Cruiser')).toBeInTheDocument();
    expect(screen.getByLabelText('Sailing boat')).toBeChecked();

    await waitFor(() => {
      renderPage({
        type: 'edit', source: 'edit', vesselId: 'vessel123', pageNumber: 2,
      });
    });
    expect(screen.getAllByLabelText('Yes')[0]).toBeChecked();
    expect(screen.getByDisplayValue('3278462')).toBeInTheDocument();
    expect(screen.getByDisplayValue('GBR')).toBeInTheDocument();
    // expect(screen.queryByRole('combobox').value).toBe('AIA');
    expect(screen.getAllByLabelText('Yes')[1]).toBeChecked();
    expect(screen.getByDisplayValue('yes')).toBeInTheDocument();
    expect(screen.getAllByLabelText('Yes')[2]).toBeChecked();
    expect(screen.getByDisplayValue('324838')).toBeInTheDocument();
    expect(screen.getAllByLabelText('Yes')[3]).toBeChecked();
    expect(screen.getByDisplayValue('V14BL')).toBeInTheDocument();
  });

  it('should show a delete option if you are in edit type', async () => {
    renderPage({ type: 'edit', source: 'edit', pageNumber: 1 });
    expect(screen.getByText('Delete this pleasure craft')).toBeInTheDocument();
  });

  it('should show NOT a delete option if you are NOT in edit type', async () => {
    renderPage({ pageNumber: 1 });
    expect(screen.queryByText('Delete this pleasure craft')).not.toBeInTheDocument();
  });
});
