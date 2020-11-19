describe('Sign-in flow', () => {
  before(() => {
    cy.registerUser();
  });

  it('Should Sign-in Successfully', () => {
    cy.login();
    cy.injectAxe();
    cy.checkAccessibility();
    cy.fixture('user-registration.json').then((userDetails) => {
      cy.get('h3.govuk-heading-m').should('have.text', `Welcome back, ${userDetails.firstName}`);
    });

    cy.navigation('Signout');
    cy.url().should('include', '/sign-in');
  });

  it('Should not be Signed-in with invalid credentials', () => {
    cy.fixture('users.json').then((user) => {
      cy.get('input[name="email"]').clear().type(user.email);
      cy.get('input[name="password"]').clear().type('wrongpassword');
      cy.get('.govuk-button').click();
    });
    cy.get('.govuk-error-summary__list')
      .should('be.visible')
      .contains('Email and password combination is invalid');

    cy.fixture('users.json').then((user) => {
      cy.get('input[name="email"]').clear().type('randomemail@mail.com');
      cy.get('input[name="password"]').clear().type(user.password);
      cy.get('.govuk-button').click();
    });
    cy.get('.govuk-error-summary__list')
      .should('be.visible')
      .contains('Email and password combination is invalid');
  });

  it('Should not be Signed-in with Empty email and password', () => {
    const errors = [
      'Enter a valid email address',
      'You must enter your password',
      'You must enter an email address and password',
    ];
    cy.get('input[name="email"]').clear();
    cy.get('input[name="password"]').clear();
    cy.get('.govuk-button').click();

    cy.get('.govuk-error-summary__list').each((error, index) => {
      cy.wrap(error).should('contain.text', errors[index]).and('be.visible');
    });
  });

  it('Should not be Signed-in with invalid authentication code', () => {
    cy.fixture('users.json').then((user) => {
      cy.get('input[name="email"]').clear().type(user.email);
      cy.get('input[name="password"]').clear().type(user.password);
    });
    cy.get('.govuk-button').click();
    cy.get('input[name="twoFactorToken"]').clear().type('34567');
    cy.get('.govuk-button').click();
    cy.get('.govuk-error-message').should('contain.text', 'Code is invalid');
    cy.url().should('not.include', '/reports');
  });

  it('Should be Signed-in By requesting new authentication code', () => {
    cy.server();
    cy.route('POST', `${Cypress.env('api_server')}/login`).as('login');
    cy.visit('/sign-in');
    cy.injectAxe();
    cy.checkAccessibility();
    cy.fixture('users.json').then((user) => {
      cy.get('input[name="email"]').clear().type(user.email);
      cy.get('input[name="password"]').clear().type(user.password);
    });
    cy.get('.govuk-button').click();

    cy.contains('Problems receiving this code?').click();

    cy.fixture('user-registration.json').then((userDetails) => {
      cy.get('input[name="email"]').clear().type(userDetails.email);
      cy.get('input[name="mobileNumber"]').clear().type(userDetails.mobileNumber);
    });
    cy.get('.govuk-button').click();

    cy.wait('@login').should((xhr) => {
      expect(xhr.status).to.eq(200);
      const authCode = xhr.responseBody.twoFactorToken;
      cy.get('input[name="twoFactorToken"]').clear().type(authCode);
      cy.get('.govuk-button').click();
    });

    cy.url().should('include', '/reports');
    cy.get('.govuk-button--start').should('have.text', 'Start now');
  });
});
