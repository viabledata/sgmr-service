describe('Add new pleasure craft in account', () => {
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
    cy.navigation('Pleasure Crafts');
  });

  it('Should add a new Pleasure Craft', () => {
    cy.checkAccessibility();
    cy.addVessel(vessel);
    cy.checkAccessibility();
  });

  it('Should not add a pleasure craft without submitting required data', () => {
    const errors = [
      'You must enter a pleasure craft name',
      'You must enter a pleasure craft type',
      'You must enter the pleasure craft usual mooring',
      'You must enter the pleasure craft registration',
    ];

    cy.contains('a', 'Save a pleasure craft').should('have.text', 'Save a pleasure craft').click();

    cy.get('.govuk-button').click();

    cy.get('.govuk-error-message').each((error, index) => {
      cy.wrap(error).should('contain.text', errors[index]).and('be.visible');
    });
  });

  it('Should not allow adding a duplicate pleasure craft', () => {
    cy.contains('a', 'Save a pleasure craft').should('have.text', 'Save a pleasure craft').click();
    cy.enterVesselInfo(vessel);
    cy.get('.govuk-button').click();
    cy.get('.govuk-error-summary').should('contain.text', 'This pleasure craft already exists').and('be.visible');
  });

  it('Should not add a pleasure craft when Clicking on "Exit without saving" button', () => {
    cy.contains('a', 'Save a pleasure craft').should('have.text', 'Save a pleasure craft').click();
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
    let token =  sessionStorage.getItem('token');
    let apiServer = Cypress.env('api_server');
    let vesselIds = cy.request({
      url: `${apiServer}/user/vessels?per_page=100`,
      method: 'GET',
      auth: {
        'bearer': token
      }
    }).then((response) => {
        response.body.items.forEach((vessel) => {
        cy.request({
          url: `${apiServer}/user/vessels/${vessel.id}`,
          method: 'DELETE',
          auth: {
            'bearer': token
          }
        });
      });
    });

    sessionStorage.removeItem('token');
  });
});
