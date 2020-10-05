import { randomNumber } from '../../support/utils';

describe('Add new vessel', () => {
  let VESSEL;

  before(() => {
    cy.fixture('vessel.json').then((vessel) => {
      vessel.regNumber = randomNumber();
      vessel.name = `${vessel.name}${randomNumber()}`;
      VESSEL = vessel;
    });
  });

  afterEach(() => {
    cy.navigation('Signout');
    cy.url().should('include', '/sign-in');
  });

  beforeEach(() => {
    cy.fixture('users.json').then((users) => {
      cy.login(users.user1.email, users.user1.password);
    });
    cy.navigation('Vessels');
    cy.url().should('include', '/vessels');
    cy.get('.govuk-button--start').should('have.text', 'Save a vessel').click();
  });

  it('Should create a new Vessel', () => {
    const expectedVessel = [
      {
        'Vessel name': VESSEL.name,
        'Vessel type': VESSEL.type,
        'Usual moorings': VESSEL.moorings,
      },
    ];
    cy.enterVesselInfo(VESSEL);
    cy.get('.govuk-button').click();
    cy.get('table').getTable().then((vesselData) => {
      expect(vesselData).to.not.be.empty;
      cy.log(vesselData);
      expectedVessel.forEach((item) => expect(vesselData).to.deep.include(item));
    });
  });

  it('Should not create vessel without submitting required data', () => {
    let errors = ['You must enter a vessel name', 'You must enter a vessel type', 'You must enter the vessel usual mooring',
      'You must enter the vessel registration'];

    cy.get('.govuk-button').click();

    cy.get('.govuk-error-message').each((error, index) => {
      cy.wrap(error).should('contain.text', errors[index]).and('be.visible');
    });
  });

  it('Should not allow creating a duplicate vessel', () => {
    cy.enterVesselInfo(VESSEL);
    cy.get('.govuk-button').click();
    cy.get('.govuk-error-message').should('contain.text', 'This vessel already exists').and('be.visible');
  });

  it('Should not create a vessel when Clicking on "Exit without saving" button', () => {
    cy.enterVesselInfo(VESSEL);
    cy.get('[name="vesselName"]').clear().type('Titanic');
    cy.get('[name="registration"]').clear().type('9999999');
    cy.get('.govuk-link--no-visited-state').click();
    cy.get('table').getTable().then((vesselData) => {
      cy.log(vesselData);
      expect(vesselData).to.not.include('Titanic');
    });
  });
});