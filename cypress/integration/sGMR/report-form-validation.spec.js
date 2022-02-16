const { getFutureDate } = require('../../support/utils');

describe('Validate voyage plan form', () => {
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

    cy.navigation('Pleasure Crafts');

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
    cy.navigation('Voyage Plans');
    cy.url().should('include', '/voyage-plans');
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

  it('Should verify Pleasure Craft details mandatory data', () => {
    const errors = [
      'You must enter a pleasure craft name',
      'You must enter a pleasure craft type',
      'You must enter the pleasure craft usual mooring',
      'You must enter the pleasure craft registration',
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
    cy.get('.govuk-button').contains('Add to voyage plan').click();
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
    cy.checkNoErrors();
    cy.contains('add a new person').click();
    cy.enterPeopleInfo(people);
    cy.contains('Add to voyage plan').click();
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
    sessionStorage.removeItem('token');
  });

  after(() => {
    cy.deleteAllEmails();
  });
});
