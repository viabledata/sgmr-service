describe('Add new vessel in account', () => {
  let vessel;

  before(() => {
    cy.registerUser();

    cy.getVesselObj().then((vesselObj) => {
      vessel = vesselObj;
    });
  });

  beforeEach(() => {
    cy.login();
    cy.injectAxe();
    cy.navigation('Vessels');
  });

  it('Should add a new Vessel', () => {
    cy.checkAccessibility();
    cy.addVessel(vessel);
    cy.checkAccessibility();
  });

  it('Should not add a vessel without submitting required data', () => {
    const errors = [
      'You must enter a vessel name',
      'You must enter a vessel type',
      'You must enter the vessel usual mooring',
      'You must enter the vessel registration',
    ];

    cy.contains('a', 'Save a vessel').should('have.text', 'Save a vessel').click();

    cy.get('.govuk-button').click();

    cy.get('.govuk-error-message').each((error, index) => {
      cy.wrap(error).should('contain.text', errors[index]).and('be.visible');
    });
  });

  it('Should not allow adding a duplicate vessel', () => {
    cy.contains('a', 'Save a vessel').should('have.text', 'Save a vessel').click();
    cy.enterVesselInfo(vessel);
    cy.get('.govuk-button').click();
    cy.get('.govuk-error-message').should('contain.text', 'This vessel already exists').and('be.visible');
  });

  it('Should not add a vessel when Clicking on "Exit without saving" button', () => {
    cy.contains('a', 'Save a vessel').should('have.text', 'Save a vessel').click();
    cy.enterVesselInfo(vessel);
    cy.get('[name="vesselName"]').clear().type('Titanic');
    cy.get('[name="registration"]').clear().type('9999999');
    cy.get('.govuk-link--no-visited-state').click();
    cy.get('table').getTable().then((vesselData) => {
      cy.log(vesselData);
      expect(vesselData).to.not.include('Titanic');
    });
  });

  after(() => {
    cy.navigation('Signout');
    cy.url().should('include', '/sign-in');
    cy.deleteAllEmails();
  });

  afterEach(() => {
    localStorage.removeItem('token');
  });
});
