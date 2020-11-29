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
    cy.navigation('People');

    cy.getPersonObj().then((personObj) => {
      people = personObj;
      cy.addPeople(people);
    });

    cy.navigation('Vessels');

    cy.getVesselObj().then((vesselObj) => {
      vessel = vesselObj;
      cy.addVessel(vessel);
    });

    departurePort = 'Dover';
    arrivalPort = 'Felixstowe';
    departureDateTime = getFutureDate(1, 'DD/MM/YYYY HH:MM');
    arrivalDateTime = getFutureDate(2, 'DD/MM/YYYY HH:MM');
  });

  beforeEach(() => {
    cy.login();
    cy.navigation('Reports');
    cy.url().should('include', '/reports');
    cy.checkReports('Draft', 0);
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
    cy.contains('add a new person').click();
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
    cy.get('input[name=people]').eq(0).check();
    cy.contains('Add to report and continue').click();
    cy.assertPeopleTable((reportData) => {
      expect(reportData).to.have.length(1);
    });
    cy.saveAndContinueOnPeopleManifest(true);
    cy.contains('add a new person').click();
    cy.enterPeopleInfo(people);
    cy.get('.govuk-button').contains('Add to manifest').click();
    cy.saveAndContinueOnPeopleManifest(false);
    cy.checkNoErrors();
    cy.saveAndContinue();
    cy.url().should('include', '/page-6');
    cy.saveAndContinue();
    cy.get('.govuk-error-message').each((error, index) => {
      cy.wrap(error).should('contain.text', errors[index]).and('be.visible');
    });
  });

  afterEach(() => {
    cy.deleteReports();
  });
});
