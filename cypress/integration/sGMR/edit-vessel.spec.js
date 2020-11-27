describe('Edit existing vessel information', () => {
  let vessel;

  before(() => {
    cy.registerUser();
    cy.login();

    cy.getVesselObj().then((vesselObj) => {
      vessel = vesselObj;
      cy.addVessel(vessel);
    });
  });

  beforeEach(() => {
    cy.login();
    cy.navigation('Vessels');
    cy.url().should('include', '/vessels');
  });

  it('Should be able to edit existing vessel information and save', () => {
    cy.get('.govuk-table td a').contains(vessel.name).click();
    vessel.name = 'Auto-test-edit-1234';
    vessel.type = 'Sailboat';
    vessel.moorings = 'US';
    cy.get('[name="vesselName"]').click().clear().type(vessel.name);
    cy.get('[name="vesselType"]').clear().type(vessel.type);
    cy.get('[name="moorings"]').clear().type(vessel.moorings);
    cy.get('.govuk-button').click();
    cy.get('.govuk-error-message').should('not.be.visible');

    cy.get('table').getTable().then((vesselData) => {
      expect(vesselData).to.not.be.empty;
      expect(vesselData).to.deep.include({
        'Vessel name': vessel.name,
        'Vessel type': vessel.type,
        'Usual moorings': vessel.moorings,
      });
    });
  });

  it('Should be able to edit existing vessel information and NOT save', () => {
    cy.get('.govuk-table td a').contains(vessel.name).click();
    cy.get('[name="vesselName"]').click().clear().type('Auto-test-edit-5555');
    cy.get('[name="vesselType"]').clear().type('Sailboat');
    cy.get('[name="moorings"]').clear().type('FR');
    cy.get('.govuk-link--no-visited-state').click();
    cy.get('.govuk-error-message').should('not.be.visible');

    cy.get('table').getTable().then((vesselData) => {
      expect(vesselData).to.not.be.empty;
      expect(vesselData).to.deep.include({
        'Vessel name': vessel.name,
        'Vessel type': vessel.type,
        'Usual moorings': vessel.moorings,
      });
    });
  });
});
