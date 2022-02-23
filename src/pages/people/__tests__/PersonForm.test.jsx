import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PersonForm from '../PersonForm';

describe('Creating and editing people', () => {
  it('should render different titles based on where the user comes from', () => {
    render(<MemoryRouter initialEntries={[{ pathname: '/page-1' }]}><PersonForm source="onboarding" /></MemoryRouter>);
    const titleOnboarding = screen.getByText('Add details of a person you frequently sail with');
    expect(titleOnboarding.outerHTML).toEqual('<h1 class="govuk-heading-l">Add details of a person you frequently sail with</h1>');

    render(<MemoryRouter initialEntries={[{ pathname: '/page-1' }]}><PersonForm source="voyage" /></MemoryRouter>);
    const titleVoyage = screen.getByText('Add details of the person you are sailing with');
    expect(titleVoyage.outerHTML).toEqual('<h1 class="govuk-heading-l">Add details of the person you are sailing with</h1>');

    render(<MemoryRouter initialEntries={[{ pathname: '/page-1' }]}><PersonForm source="edit" /></MemoryRouter>);
    const titleEdit = screen.getByText('Update details of the person you sail with');
    expect(titleEdit.outerHTML).toEqual('<h1 class="govuk-heading-l">Update details of the person you sail with</h1>');

    render(<MemoryRouter initialEntries={[{ pathname: '/page-1' }]}><PersonForm /></MemoryRouter>);
    const titleNoSource = screen.getByText('Add details of the person you frequently sail with');
    expect(titleNoSource.outerHTML).toEqual('<h1 class="govuk-heading-l">Add details of the person you frequently sail with</h1>');
  });
});
