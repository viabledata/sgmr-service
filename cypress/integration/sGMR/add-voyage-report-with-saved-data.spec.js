const { getFutureDate } = require('../../support/utils');

describe('Add voyage plan with saved data', () => {
  let departureDateTime;
  let departurePort;
  let departurePortCode;
  let arrivalDateTime;
  let arrivalPort;
  let arrivalPortCode;
  let vessel;
  let persons = [];
  let departDate;
  const numberOfPersons = 3;
  let numberOfSubmittedReports;

  before(() => {
    cy.registerUser();
    cy.login();
    cy.navigation('People');

    for (let i = 0; i < numberOfPersons; i += 1) {
      cy.getPersonObj().then((personObj) => {
        persons[i] = personObj;
        cy.addPeople(persons[i]);
      });
    }

    cy.navigation('Pleasure Crafts');
    cy.getVesselObj().then((vesselObj) => {
      vessel = vesselObj;
      cy.addVessel(vessel);
    });
  });

  beforeEach(() => {
    cy.login();
    cy.injectAxe();

    departurePort = 'Dover Marina';
    departurePortCode = 'ZZZD';
    arrivalPort = 'FelixstoweFerry';
    arrivalPortCode = 'ZZZA';
    departureDateTime = getFutureDate(1, 'DD/MM/YYYY HH:MM');
    departDate = departureDateTime.split(' ')[0];
    arrivalDateTime = getFutureDate(2, 'DD/MM/YYYY HH:MM');

    cy.url().should('include', '/voyage-plans');
    cy.getNumberOfReports('Submitted').then((res) => {
      numberOfSubmittedReports = res;
    });
    cy.checkAccessibility();
    cy.get('.govuk-button--start').should('have.text', 'Start now').click();
    cy.url().should('include', '/voyage-plans/start');
    cy.get('button[title="saveButton"]').should('have.text','Continue').click();
  });

  it('Should be able to Cancel a submitted voyage plan using Saved People & Pleasure Craft', () => {
    cy.enterDepartureDetails(departureDateTime, departurePort);
    cy.saveAndContinue();
    cy.enterArrivalDetails(arrivalDateTime, arrivalPort);
    cy.saveAndContinue();
    cy.checkNoErrors();
    cy.selectCheckbox(vessel.name);
    cy.contains('Add to voyage plan').click();
    cy.saveAndContinue();
    cy.checkNoErrors();
    cy.wait(1000);
    cy.selectCheckbox(persons[0].lastName);
    cy.contains('Add to voyage plan and continue').click();
    cy.assertPeopleTable((reportData) => {
      expect(reportData).to.have.length(1);
    });
    cy.saveAndContinueOnPeopleManifest(false);
    cy.checkNoErrors();
    cy.enterSkipperDetails();
    cy.saveAndContinue();
    cy.get('.govuk-error-message').should('not.be.visible');
    cy.contains('Accept and submit voyage plan').click();
    cy.wait(2000);
    cy.url().should('include', '/save-voyage/page-submitted');
    cy.get('.govuk-panel__title').should('have.text', 'Pleasure Craft Voyage Plan Submitted');
    cy.navigation('Voyage Plans');
    cy.checkReports('Submitted', (+numberOfSubmittedReports) + (+1));
    cy.contains('View existing voyage plans').click();
    cy.get('.govuk-tabs__list li')
      .within(() => {
        cy.get('#submitted').should('have.text', 'Submitted')
          .click();
      });
    cy.contains('h2', 'Submitted').next().getTable().then((reportData) => {
      cy.wait(2000);
      expect(reportData).to.not.be.empty;
      expect(reportData).to.deep.include({
        'Pleasure craft': `Pleasure craft${vessel.name}`,
        'Departure date': `Departure date${departDate}`,
        'Departure port': `Departure port${departurePortCode}`,
        'Arrival port': `Arrival port${arrivalPortCode}`
      });
      cy.get('.govuk-table td a').contains(vessel.name).click();
      cy.contains('Cancel voyage').click();
      cy.get('#confirm-yes').check();
      cy.contains('Continue').click();
      cy.contains('View existing voyage plans').click();
      cy.get('.govuk-tabs__list li')
        .within(() => {
          cy.get('#cancelled').should('have.text', 'Cancelled')
            .click();
          cy.wait(1000);
        });
      expect(reportData).to.deep.include({
        'Pleasure craft': `Pleasure craft${vessel.name}`,
        'Departure date': `Departure date${departDate}`,
        'Departure port': `Departure port${departurePortCode}`,
        'Arrival port': `Arrival port${arrivalPortCode}`
      });
    });
  });

  it('Should be able to submit a voyage plan with more than one passenger', () => {
    cy.enterDepartureDetails(departureDateTime, departurePort);
    cy.saveAndContinue();
    cy.enterArrivalDetails(arrivalDateTime, arrivalPort);
    cy.saveAndContinue();
    cy.checkNoErrors();
    cy.selectCheckbox(vessel.name);
    cy.contains('Add to voyage plan').click();
    cy.saveAndContinue();
    cy.checkNoErrors();
    cy.wait(1000);
    for (let i = 0; i < numberOfPersons; i += 1) {
      cy.selectCheckbox(persons[i].lastName);
    }
    cy.contains('Add to voyage plan and continue').click();
    cy.assertPeopleTable((reportData) => {
      expect(reportData).to.have.length(3);
    });
    cy.saveAndContinueOnPeopleManifest(false);
    cy.checkNoErrors();
    cy.enterSkipperDetails();
    cy.saveAndContinue();
    cy.get('.govuk-error-message').should('not.be.visible');
    cy.contains('Accept and submit voyage plan').click();
    cy.url().should('include', '/save-voyage/page-submitted');
    cy.get('.govuk-panel__title').should('have.text', 'Pleasure Craft Voyage Plan Submitted');
    cy.navigation('Voyage Plans'); 
    cy.checkReports('Submitted', (+numberOfSubmittedReports) + (+1));
    cy.contains('View existing voyage plans').click();
    cy.get('.govuk-tabs__list li')
      .within(() => {
        cy.get('#submitted').should('have.text', 'Submitted')
          .click();
      });
    cy.contains('h2', 'Submitted').next().getTable().then((reportData) => {
      cy.wait(2000);
      expect(reportData).to.not.be.empty;
      expect(reportData).to.deep.include({
        'Pleasure craft': `Pleasure craft${vessel.name}`,
        'Departure date': `Departure date${departDate}`,
        'Departure port': `Departure port${departurePortCode}`,
        'Arrival port': `Arrival port${arrivalPortCode}`
      });
    });
  });
  
  after(() => {
    cy.removeTestData();
  });
});
