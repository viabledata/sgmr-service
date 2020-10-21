const faker = require('faker');
const { getFutureDate, getPastDate } = require('../../support/utils');

describe('Add People in account', () => {
  let people;

  before(() => {
    cy.fixture('people.json').then((personObj) => {
      personObj.documentNumber = faker.random.number();
      personObj.firstName = `Auto-${faker.name.firstName()}`;
      personObj.lastName = faker.name.lastName();
      personObj.dateOfBirth = getPastDate(30, 'DD/MM/YYYY');
      personObj.expiryDate = getFutureDate(3, 'DD/MM/YYYY');
      people = personObj;
    });
    cy.task('readFileMaybe', 'cypress/fixtures/users.json').then((data) => {
      const user = JSON.parse(data);
      cy.checkUserExists(user.email).then((userExist) => {
        if (userExist === false) {
          cy.registerUser();
        }
      });
    });
  });

  beforeEach(() => {
    cy.fixture('users.json').then((user) => {
      cy.login(user.email, user.password);
    });
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
    cy.enterPeopleInfo(people);
    cy.get('.govuk-button').click();
    cy.get('.govuk-error-message').should('not.be.visible');
    cy.url().should('include', '/people');
    cy.get('table').getTable().then((peopleData) => {
      expect(peopleData).to.not.be.empty;
      cy.log(peopleData);
      expectedPeople.forEach((item) => expect(peopleData).to.deep.include(item));
    });
  });

  it('Should not add people without submitting required data', () => {
    const errors = [
      'You must enter a first name',
      'You must enter a last name',
      'You must select a gender',
      'You must enter a valid date of birth date',
      'You must enter a place of birth',
      'You must enter a nationality',
      'You must enter a person type',
      'You must select a document type',
      'You must enter a document number',
      'You must enter the document issuing state',
      'You must enter a valid date',
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

  afterEach(() => {
    cy.navigation('Signout');
    cy.url().should('include', '/sign-in');
  });
});
