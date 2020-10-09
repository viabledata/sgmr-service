const faker = require('faker');

describe('Add new vessel in account', () => {
  let vessel;

  before(() => {
    cy.fixture('vessel.json').then((vesselData) => {
      vesselData.regNumber = faker.random.number();
      vesselData.name = `${vesselData.name}${faker.random.number()}`;
      vessel = vesselData;
    });
  });

  beforeEach(() => {
    cy.fixture('users.json').then((users) => {
      cy.login(users.user1.email, users.user1.password);
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
    const ERRORS = [
      'You must enter a vessel name',
      'You must enter a vessel type',
      'You must enter the vessel usual mooring',
      'You must enter the vessel registration',
    ];

    cy.get('.govuk-button').click();

    cy.get('.govuk-error-message').each((error, index) => {
      cy.wrap(error).should('contain.text', ERRORS[index]).and('be.visible');
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
