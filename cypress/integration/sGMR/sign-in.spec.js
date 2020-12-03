describe('Sign-in flow', () => {
  before(() => {
    cy.registerUser();
  });

  it('Should Sign-in Successfully', () => {
    cy.visit('/');
    cy.get('.govuk-button--start').should('have.text', 'Start now');
    cy.get('.govuk-button--start').click();
    cy.fixture('users.json').then((user) => {
      const { email, password } = user;
      cy.get('input[name="email"]').clear().type(email);
      cy.get('input[name="password"]').clear().type(password);

      cy.server();
      cy.route('POST', `${Cypress.env('api_server')}/login`).as('login');

      cy.get('.govuk-button').click();

      cy.wait('@login').should((xhr) => {
        expect(xhr.status).to.eq(200);
      });
    });
    cy.url().should('include', '/reports');
    cy.get('.govuk-button--start').should('have.text', 'Start now');
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

  afterEach(() => {
    localStorage.removeItem('token');
  });
});
