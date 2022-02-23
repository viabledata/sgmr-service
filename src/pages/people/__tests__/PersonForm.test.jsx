import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, getByLabelText, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PersonForm from '../PersonForm';

const renderPage = (pageNumber, source) => {
  render(
    <MemoryRouter initialEntries={[{ pathname: `/page-${pageNumber}` }]}>
      <PersonForm source={source} />
    </MemoryRouter>,
  );
};

describe('Creating and editing people', () => {
  it('should render different titles based on where the user comes from', () => {
    const testTitle = (text) => {
      expect(screen.getByText(text).outerHTML).toEqual(`<h1 class="govuk-heading-l">${text}</h1>`);
    };

    renderPage(1, 'onboarding');
    testTitle('Add details of a person you frequently sail with');

    renderPage(2, 'onboarding');
    testTitle('Add details of a person you frequently sail with');

    renderPage(1, 'voyage');
    testTitle('Add details of the person you are sailing with');

    renderPage(2, 'voyage');
    testTitle('Add details of the person you are sailing with');

    renderPage(1, 'edit');
    testTitle('Update details of the person you sail with');

    renderPage(2, 'edit');
    testTitle('Update details of the person you sail with');

    renderPage(1);
    testTitle('Add details of the person you frequently sail with');

    renderPage(2);
    testTitle('Add details of the person you frequently sail with');
  });

  it('should render errors on save if fields on page 1 are empty', async () => {
    renderPage(1);
    await waitFor(() => fireEvent.click(screen.getByText('Continue')));
    expect(screen.queryAllByText('You must enter a given name')).toHaveLength(2);
    expect(screen.queryAllByText('You must enter a surname')).toHaveLength(2);
    expect(screen.queryAllByText('You must enter a date of birth')).toHaveLength(2);
  });

  it('should render errors on save if fields on page 2 are empty', async () => {
    renderPage(2);
    await waitFor(() => fireEvent.click(screen.getByText('Save')));
    expect(screen.queryAllByText('You must select a document type')).toHaveLength(2);
    expect(screen.queryAllByText('You must enter a document number')).toHaveLength(2);
    expect(screen.queryAllByText('You must select a nationality')).toHaveLength(2);
    expect(screen.queryAllByText('You must select a document expiry')).toHaveLength(2);
  });

  it('should render errors on save if document expiry is YES and expiry date is null or invalid', async () => {
    renderPage(2);
    const expiryDateRadioNo = screen.getByLabelText('No');
    fireEvent.click(expiryDateRadioNo);
    expect(expiryDateRadioNo).toBeChecked();
    expect(screen.queryByText('Expiry date')).not.toBeInTheDocument();

    const expiryDateRadioYes = screen.getByLabelText('Yes');
    fireEvent.click(expiryDateRadioYes);
    expect(expiryDateRadioYes).toBeChecked();
    expect(expiryDateRadioNo).not.toBeChecked();
    expect(screen.getByText('Expiry date')).toBeInTheDocument();

    await waitFor(() => fireEvent.click(screen.getByText('Save')));
    expect(screen.queryAllByText('You must enter an expiry date')).toHaveLength(2);
  });

  it('should render correct fields on page1 of the form', () => {
    renderPage(1);
    expect(screen.queryByText('There is a problem')).not.toBeInTheDocument();
    // on submit expect sessionStorage to have formData
    // expect formData to match formData
  });
});
