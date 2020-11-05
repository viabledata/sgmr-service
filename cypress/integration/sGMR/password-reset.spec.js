describe('User Request for Password reset', () => {
  before(() => {
    cy.registerUser();
    cy.login();
    cy.navigation('Signout');
    cy.url().should('include', '/sign-in');
  });

  it('Should reset password succesfully', () => {
    let apiServer = Cypress.env('api_server');
    cy.visit('/sign-in');
    cy.contains('Problems signing in?').click();
    cy.get('input[name="email"]').clear().type('cb52ca14-0d64-4821-9970-4e81b47e13c1@mailslurp.com');
    cy.get('.govuk-button').click();
    cy.waitForLatestEmail('cb52ca14-0d64-4821-9970-4e81b47e13c1').then((mail) => {
      assert.isDefined(mail);
      const token = /token=([A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*)/.exec(mail.body)[1];
      const email = /email=([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/i.exec(mail.body)[1];
      cy.log('token:', token, 'email', email);
      cy.request({
        url: `${apiServer}/activate-account`,
        method: 'POST',
        body: {
          token: `${token}`,
        },
      }).then((activateResponse) => {
        expect(activateResponse.status).to.eq(200);
        expect(activateResponse.body.email).to.eq(email);
      });
    });
  });
});
