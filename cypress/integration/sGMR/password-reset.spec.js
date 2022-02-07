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
    cy.server();
    cy.route('POST', `${apiServer}/password-reset-confirmation`).as('confirmation');
    cy.contains('Problems signing in?').click();
    cy.fixture('users.json').then((user) => {
      cy.get('input[name="email"]').clear().type(user.email);
    });
    cy.get('.govuk-button').click();
    cy.get('.govuk-body-l').should('have.text', 'A link to reset your password was sent to the provided email address.');
    cy.waitForLatestEmail('64536d92-2cdc-499e-aa3a-c532fbc60f02@mailslurp.com').then((mail) => {
      assert.isDefined(mail);
      const token = /token=([A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*)/.exec(mail.body)[1];
      cy.visit(`/new-password?token=${token}`);
    });
    cy.fixture('users.json').then((user) => {
      cy.get('input[name="password"]').clear().type(user.password);
      cy.get('input[name="confirmPassword"]').clear().type(user.password);
    });
    cy.get('.govuk-button').click();
    cy.wait('@confirmation').then((response) => {
      expect(response.status).to.eq(204);
    });
  });

  it('Should be logged-in with changed password', () => {
    cy.visit('/sign-in');
    cy.login();
    cy.fixture('user-registration.json').then((userDetails) => {
      cy.get('h3.govuk-heading-m').should('have.text', `Welcome back, ${userDetails.firstName}`);
    });
  });

  it('Should not send reset email to unknown email address', () => {
    let apiServer = Cypress.env('api_server');
    cy.visit('/sign-in');
    cy.server();
    cy.route('POST', `${apiServer}/password-reset-confirmation`).as('confirmation');
    cy.contains('Problems signing in?').click();
    cy.get('input[name="email"]').clear().type('randomddd.mail@test.com');
    cy.get('.govuk-button').click();
    cy.get('.govuk-error-summary__list')
      .should('be.visible')
      .contains('Email address does not exist');
  });

  after(() => {
    cy.deleteAllEmails();
  });

  afterEach(() => {
    localStorage.removeItem('token');
  });
});
