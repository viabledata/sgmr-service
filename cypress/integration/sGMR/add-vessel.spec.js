const faker = require('faker');

describe('Add new vessel in account', () => {
  let vessel;

  before(() => {
    cy.fixture('vessel.json').then((vesselObj) => {
      vesselObj.regNumber = faker.random.number();
      vesselObj.name = `${vesselObj.name}${faker.random.number()}`;
      vessel = vesselObj;
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
    cy.navigation('Vessels');
    cy.url().should('include', '/vessels');
    cy.get('.govuk-button--start').should('have.text', 'Save a vessel').click();
  });

  it('Should add a new Vessel', () => {
    const expectedVessel = [
      {
        'Vessel name': vessel.name,
        'Vessel type': vessel.type,
        'Usual moorings': vessel.moorings,
      },
    ];
    cy.enterVesselInfo(vessel);
    cy.get('.govuk-button').click();
    cy.get('.govuk-error-message').should('not.be.visible');
    cy.url().should('include', '/vessels');
    cy.get('table').getTable().then((vesselData) => {
      expect(vesselData).to.not.be.empty;
      cy.log(vesselData);
      expectedVessel.forEach((item) => expect(vesselData).to.deep.include(item));
    });
  });

  it('Should not add a vessel without submitting required data', () => {
    const errors = [
      'You must enter a vessel name',
      'You must enter a vessel type',
      'You must enter the vessel usual mooring',
      'You must enter the vessel registration',
    ];

    cy.get('.govuk-button').click();

    cy.get('.govuk-error-message').each((error, index) => {
      cy.wrap(error).should('contain.text', errors[index]).and('be.visible');
    });
  });

  it('Should not allow adding a duplicate vessel', () => {
    cy.enterVesselInfo(vessel);
    cy.get('.govuk-button').click();
    cy.get('.govuk-error-message').should('contain.text', 'This vessel already exists').and('be.visible');
  });

  it('Should not add a vessel when Clicking on "Exit without saving" button', () => {
    cy.enterVesselInfo(vessel);
    cy.get('[name="vesselName"]').clear().type('Titanic');
    cy.get('[name="registration"]').clear().type('9999999');
    cy.get('.govuk-link--no-visited-state').click();
    cy.get('table').getTable().then((vesselData) => {
      cy.log(vesselData);
      expect(vesselData).to.not.include('Titanic');
    });
  });

  afterEach(() => {
    cy.navigation('Signout');
    cy.url().should('include', '/sign-in');
  });
});
