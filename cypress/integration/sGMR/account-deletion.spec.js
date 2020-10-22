describe('Account deletion', () => {
  beforeEach(() => {
    cy.registerUser();
    cy.login();
  });

  it('Should NOT delete an account when user does NOT confirm the deletion', () => {
    cy.contains('a', 'Account').click();
    cy.contains('button', 'Edit Account').click();
    cy.contains('a', 'Delete this account').click();
    cy.url().should('include', '/account/delete');
    cy.contains('label', 'No').click();
    cy.contains('button', 'Continue').click();
    cy.url().should('include', '/account/edit');
  });

  it('Should delete an account when user confirms the deletion', () => {
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
});
