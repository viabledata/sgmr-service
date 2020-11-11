const { getFutureDate } = require('../../support/utils');

describe('Validate report form', () => {
  let departureDateTime;
  let departurePort;
  let arrivalDateTime;
  let arrivalPort;
  let vessel;
  let people;

  before(() => {
    cy.registerUser();

    cy.login();

    cy.getPersonObj().then((personObj) => {
      people = personObj;
      cy.addPeople(people);
    });

    cy.getVesselObj().then((vesselObj) => {
      vessel = vesselObj;
      cy.addVessel(vessel);
    });

    departurePort = 'Auto-Port of Hong Kong';
    arrivalPort = 'Port of Felixstowe';
    departureDateTime = getFutureDate(1, 'DD/MM/YYYY HH:MM');
    arrivalDateTime = getFutureDate(2, 'DD/MM/YYYY HH:MM');
  });

  beforeEach(() => {
    cy.login();
    cy.navigation('Notifications');
    cy.url().should('include', '/reports');
    cy.checkNotifications('Draft', 0);
    cy.get('.govuk-button--start').should('have.text', 'Start now').click();
  });

  it('Should verify Departure details mandatory data', () => {
    const errors = [
      'You must enter a departure date',
      'You must enter a departure time',
      'You must enter a departure point',
    ];
    cy.saveAndContinue();

    cy.get('.govuk-error-message').each((error, index) => {
      cy.wrap(error).should('contain.text', errors[index]).and('be.visible');
    });
  });

  it('Should verify Arraival details mandatory data', () => {
    const errors = [
      'You must enter an arrival date',
      'You must enter an arrival time',
      'You must enter an arrival point',
    ];
    cy.enterDepartureDetails(departureDateTime, departurePort);
    cy.saveAndContinue();
    cy.url().should('include', '/page-2');
    cy.saveAndContinue();
    cy.get('.govuk-error-message').each((error, index) => {
      cy.wrap(error).should('contain.text', errors[index]).and('be.visible');
    });
  });

  it('Should verify Vessel details mandatory data', () => {
    const errors = [
      'You must enter a vessel name',
      'You must enter a vessel type',
      'You must enter the vessel usual mooring',
      'You must enter the vessel registration',
    ];

    cy.enterDepartureDetails(departureDateTime, departurePort);
    cy.saveAndContinue();
    cy.enterArrivalDetails(arrivalDateTime, arrivalPort);
    cy.saveAndContinue();
    cy.url().should('include', '/page-3');
    cy.saveAndContinue();
    cy.get('.govuk-error-message').each((error, index) => {
      cy.wrap(error).should('contain.text', errors[index]).and('be.visible');
    });
  });

  it('Should verify People details mandatory data', () => {
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

    cy.enterDepartureDetails(departureDateTime, departurePort);
    cy.saveAndContinue();
    cy.enterArrivalDetails(arrivalDateTime, arrivalPort);
    cy.saveAndContinue();
    cy.enterVesselInfo(vessel);
    cy.saveAndContinue();
    cy.url().should('include', '/page-4');
    cy.contains('Add a new person to the Reports').click();
    cy.get('.govuk-button').contains('Add to manifest').click();
    cy.get('.govuk-error-message').each((error, index) => {
      cy.wrap(error).should('contain.text', errors[index]).and('be.visible');
    });
  });
  it('Should verify Skipper details mandatory data', () => {
    const errors = [
      'You must enter a first name',
      'You must enter a last name',
      'You must enter a contact number',
      'You must enter the first line of your address',
      'You must enter the second line of your address',
      'You must enter a town or a city name',
      'You must enter a country name',
      'You must enter a postcode',
    ];

    cy.enterDepartureDetails(departureDateTime, departurePort);
    cy.saveAndContinue();
    cy.enterArrivalDetails(arrivalDateTime, arrivalPort);
    cy.saveAndContinue();
    cy.enterVesselInfo(vessel);
    cy.saveAndContinue();
    cy.contains('Add a new person to the Reports').click();
    cy.enterPeopleInfo(people);
    cy.get('.govuk-button').contains('Add to manifest').click();
    cy.saveAndContinue();
    cy.url().should('include', '/page-5');
    cy.saveAndContinue();
    cy.get('.govuk-error-message').each((error, index) => {
      cy.wrap(error).should('contain.text', errors[index]).and('be.visible');
    });
  });

  afterEach(() => {
    if (Cypress.env('envname') === 'local') {
      const query = `sh cypress/scripts/delete-reports.sh ${Cypress.env('dbName')}`;
      cy.exec(query);
    }
  });
});
