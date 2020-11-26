const { getFutureDate } = require('../../support/utils');

describe('Add new voyage report', () => {
  let departureDateTime;
  let departurePort;
  let arrivalDateTime;
  let arrivalPort;
  let vessel;
  let person;
  let departDate;
  let departTime;

  before(() => {
    cy.registerUser();
  });

  beforeEach(() => {
    cy.login();
    cy.injectAxe();
    cy.getPersonObj().then((personObj) => {
      person = personObj;
    });

    cy.getVesselObj().then((vesselObj) => {
      vessel = vesselObj;
    });

    departurePort = 'Dover';
    arrivalPort = 'Felixstowe';
    departureDateTime = getFutureDate(1, 'DD/MM/YYYY HH:MM');
    departDate = departureDateTime.split(' ')[0];
    departTime = departureDateTime.split(' ')[1];
    arrivalDateTime = getFutureDate(2, 'DD/MM/YYYY HH:MM');

    cy.navigation('Reports');
    cy.url().should('include', '/reports');
    cy.checkReports('Draft', 0);
    cy.get('.govuk-button--start').should('have.text', 'Start now').click();
  });

  it('Should submit report successfully', () => {
    const expectedReport = [
      {
        'Vessel': vessel.name,
        'Departure date': departDate,
        'Departure time': `${departTime}:00`,
        'Departure port': 'DVR',
        'Arrival port': 'FXT',
        'Submission reference': '',
      },
    ];
    cy.checkAccessibility();
    cy.enterDepartureDetails(departureDateTime, departurePort);
    cy.saveAndContinue();
    cy.checkAccessibility();
    cy.enterArrivalDetails(arrivalDateTime, arrivalPort);
    cy.saveAndContinue();
    cy.checkNoErrors();
    cy.checkAccessibility();
    cy.enterVesselInfo(vessel);
    cy.saveAndContinue();
    cy.checkNoErrors();
    cy.checkAccessibility();
    cy.contains('add a new person').click();
    cy.enterPeopleInfo(person);
    cy.contains('Add to manifest').click();
    cy.assertPeopleTable((reportData) => {
      expect(reportData).to.have.length(1);
      expect(reportData[0]).to.deep.include({
        'Last name': person.lastName,
        'First name': person.firstName,
      });
    });
    cy.saveAndContinueOnPeopleManifest(true);
    cy.contains(`People already added to the manifest:${person.firstName} ${person.lastName}`);
    cy.saveAndContinue();
    cy.get('input[name=people]').eq(0).check();
    cy.contains('Remove person').click();
    cy.contains('There are no people on the manifest.');
    cy.saveAndContinueOnPeopleManifest(true);
    cy.contains('add a new person').click();
    cy.contains('Add to manifest').click();
    cy.assertPeopleTable((reportData) => {
      expect(reportData).to.have.length(1);
    });
    cy.saveAndContinueOnPeopleManifest(false);
    cy.checkNoErrors();
    cy.checkAccessibility();
    cy.enterSkipperDetails();
    cy.saveAndContinue();
    cy.checkNoErrors();
    cy.checkAccessibility();
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
    cy.checkAccessibility();
  });

  it('Should be able to cancel report', () => {
    const expectedReport = [
      {
        'Vessel': vessel.name,
        'Departure date': departDate,
        'Departure time': `${departTime}:00`,
        'Departure port': 'DVR',
        'Arrival port': 'FXT',
        'Submission reference': '',
      },
    ];
    cy.enterDepartureDetails(departureDateTime, departurePort);
    cy.saveAndContinue();
    cy.enterArrivalDetails(arrivalDateTime, arrivalPort);
    cy.saveAndContinue();
    cy.checkNoErrors();
    cy.enterVesselInfo(vessel);
    cy.saveAndContinue();
    cy.checkNoErrors();
    cy.contains('add a new person').click();
    cy.enterPeopleInfo(person);
    cy.contains('Add to manifest').click();
    cy.saveAndContinueOnPeopleManifest(false);
    cy.checkNoErrors();
    cy.enterSkipperDetails();
    cy.saveAndContinue();
    cy.checkNoErrors();
    cy.contains('Cancel voyage').click();
    cy.url().should('include', '/reports');
    cy.navigation('Reports');
    cy.checkReports('Cancelled', 1);
    cy.contains('View existing reports').click();
    cy.get('.govuk-tabs__list li')
      .within(() => {
        cy.get('#cancelled').should('have.text', 'Cancelled')
          .click();
        cy.wait(2000);
      });
    cy.contains('h2', 'Cancelled').next().getTable().should((reportData) => {
      expectedReport.forEach((item) => expect(reportData).to.deep.include(item));
    });
  });

  it('Should be able to save report for later', () => {
    const expectedReport = [
      {
        'Vessel': vessel.name,
        'Departure date': departDate,
        'Departure time': `${departTime}:00`,
        'Departure port': 'DVR',
        'Arrival port': 'FXT',
        'Submission reference': '',
      },
    ];
    cy.enterDepartureDetails(departureDateTime, departurePort);
    cy.saveAndContinue();
    cy.enterArrivalDetails(arrivalDateTime, arrivalPort);
    cy.saveAndContinue();
    cy.checkNoErrors();
    cy.enterVesselInfo(vessel);
    cy.saveAndContinue();
    cy.checkNoErrors();
    cy.contains('add a new person').click();
    cy.enterPeopleInfo(person);
    cy.contains('Add to manifest').click();
    cy.saveAndContinueOnPeopleManifest(false);
    cy.checkNoErrors();
    cy.enterSkipperDetails();
    cy.saveAndContinue();
    cy.checkNoErrors();
    cy.contains('Exit without saving').click();
    cy.url().should('include', '/reports');
    cy.navigation('Reports');
    cy.checkReports('Draft', 1);
    cy.contains('View existing reports').click();
    cy.get('.govuk-tabs__list li')
      .within(() => {
        cy.get('#draft').should('have.text', 'Draft')
          .click();
        cy.wait(2000);
      });
    cy.contains('h2', 'Draft').next().getTable().should((reportData) => {
      expectedReport.forEach((item) => expect(reportData).to.deep.include(item));
    });
  });

  after(() => {
    if (Cypress.env('envname') === 'local') {
      const query = `sh cypress/scripts/delete-reports.sh ${Cypress.env('dbName')}`;
      cy.exec(query);
    }
  });
});
