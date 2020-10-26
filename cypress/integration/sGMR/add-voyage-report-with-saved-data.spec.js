const { getFutureDate } = require('../../support/utils');

describe('Add report with saved data', () => {
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
    cy.login();

    cy.getPersonObj().then((personObj) => {
      people = personObj;
      cy.addPeople(people);
    });

    cy.getVesselObj().then((vesselObj) => {
      vessel = vesselObj;
      cy.addVessel(vessel);
    });
  });

  beforeEach(() => {
    departurePort = 'Port of Hong Kong';
    arrivalPort = 'Port of Felixstowe';
    departureDateTime = getFutureDate(1, 'DD/MM/YYYY HH:MM');
    departDate = departureDateTime.split(' ')[0];
    departTime = departureDateTime.split(' ')[1];
    arrivalDateTime = getFutureDate(2, 'DD/MM/YYYY HH:MM');

    cy.login();
    cy.navigation('Reports');
    cy.url().should('include', '/reports');
    cy.get('.govuk-tabs__list li')
      .filter('.govuk-tabs__list-item--selected').find('p').should('contain', 'Draft');
    cy.get('.govuk-button--start').should('have.text', 'Start now').click();
    cy.url().should('include', '/save-voyage/page-1');
  });

  it('Should be able to Cancel a submitted report using Saved People & Vessel', () => {
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
    cy.enterDepartureDetails(departureDateTime, departurePort);
    cy.saveAndContinue();
    cy.enterArrivalDetails(arrivalDateTime, arrivalPort);
    cy.saveAndContinue();
    cy.checkNoErrors();
    cy.selectCheckbox(vessel.name);
    cy.contains('Add to report').click();
    cy.saveAndContinue();
    cy.checkNoErrors();
    cy.wait(1000);
    cy.selectCheckbox(people.lastName);
    cy.contains('Add to Reports').click();
    cy.get('#totalPersonsOnBoard').should('have.value', 1);
    cy.saveAndContinue();
    cy.checkNoErrors();
    cy.enterSkipperDetails();
    cy.saveAndContinue();
    cy.checkNoErrors();
    cy.contains('Accept and submit report').click();
    cy.url().should('include', '/save-voyage/page-submitted');
    cy.get('.govuk-panel__title').should('have.text', 'Advance Voyage Notification Submitted');
    cy.navigation('Reports');
    cy.get('.govuk-tabs__list li')
      .within(() => {
        cy.get('#submitted').should('have.text', 'Submitted')
          .click();
      });
    cy.contains('h2', 'Submitted').next().getTable().then((reportData) => {
      cy.wait(2000);
      expect(reportData).to.not.be.empty;
      expectedReport.forEach((item) => expect(reportData).to.deep.include(item));
      cy.get('.govuk-table td a').contains(vessel.name).click();
      cy.contains('Cancel voyage').click();
      cy.get('.govuk-tabs__list li')
        .within(() => {
          cy.get('#cancelled').should('have.text', 'Cancelled')
            .click();
        });
      expectedReport.forEach((item) => expect(reportData).to.deep.include(item));
    });
  });

  after(() => {
    cy.exec('sh cypress/scripts/delete-reports.sh');
  });
});
