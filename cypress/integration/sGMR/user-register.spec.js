const faker = require('faker');

describe('User Registration', () => {
  let user;
  let host;
  let apiServer;

  before(() => {
    cy.task('newUser').then((object) => {
      user = object;
    });
    host = Cypress.env('host');
    apiServer = Cypress.env('api_server');
  });

  it('Should register user Successfully', () => {
    cy.server();
    cy.route('POST', `${apiServer}/registration`).as('registration');

    cy.visit(`${host}/register`);

    cy.enterUserInfo(user);

    cy.get('.govuk-button').click();
    cy.url().should('include', '/verify?source=registration');

    cy.wait('@registration').should((xhr) => {
      expect(xhr.status).to.eq(200);
      let authCode = xhr.responseBody.twoFactorToken;
      cy.get('input[name="twoFactorToken"]').type(authCode);
      cy.get('.govuk-button').click();
      cy.url().should('include', '/sign-in?source=registration');
    });
  });

  it('Should not register user without submitting required data', () => {
    const errors = [
      'You must enter your first name',
      'You must enter your last name',
      'You must enter a valid phone number',
      'You must enter a valid email address',
      'You must enter a password',
    ];

    cy.visit(`${host}/register`);
    cy.get('.govuk-button').click();

    cy.get('.govuk-error-message').each((error, index) => {
      cy.wrap(error).should('contain.text', errors[index]);
    });
    cy.url().should('not.include', '/sign-in?source=registration');
  });

  it('Should not regiister user with exiting user information', () => {
    cy.server();
    cy.route('POST', `${apiServer}/registration`);

    cy.visit(`${host}/register`);

    cy.enterUserInfo(user);

    cy.get('.govuk-button').click();
    cy.get('.govuk-error-message').should('contain.text', 'User already registered');
  });

  it('Should not register when Entering Invalid Authentication code', () => {
    const mail = faker.internet.exampleEmail();
    cy.server();
    cy.route('POST', `${apiServer}/registration`);

    cy.visit(`${host}/register`);

    cy.enterUserInfo(user);
    cy.get('input[name="email"]').clear().type(mail);
    cy.get('input[name="confirmEmail"]').clear().type(mail);

    cy.get('.govuk-button').click();
    cy.get('input[name="twoFactorToken"]').type('1234');
    cy.get('.govuk-button').click();
    cy.get('.govuk-error-message').should('contain.text', 'Code is invalid');
    cy.url().should('not.include', '/sign-in?source=registration');
  });

  it('Should register User By requesting new Authentication code', () => {
    const mail = faker.internet.exampleEmail();
    user.email = mail;

    cy.server();
    cy.route('POST', `${apiServer}/registration`).as('registration');
    cy.visit(`${host}/register`);

    cy.enterUserInfo(user);
    cy.get('input[name="email"]').clear().type(mail);
    cy.get('input[name="confirmEmail"]').clear().type(mail);
    cy.get('.govuk-button').click();

    cy.contains('Problems receiving this code?').click();
    cy.get('input[name="email"]').clear().type(mail);
    cy.get('input[name="mobileNumber"]').clear().type(user.mobileNumber);
    cy.get('.govuk-button').click();

    cy.wait('@registration').should((xhr) => {
      expect(xhr.status).to.eq(200);
      const authCode = xhr.responseBody.twoFactorToken;
      cy.get('input[name="twoFactorToken"]').type(authCode);
      cy.get('.govuk-button').click();
      cy.url().should('include', '/sign-in?source=registration');
    });
  });
});