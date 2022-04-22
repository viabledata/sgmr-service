import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import WelcomeBanner from '../WelcomeBanner';

describe('WelcomeBanner', () => {
  it('should display the users details', () => {
    render(<WelcomeBanner user="John" />);

    expect(screen.getByText('Welcome back, John')).toBeInTheDocument();
  });

  it('should show the welcome back text as a heading', () => {
    render(<WelcomeBanner user="John" />);

    const content = screen.getByText('Welcome back, John');
    expect(content.outerHTML).toEqual('<h3 class="govuk-heading-m">Welcome back, John</h3>');
  });

  it('should not render page if there is no user data', () => {
    const { container } = render(<WelcomeBanner user="" />);
    // expect empty component
    expect(container.childElementCount).toEqual(0);
  });
});
