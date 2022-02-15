describe('Add People in account', () => {
  let people;

  before(() => {
    cy.registerUser();
    cy.getPersonObj().then((personObj) => {
      people = personObj;
    });
  });

  beforeEach(() => {
    cy.login();
    cy.injectAxe();
    cy.navigation('People');
    cy.url().should('include', '/people');
  });

  it('Should add people successfully', () => {
    cy.checkAccessibility();
    cy.addPeople(people);
    cy.checkAccessibility();
  });

  it('Should not add people without submitting required data', () => {
    const errors = [
      'You must enter a first name',
      'You must enter a last name',
      'You must select a gender',
      'You must enter a date of birth',
      'You must enter a place of birth',
      'You must enter a nationality',
      'You must enter a person type',
      'You must select a document type',
      'You must enter a document number',
      'You must enter the document issuing state',
      'You must enter an expiry date',
    ];

    cy.contains('a', 'Save a person').should('have.text', 'Save a person').click();

    cy.get('.govuk-button').click();

    cy.get('.govuk-error-message').each((error, index) => {
      cy.wrap(error).should('contain.text', errors[index]).and('be.visible');
    });

    cy.get('input[name="documentIssuingState"]').clear().type('ZZZ');
    cy.get('.govuk-button').click();
    cy.get('.govuk-error-message').should('contain.text', 'You must enter a valid ISO country code').and('be.visible');
  });

  it('Should not allow adding a duplicate person', () => {
    cy.contains('a', 'Save a person').should('have.text', 'Save a person').click();
    cy.enterPeopleInfo(people);
    cy.get('.govuk-button').click();
    cy.get('.govuk-error-summary').should('contain.text', 'This document already exists').and('be.visible');
  });

  it('Should not add people when Clicking on Exit without saving button', () => {
    cy.contains('a', 'Save a person').should('have.text', 'Save a person').click();
    cy.enterPeopleInfo(people);
    cy.get('#firstName [type="text"]').clear().type('Auto-test-no-save');
    cy.get('input[name="documentNumber"]').clear().type('5555555');
    cy.get('.govuk-link--no-visited-state').click();
    cy.get('table').getTable().then((peopleData) => {
      cy.log(peopleData);
      expect(peopleData).not.to.include('Auto-test-no-save');
    });
  });

  after(() => {
    cy.removeTestData();
    cy.navigation('Signout');
    cy.url().should('include', '/sign-in');
    cy.deleteAllEmails();
  });

});
