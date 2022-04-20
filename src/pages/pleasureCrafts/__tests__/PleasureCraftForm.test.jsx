import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { PLEASURE_CRAFT_URL } from '../../../constants/ApiConstants';
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

describe('Creating and editing pleasure craft', () => {
  const mockAxios = new MockAdapter(axios);

  beforeEach(() => {
    mockAxios.reset();
    window.sessionStorage.removeItem('formData');
  });

  it('should render title based on user coming from onboarding', () => {
    const testTitle = (text) => {
      expect(screen.getByText(text).outerHTML).toEqual(`<h1 class="govuk-heading-l">${text}</h1>`);
    };
    renderPage({ pageNumber: 1, source: 'onboarding' });
    testTitle('Add a pleasure craft');
    renderPage({ pageNumber: 2, source: 'onboarding' });
    testTitle('Add a pleasure craft');
  });

  it('should render title based on user coming from voyage', () => {
    const testTitle = (text) => {
      expect(screen.getByText(text).outerHTML).toEqual(`<h1 class="govuk-heading-l">${text}</h1>`);
    };
    renderPage({ pageNumber: 1, source: 'voyage' });
    testTitle('Add a pleasure craft');
    renderPage({ pageNumber: 2, source: 'voyage' });
    testTitle('Add a pleasure craft');
  });

  it('should render title based on user coming from edit', () => {
    const testTitle = (text) => {
      expect(screen.getByText(text).outerHTML).toEqual(`<h1 class="govuk-heading-l">${text}</h1>`);
    };
    renderPage({ pageNumber: 1, source: 'edit' });
    testTitle('Update details of your pleasure craft');
    renderPage({ pageNumber: 2, source: 'edit' });
    testTitle('Update details of your pleasure craft');
  });

  it('should render title based on user coming from anywhere else', () => {
    const testTitle = (text) => {
      expect(screen.getByText(text).outerHTML).toEqual(`<h1 class="govuk-heading-l">${text}</h1>`);
    };
    renderPage({ pageNumber: 1 });
    testTitle('Add a pleasure craft');
    renderPage({ pageNumber: 2 });
    testTitle('Add a pleasure craft');
  });

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
    fireEvent.change(screen.getByLabelText('Name of pleasure craft'), { target: { value: 'Starlight' } });
    fireEvent.click(screen.getByLabelText('Motorboat'));
    fireEvent.change(screen.getByLabelText('Usual moorings'), { target: { value: 'London' } });
    await waitFor(() => fireEvent.click(screen.getByText('Continue')));
    expect(screen.getByText('Registration number')).toBeInTheDocument();
  });

  it('should render errors on save if fields on page 2 are empty', async () => {
    renderPage({ pageNumber: 2 });
    await waitFor(() => fireEvent.click(screen.getByText('Save')));
    expect(screen.queryAllByText('You must enter a registration number')).toHaveLength(2);
    expect(screen.queryAllByText('You must select if your pleasure craft has acountry of registration')).toHaveLength(2);
    // Waiting on API update: expect(screen.queryAllByText('You must select if the pleasure craft has an Automatic Identification System (AIS)')).toHaveLength(2);
    // Waiting on API update: expect(screen.queryAllByText('You must select if the pleasure craft has a Maritime Mobile Service Identify number (MMSI)')).toHaveLength(2);
    expect(screen.queryAllByText('You must select if the pleasure craft has a call sign')).toHaveLength(2);
  });

  it('should render errors on save if registration country is YES and other text input is null', async () => {
    renderPage({ pageNumber: 2 });
    expect(screen.queryByText('Country of registration')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('registrationCountryYes'));
    expect(screen.getByTestId('registrationCountryYes')).toBeChecked();
    expect(screen.getByText('Country of registration')).toBeInTheDocument();

    await waitFor(() => fireEvent.click(screen.getByText('Save')));
    expect(screen.queryAllByText('You must enter a country of registration')).toHaveLength(2);
  });

  it('should render errors on save if call sign is YES and other text input is null', async () => {
    renderPage({ pageNumber: 2 });
    expect(screen.queryByText('Call sign')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('callSignYes'));
    expect(screen.getByTestId('callSignYes')).toBeChecked();
    expect(screen.getByText('Call sign')).toBeInTheDocument();

    await waitFor(() => fireEvent.click(screen.getByText('Save')));
    expect(screen.queryAllByText('You must enter a call sign')).toHaveLength(2);
  });

  it('should load previous page when user clicks back regardless of errors', async () => {
    renderPage({ pageNumber: 2 });
    await waitFor(() => fireEvent.click(screen.getByText('Back')));
    expect(screen.getByText('Name of pleasure craft')).toBeInTheDocument();
  });

  it('should clear error for a field if user interacts with that field', async () => {
    renderPage({ pageNumber: 1 });
    await waitFor(() => fireEvent.click(screen.getByText('Continue')));
    expect(screen.queryAllByText('You must enter a pleasure craft name')).toHaveLength(2);
    expect(screen.queryAllByText('You must select a type of pleasure craft')).toHaveLength(2);

    fireEvent.change(screen.getByLabelText('Name of pleasure craft'), { target: { value: 'S' } });
    expect(screen.queryAllByText('You must enter a pleasure craft name')).toHaveLength(0);
    expect(screen.queryAllByText('You must select a type of pleasure craft')).toHaveLength(2);
  });

  it('should allow you to exit without saving even if required fields arent valid', async () => {
    renderPage({ pageNumber: 1 });
    await waitFor(() => fireEvent.click(screen.getByText('Exit without saving')));
    expect(screen.queryAllByText('There is a problem')).toHaveLength(0);
  });

  it('should store form data in the session for use on refresh', async () => {
    const expectedPage1FormData = '{"pleasureCraftName":"Moonfish","type":"Sailing boat","mooring":"London"}';
    // eslint-disable-next-line max-len
    const expectedPage2FormData = '{"pleasureCraftName":"Moonfish","type":"Sailing boat","mooring":"London","registrationNumber":"Moonfish123","registrationCountry":"registrationCountryNo","callSign":"callSignYes","callSignReference":"MoonMoon"}';
    renderPage({ pageNumber: 1 });
    fireEvent.change(screen.getByLabelText('Name of pleasure craft'), { target: { value: 'Moonfish' } });
    fireEvent.click(screen.getByLabelText('Sailing boat (with or without an engine)'));
    fireEvent.change(screen.getByLabelText('Usual moorings'), { target: { value: 'London' } });
    expect(window.sessionStorage.getItem('formData')).toStrictEqual(expectedPage1FormData);

    renderPage({ pageNumber: 2 });
    fireEvent.change(screen.getByLabelText('Registration number'), { target: { value: 'Moonfish123' } });
    fireEvent.click(screen.getByTestId('registrationCountryNo'));
    fireEvent.click(screen.getByTestId('callSignYes'));
    fireEvent.change(screen.getByLabelText('Call sign'), { target: { value: 'MoonMoon' } });
    expect(window.sessionStorage.getItem('formData')).toStrictEqual(expectedPage2FormData);
  });

  it('should prefill person details if type is edit', async () => {
    const history = createMemoryHistory();
    const state = { pleasureCraftId: 'craft123', source: 'edit' };
    history.push('/pleasure-crafts/edit-pleasure-craft/page-1', state);
    mockAxios
      .onGet(`${PLEASURE_CRAFT_URL}/craft123`)
      .reply(200, {
        id: '123',
        vesselName: 'CraftOne',
        registration: 'ABCCraftOne',
        hullIdentificationNumber: '',
        vesselType: 'Sailing boat',
        portOfRegistry: '',
        vesselNationality: 'GBR',
        moorings: 'London',
        callsign: 'Bobscraft',
      });

    await waitFor(() => {
      render(
        <Router history={history}>
          <PleasureCraftForm type="edit" source="edit" />
        </Router>,
      );
    });

    expect(screen.getByText('Update details of your pleasure craft').outerHTML).toEqual('<h1 class="govuk-heading-l">Update details of your pleasure craft</h1>');
    expect(screen.getByDisplayValue('CraftOne')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Sailing boat')).toBeChecked();
    expect(screen.getByDisplayValue('London')).toBeInTheDocument();

    await waitFor(() => {
      renderPage({
        type: 'edit', source: 'edit', pageNumber: 2,
      });
    });
    expect(screen.getByDisplayValue('ABCCraftOne')).toBeInTheDocument();
    expect(screen.getByTestId('callSignYes')).toBeChecked();
    expect(screen.getByDisplayValue('GBR')).toBeInTheDocument();
    expect(screen.getByTestId('registrationCountryYes')).toBeChecked();
    expect(screen.getByDisplayValue('Bobscraft')).toBeInTheDocument();
  });

  it('should prefill person details if type is edit - and not fill optional fields if they are empty', async () => {
    const history = createMemoryHistory();
    const state = { pleasureCraftId: 'craft123', source: 'edit' };
    history.push('/pleasure-crafts/edit-pleasure-craft/page-1', state);
    mockAxios
      .onGet(`${PLEASURE_CRAFT_URL}/craft123`)
      .reply(200, {
        id: '123',
        vesselName: 'CraftOne',
        registration: 'ABCCraftOne',
        hullIdentificationNumber: '',
        vesselType: 'Sailing boat',
        portOfRegistry: '',
        vesselNationality: '',
        moorings: 'London',
        callsign: '',
      });

    await waitFor(() => {
      render(
        <Router history={history}>
          <PleasureCraftForm type="edit" source="edit" />
        </Router>,
      );
    });

    expect(screen.getByText('Update details of your pleasure craft').outerHTML).toEqual('<h1 class="govuk-heading-l">Update details of your pleasure craft</h1>');
    expect(screen.getByDisplayValue('CraftOne')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Sailing boat')).toBeChecked();
    expect(screen.getByDisplayValue('London')).toBeInTheDocument();

    await waitFor(() => {
      renderPage({
        type: 'edit', source: 'edit', pageNumber: 2,
      });
    });
    expect(screen.getByDisplayValue('ABCCraftOne')).toBeInTheDocument();
    expect(screen.getByTestId('callSignYes')).not.toBeChecked();
    expect(screen.getByTestId('registrationCountryYes')).not.toBeChecked();
    expect(screen.queryByText('Call sign')).not.toBeInTheDocument();
    expect(screen.queryByText('Country of registration')).not.toBeInTheDocument();
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
