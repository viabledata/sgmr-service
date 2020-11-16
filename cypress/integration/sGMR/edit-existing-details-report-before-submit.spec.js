const { getFutureDate } = require('../../support/utils');

describe('Edit Details & Submit new voyage report', () => {
  let departureDateTime;
  let departurePort;
  let arrivalDateTime;
  let arrivalPort;
  let vessel;
  let people;
  let departDate;
  let departTime;

  before(() => {
    cy.registerUser();
    if (Cypress.env('envname') === 'local') {
      const query = `sh cypress/scripts/delete-reports.sh ${Cypress.env('dbName')}`;
      cy.exec(query);
    }
  });

  beforeEach(() => {
    cy.login();

    departurePort = 'Port of Hong Kong';
    arrivalPort = 'Port of Felixstowe';
    departureDateTime = getFutureDate(1, 'DD/MM/YYYY HH:MM');
    departDate = departureDateTime.split(' ')[0];
    departTime = departureDateTime.split(' ')[1];
    arrivalDateTime = getFutureDate(2, 'DD/MM/YYYY HH:MM');

    cy.navigation('Reports');
    cy.url().should('include', '/reports');
    cy.checkReports('Draft', 0);
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
    cy.contains('Add a new person to the Reports').click();
    cy.getPersonObj().then((personObj) => {
      people = personObj;
      cy.enterPeopleInfo(people);
    });
    cy.get('.govuk-button').contains('Add to manifest').click();
    cy.saveAndContinue();
    cy.checkNoErrors();
    cy.enterSkipperDetails();
    cy.saveAndContinue();
    cy.checkNoErrors();
  });

  it('Should be able to edit Departure and Arrival details before submit the report', () => {
    departureDateTime = getFutureDate(2, 'DD/MM/YYYY HH:MM');
    departurePort = 'London';
    departDate = departureDateTime.split(' ')[0];
    departTime = departureDateTime.split(' ')[1];
    arrivalDateTime = getFutureDate(2, 'DD/MM/YYYY HH:MM');
    arrivalPort = 'Swansea';
    const expectedReport = [
      {
        'Vessel': vessel.name,
        'Departure date': departDate,
        'Departure time': `${departTime}:00`,
        'Departure port': departurePort,
        'Arrival port': arrivalPort,
        'Submission reference': '',
      },
    ];
    cy.get('a[href="page-1"]').click();
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
    cy.saveAndContinue();
    cy.checkNoErrors();
    cy.contains('Accept and submit report').click();
    cy.url().should('include', '/save-voyage/page-submitted');
    cy.get('.govuk-panel__title').should('have.text', 'Pleasure Craft Report Submitted');
    cy.navigation('Reports');
    cy.checkReports('Submitted', 1);
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

  it('Should be able to edit Vessel and Person details before submit the report', () => {
    cy.getVesselObj().then((vesselObj) => {
      vessel = vesselObj;
    });
    const expectedReport = [
      {
        'Vessel': vessel.name,
        'Departure date': departDate,
        'Departure time': `${departTime}:00`,
        'Departure port': departurePort,
        'Arrival port': arrivalPort,
        'Submission reference': '',
      },
    ];
    cy.get('a[href="page-3"]').click();
    cy.enterVesselInfo(vessel);
    cy.saveAndContinue();
    cy.checkNoErrors();
    cy.url().should('include', 'page-4');
    cy.saveAndContinue();
    cy.checkNoErrors();
    cy.url().should('include', 'page-5');
    cy.saveAndContinue();
    cy.checkNoErrors();
    cy.contains('Accept and submit report').click();
    cy.url().should('include', '/save-voyage/page-submitted');
    cy.get('.govuk-panel__title').should('have.text', 'Pleasure Craft Report Submitted');
    cy.navigation('Reports');
    cy.checkReports('Submitted', 1);
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

    cy.get('a[href="page-3"]').click();

    cy.get('[name="vesselType"]').should('have.value', vessel.type);
    cy.get('[name="moorings"]').should('have.value', vessel.moorings);
    cy.get('[name="registration"]').should('have.value', vessel.regNumber);
  });

  afterEach(() => {
    if (Cypress.env('envname') === 'local') {
      const query = `sh cypress/scripts/delete-reports.sh ${Cypress.env('dbName')}`;
      cy.exec(query);
    }
  });
});
