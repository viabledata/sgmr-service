import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PersonForm from '../PersonForm';

describe('Creating and editing people', () => {
  it('should render page 1 of the people form when people page is loaded with a source of onboarding', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/page-1' }]}>
        <PersonForm source="onboarding" />
      </MemoryRouter>,
    );
    const title = screen.getByText('Add details of a person you frequently sail with');
    expect(title.outerHTML).toEqual('<h1 class="govuk-heading-l">Add details of a person you frequently sail with</h1>');
  });

  it('should render page 1 of the people form when people page is loaded with a source of voyage', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/page-1' }]}>
        <PersonForm source="voyage" />
      </MemoryRouter>,
    );
    const title = screen.getByText('Add details of the person you are sailing with');
    expect(title.outerHTML).toEqual('<h1 class="govuk-heading-l">Add details of the person you are sailing with</h1>');
  });

  it('should render page 1 of the people form when people page is loaded with a source of edit', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/page-1' }]}>
        <PersonForm source="edit" />
      </MemoryRouter>,
    );
    const title = screen.getByText('Update details of the person you sail with');
    expect(title.outerHTML).toEqual('<h1 class="govuk-heading-l">Update details of the person you sail with</h1>');
  });

  it('should render page 1 of the people form when people page is loaded with no source', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/page-1' }]}>
        <PersonForm />
      </MemoryRouter>,
    );
    const title = screen.getByText('Add details of the person you frequently sail with');
    expect(title.outerHTML).toEqual('<h1 class="govuk-heading-l">Add details of the person you frequently sail with</h1>');
  });
});
