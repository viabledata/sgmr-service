describe('Sign-in flow', () => {
  before(() => {
    cy.task('readFileMaybe', 'cypress/fixtures/users.json').then((dataOrNull) => {
      if (dataOrNull === null) {
        cy.registerUser();
      }
    });
  });

  it('Should Sign-in Successfully', () => {
    cy.fixture('users.json').then((user) => {
      cy.login(user.email, user.password);
    });
    cy.get('.govuk-heading-xl').should('have.text', 'Submit an Advanced Voyage Report');
    cy.navigation('Signout');
    cy.url().should('include', '/sign-in');
  });

  it('Should not be Signed-in with invalid password', () => {
    cy.fixture('users.json').then((user) => {
      cy.get('#email input').clear().type(user.email);
      cy.get('#password input').clear().type('wrongpassword');
      cy.get('.govuk-button').click();
    });
    cy.get('.govuk-error-summary__list')
      .should('be.visible')
      .contains('Email and password combination is invalid');
  });

  it('Should not be Signed-in with invalid email', () => {
    cy.fixture('users.json').then((user) => {
      cy.get('#email input').clear().type('randomemail@mail.com');
      cy.get('#password input').clear().type(user.password);
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
    cy.get('#email input').clear();
    cy.get('#password input').clear();
    cy.get('.govuk-button').click();

    cy.get('.govuk-error-summary__list').each((error, index) => {
      cy.wrap(error).should('contain.text', errors[index]).and('be.visible');
    });
  });
});
