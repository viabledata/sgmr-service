describe('Account deletion', () => {
  before(() => {
    cy.registerUser();
  });

  it('Should NOT delete an account when user does NOT confirm the deletion', () => {
    cy.login();
    cy.contains('a', 'Account').click();
    cy.contains('button', 'Edit Account').click();
    cy.contains('a', 'Delete this account').click();
    cy.url().should('include', '/account/delete');
    cy.contains('label', 'No').click();
    cy.contains('button', 'Continue').click();
    cy.url().should('include', '/account/edit');
  });

  it('Should delete an account when user confirms the deletion', () => {
    cy.login();
    cy.contains('a', 'Account').click();
    cy.contains('button', 'Edit Account').click();
    cy.contains('a', 'Delete this account').click();
    cy.url().should('include', '/account/delete');
    cy.contains('label', 'Yes').click();
    cy.contains('button', 'Continue').click();
    cy.url().should('include', '/account/delete-confirmation');
    cy.contains('h1', 'Your account is now deleted')
      .next()
      .contains('Use the registration form to create a new one.')
      .contains('a', 'registration form')
      .should(
        'have.attr',
        'href',
        '/register',
      );
  });

  it('Should not be Logged in with deleted account', () => {
    cy.visit('/sign-in');
    cy.fixture('users.json').then((user) => {
      cy.get('input[name="email"]').clear().type(user.email);
      cy.get('input[name="password"]').clear().type(user.password);
      cy.get('.govuk-button').click();
    });
    cy.get('.govuk-error-summary__list')
      .should('be.visible')
      .contains('Email and password combination is invalid');
  });
});
