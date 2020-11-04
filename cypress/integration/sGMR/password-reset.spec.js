describe('User Request for Password reset', () => {
  let email;
  let inboxId;

  before(() => {
    cy.createInbox().then((inbox) => {
      // verify a new inbox was created
      assert.isDefined(inbox);
      email = inbox.emailAddress;
      inboxId = inbox.id;
      cy.fixture('user-registration.json').then((registrationData) => {
        registrationData.email = email;
        cy.registerUser(registrationData);
        cy.visit('/sign-in');
        cy.get('input[name="email"]').clear().type(email);
        cy.get('input[name="password"]').clear().type('test1234');
        cy.get('.govuk-button').click();
        cy.server();
        cy.route('POST', `${Cypress.env('api_server')}/login`).as('login');

        cy.get('.govuk-button').click();
        cy.url().should('include', '/verify?source=reports');

        cy.wait('@login').should((xhr) => {
          expect(xhr.status).to.eq(200);
          let authCode = xhr.responseBody.twoFactorToken;
          cy.get('input[name="twoFactorToken"]').clear().type(authCode);
          cy.get('.govuk-button').click();
        });
        cy.navigation('Signout');
        cy.url().should('include', '/sign-in');
      });
    });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('Should reset password succesfully', () => {
    cy.contains('Problems signing in?').click();
    cy.get('input[name="email"]').clear().type(email);
    cy.get('.govuk-button').click();
    cy.log(inboxId);
    cy.waitForLatestEmail(inboxId).then((mail) => {
      // verify we received an email
      assert.isDefined(mail);
      cy.log(mail.body);
    });
  });
});
