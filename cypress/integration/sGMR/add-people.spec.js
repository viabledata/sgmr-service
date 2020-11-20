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
    cy.get('.govuk-button--start').should('have.text', 'Save a person').click();
    cy.url().should('include', '/save-person?source=people');
  });

  it('Should add people successfully', () => {
    const expectedPeople = [
      {
        'Surname': people.lastName,
        'Given name': people.firstName,
        'Type': people.personType,
      },
    ];
    cy.checkAccessibility();
    cy.addPeople(people);
    cy.get('table').getTable().then((peopleData) => {
      expect(peopleData).to.not.be.empty;
      cy.log(peopleData);
      expectedPeople.forEach((item) => expect(peopleData).to.deep.include(item));
    });
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

    cy.get('.govuk-button').click();

    cy.get('.govuk-error-message').each((error, index) => {
      cy.wrap(error).should('contain.text', errors[index]).and('be.visible');
    });
  });

  it('Should not allow adding a duplicate person', () => {
    cy.enterPeopleInfo(people);
    cy.get('.govuk-button').click();
    cy.get('.govuk-error-message').should('contain.text', 'This person already exists').and('be.visible');
  });

  it('Should not add people when Clicking on "Exit without saving" button', () => {
    cy.enterPeopleInfo(people);
    cy.get('#firstName [type="text"]').clear().type('Auto-test-no-save');
    cy.get('input[name="documentNumber"]').clear().type('5555555');
    cy.get('.govuk-link--no-visited-state').click();
    cy.get('table').getTable().then((peopleData) => {
      cy.log(peopleData);
      expect(peopleData).to.not.include('Auto-test-no-save');
    });
  });

  after(() => {
    cy.navigation('Signout');
    cy.url().should('include', '/sign-in');
  });
});
