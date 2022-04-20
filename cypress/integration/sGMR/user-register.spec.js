describe('User Registration', () => {
  let user;
  let apiServer;
  const externalURLs = [
    'Travel abroad',
    'Send Advance Passenger Information',
    'Notice 8: sailing your pleasure craft to and from the UK',
  ];

  before(() => {
    cy.task('newUser').then((object) => {
      user = object;
    });
    apiServer = Cypress.env('api_server');
  });

  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe();
    cy.checkAccessibility();
    cy.get('.govuk-heading-l').should('have.text', 'Tell Border Force and HMRC you are sailing to or from the UK in a pleasure craft');
    cy.get('.govuk-list .govuk-link').each((link, index) => {
      cy.wrap(link).should('contain.text', externalURLs[index]);
    });
    cy.get('.govuk-button--start').click();
    cy.get('a[href="/register"]').click();
  });

  it('Should register user Successfully', () => {
    cy.server();
    cy.route('POST', `${apiServer}/registration`).as('registration');

    cy.enterUserInfo(user);
    cy.checkAccessibility();

    cy.get('.govuk-button').click();
    cy.checkAccessibility();

    cy.wait('@registration').should((xhr) => {
      expect(xhr.status).to.eq(200);
      cy.url().should('include', `email=${user.email}`);
      cy.get('.govuk-panel--confirmation .govuk-panel__title').should('have.text', 'Account successfully created');
      cy.checkAccessibility();
    });
  });

  it('Should not be logged in without user account activation', () => {
    cy.visit('/sign-in');
    const { email, password } = user;
    cy.get('input[name="email"]').clear().type(email);
    cy.get('input[name="password"]').clear().type(password);

    cy.server();
    cy.route('POST', `${Cypress.env('api_server')}/login`).as('login');

    cy.get('.govuk-button').click();

    cy.wait('@login').should((xhr) => {
      expect(xhr.status).to.eq(401);
    });
    cy.get('.govuk-error-summary__list')
      .should('be.visible')
      .contains('Email and password combination is invalid');
  });

  it('Should not register user without submitting required data', () => {
    const errors = [
      'You must enter your first name',
      'You must enter your last name',
      'You must enter a valid phone number',
      'You must enter a valid email address',
      'Enter your new password',
    ];

    cy.get('.govuk-button').click();

    cy.get('.govuk-error-message').each((error, index) => {
      cy.wrap(error).should('contain.text', errors[index]);
    });
    cy.url().should('not.include', '/sign-in?source=registration');
  });

  it('Should not register user with exiting user information', () => {
    cy.server();
    cy.route('POST', `${apiServer}/registration`);

    cy.enterUserInfo(user);

    cy.get('.govuk-button').click();
    cy.get('.govuk-error-message').should('contain.text', 'User already registered');
  });

  it('Should not register if password does not meet validation rules', () => {
    cy.enterUserInfo(user);
    cy.get('input[name="password"]').clear().type('test');
    cy.get('input[name="confirmPassword"]').clear().type('test');
    cy.get('.govuk-button').click();

    cy.get('.govuk-error-message').should('contain.text', 'Passwords must be at least 8 characters long');

    cy.get('input[name="password"]').clear().type('test1234');
    cy.get('input[name="confirmPassword"]').clear().type('test1234');
    cy.get('.govuk-button').click();

    cy.get('.govuk-error-message').should('contain.text', 'The password must contain 3 of the following: an uppercase letter, a lowercase letter, a symbol, a number');

    cy.get('input[name="password"]').clear().type('test1234');
    cy.get('input[name="confirmPassword"]').clear().type('test');
    cy.get('.govuk-button').click();
    cy.get('.govuk-error-message').should('contain.text','Passwords must match')
  });

  it('Should not register if mobile number is not valid', () => {
    cy.enterUserInfo(user);
    cy.get('input[name="mobileNumber"]').clear().type('+44 7O128 OO3331');
    cy.get('.govuk-button').click();

    cy.get('.govuk-error-message').should('contain.text', 'You must enter a valid phone number e.g. 07700 900982, +33 63998 010101');

    cy.get('input[name="mobileNumber"]').clear().type('+44 7O128 OO$?31');
    cy.get('.govuk-button').click();
  });
});
