import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import PeopleForm from '../PeopleForm';

const renderPage = ({ source, pageNumber }) => {
  render(
    <MemoryRouter initialEntries={[{ pathname: `/page-${pageNumber}` }]}>
      <PeopleForm source={source} />
    </MemoryRouter>,
  );
};

describe('Creating and editing people', () => {
  beforeEach(() => {
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

  it('should render errors on save if fields on page 1 are empty', async () => {
    renderPage({ pageNumber: 1 });
    await waitFor(() => fireEvent.click(screen.getByText('Continue')));
    expect(screen.queryAllByText('You must enter a given name')).toHaveLength(2);
    expect(screen.queryAllByText('You must enter a surname')).toHaveLength(2);
    expect(screen.queryAllByText('You must enter a date of birth')).toHaveLength(2);
  });

  it('should load next page when user clicks continue and there are no errors', async () => {
    renderPage({ pageNumber: 1 });
    fireEvent.change(screen.getByLabelText('Given name(s)'), { target: { value: 'Joe' } });
    fireEvent.change(screen.getByLabelText('Surname'), { target: { value: 'Bloggs' } });
    fireEvent.change(screen.getByLabelText('Day'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Month'), { target: { value: '11' } });
    fireEvent.change(screen.getByLabelText('Year'), { target: { value: '1990' } });
    await waitFor(() => fireEvent.click(screen.getByText('Continue')));
    expect(screen.getByText('Select a travel document type')).toBeInTheDocument();
  });

  it('should load previous page when user clicks back regardless of errors', async () => {
    renderPage({ pageNumber: 2 });
    await waitFor(() => fireEvent.click(screen.getByText('Back')));
    expect(screen.getByText('Given name(s)')).toBeInTheDocument();
  });
});
