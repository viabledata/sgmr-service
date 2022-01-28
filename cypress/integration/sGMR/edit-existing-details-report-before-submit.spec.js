const { getFutureDate } = require('../../support/utils');

describe('Edit Details & Submit new voyage report', () => {
  let departureDateTime;
  let departurePort;
  let arrivalDateTime;
  let arrivalPort;
  let vessel;
  let person;
  let departDate;
  let numberOfSubmittedReports;

  before(() => {
    cy.registerUser();
    if (Cypress.env('envname') === 'local') {
      const query = `sh cypress/scripts/delete-reports.sh ${Cypress.env('dbName')}`;
      cy.exec(query);
    }
  });

  beforeEach(() => {
    cy.login();

    departurePort = 'Dover';
    arrivalPort = 'Felixstowe';
    departureDateTime = getFutureDate(1, 'DD/MM/YYYY HH:MM');
    departDate = departureDateTime.split(' ')[0];
    arrivalDateTime = getFutureDate(2, 'DD/MM/YYYY HH:MM');

    cy.navigation('Reports');
    cy.url().should('include', '/reports');
    cy.getNumberOfReports('Submitted').then((res) => {
      numberOfSubmittedReports = res;
    });
    cy.get('.govuk-button--start').should('have.text', 'Start now').click();
    cy.enterDepartureDetails(departureDateTime, departurePort);
    cy.saveAndContinue();
    cy.enterArrivalDetails(arrivalDateTime, arrivalPort);
    cy.saveAndContinue();
    cy.checkNoErrors();
    cy.getVesselObj().then((vesselObj) => {
      vessel = vesselObj;
      cy.enterVesselInfo(vessel);
    });
    cy.saveAndContinue();
    cy.checkNoErrors();
    cy.contains('add a new person').click();
    cy.getPersonObj().then((peopleObj) => {
      person = peopleObj;
      cy.enterPeopleInfo(person);
      cy.contains('Add to manifest').click();
      cy.saveAndContinueOnPeopleManifest(false);
    });
    cy.checkNoErrors();
    cy.enterSkipperDetails();
    cy.saveAndContinue();
    cy.checkNoErrors();
  });

  it('Should be able to edit Departure and Arrival details before submit the report', () => {
    departureDateTime = getFutureDate(2, 'DD/MM/YYYY HH:MM');
    departurePort = 'London';
    departDate = departureDateTime.split(' ')[0];
    arrivalDateTime = getFutureDate(2, 'DD/MM/YYYY HH:MM');
    arrivalPort = 'Swansea';
    const expectedReport = [
      {
        'Vessel': vessel.name,
        'Departure date': departDate,
        'Departure port': 'LGP',
        'Arrival port': 'Swansea Marina',
      },
    ];
    cy.get('a[href="/save-voyage/page-1"]').click();
    cy.enterDepartureDetails(departureDateTime, departurePort);
    cy.saveAndContinue();
    cy.checkNoErrors();
    cy.enterArrivalDetails(arrivalDateTime, arrivalPort);
    cy.saveAndContinue();
    cy.checkNoErrors();
    cy.url().should('include', 'page-3');
    cy.saveAndContinue();
    cy.checkNoErrors();
    cy.url().should('include', 'page-4');
    cy.saveAndContinue();
    cy.checkNoErrors();
    cy.url().should('include', 'page-5');
    cy.saveAndContinueOnPeopleManifest(false);
    cy.checkNoErrors();
    cy.url().should('include', 'page-6');
    cy.saveAndContinue();
    cy.checkNoErrors();
    cy.contains('Accept and submit report').click();
    cy.url().should('include', '/save-voyage/page-submitted');
    cy.get('.govuk-panel__title').should('have.text', 'Pleasure Craft Report Submitted');
    cy.navigation('Reports');
    cy.checkReports('Submitted', (+numberOfSubmittedReports) + (+1));
    cy.contains('View existing reports').click();
    cy.get('.govuk-tabs__list li')
      .within(() => {
        cy.get('#submitted').should('have.text', 'Submitted')
          .click();
        cy.wait(2000);
      });
    cy.contains('h2', 'Submitted').next().getTable().should((reportData) => {
      expectedReport.forEach((item) => expect(reportData).to.deep.include(item));
    });
  });

  it('Should be able to edit Pleasure Craft and Person details before submit the report', () => {
    cy.getVesselObj().then((vesselObj) => {
      vessel = vesselObj;
    });
    const expectedReport = [
      {
        'Vessel': vessel.name,
        'Departure date': departDate,
        'Departure port': 'DVR',
        'Arrival port': 'FXT',
      },
    ];
    cy.get('a[href="/save-voyage/page-3"]').click();
    cy.enterVesselInfo(vessel);
    cy.saveAndContinue();
    cy.checkNoErrors();
    cy.url().should('include', 'page-4');
    cy.saveAndContinue();
    cy.checkNoErrors();
    cy.url().should('include', 'page-5');
    cy.saveAndContinueOnPeopleManifest();
    cy.checkNoErrors();
    cy.url().should('include', 'page-6');
    cy.saveAndContinue();
    cy.checkNoErrors();
    cy.contains('Accept and submit report').click();
    cy.url().should('include', '/save-voyage/page-submitted');
    cy.get('.govuk-panel__title').should('have.text', 'Pleasure Craft Report Submitted');
    cy.navigation('Reports');
    cy.checkReports('Submitted', (+numberOfSubmittedReports) + (+1));
    cy.contains('View existing reports').click();
    cy.get('.govuk-tabs__list li')
      .within(() => {
        cy.get('#submitted').should('have.text', 'Submitted')
          .click();
        cy.wait(2000);
      });
    cy.contains('h2', 'Submitted').next().getTable().should((reportData) => {
      expectedReport.forEach((item) => expect(reportData).to.deep.include(item));
    });

    cy.contains('a', vessel.name).click();

    cy.get('a[href="/save-voyage/page-3"]').click();

    cy.get('[name="vesselType"]').should('have.value', vessel.type);
    cy.get('[name="moorings"]').should('have.value', vessel.moorings);
    cy.get('[name="registration"]').should('have.value', vessel.regNumber);
  });

  afterEach(() => {
    cy.deleteReports();
    localStorage.removeItem('token');
  });

  after(() => {
    cy.deleteAllEmails();
  });
});
