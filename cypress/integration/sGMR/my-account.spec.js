describe('My Account details verification', () => {
  before(() => {
    cy.registerUser();
  });

  it('Should show correct account details', () => {
    cy.login();
    cy.navigation('Account');
    cy.url().should('include', '/account');
    cy.readFile('cypress/fixtures/user-registration.json');
    cy.fixture('user-registration.json').then((accountInfo) => {
      cy.get('.govuk-summary-list__row').within(() => {
        cy.get('.govuk-summary-list__key').eq(0).should('have.text', 'First name');
        cy.get('.govuk-summary-list__value').eq(0).should('have.text', accountInfo.firstName);
        cy.get('.govuk-summary-list__key').eq(1).should('have.text', 'Last name');
        cy.get('.govuk-summary-list__value').eq(1).should('have.text', accountInfo.lastName);
        cy.get('.govuk-summary-list__key').eq(2).should('have.text', 'Email');
        cy.get('.govuk-summary-list__value').eq(2).should('have.text', accountInfo.email);
        cy.get('.govuk-summary-list__key').eq(3).should('have.text', 'Mobile number');
        cy.get('.govuk-summary-list__value').eq(3).should('have.text', accountInfo.mobileNumber);
      });
    });
  });

  after(() => {
    cy.navigation('Signout');
    cy.url().should('include', '/sign-in');
  });
});
