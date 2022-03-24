import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserContext from '../UserContext';
import WelcomeBanner from '../WelcomeBanner';

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <UserContext.Provider value={providerProps}>{ui}</UserContext.Provider>,
    renderOptions,
  );
};

const providerProps = {
  user: {
    dateCreated: '2020-10-05T09:39:21.824679',
    email: 'John_Doe@test.com',
    firstName: 'John',
    id: '44acf985-1982-49aa-ac3b-15d365de163a',
    lastName: 'Doe',
    lastUpdated: '2020-10-08T09:55:35.504039',
    mobileNumber: '07444112888',
    people: [],
    role: { name: 'User', id: '2a960d7a-6bca-4453-8f5c-acbb8b0f9403' },
    state: 'verified',
    vessels: [],
  },
};

describe('WelcomeBanner', () => {
  it('should display the users details', () => {
    customRender(<WelcomeBanner />, { providerProps });

    expect(screen.getByText('Welcome back, John')).toBeInTheDocument();
  });

  it('should show the welcome back text as a heading', () => {
    customRender(<WelcomeBanner />, { providerProps });

    const content = screen.getByText('Welcome back, John');
    expect(content.outerHTML).toEqual('<h3 class="govuk-heading-m">Welcome back, John</h3>');
  });

  it('should not render page if there is no user data', () => {
    const { container } = customRender(<WelcomeBanner />, { providerProps: {} });
    // expect empty component
    expect(container.childElementCount).toEqual(0);
  });
});
