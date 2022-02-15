const { getFutureDate } = require('../../support/utils');

describe('Add new voyage plan', () => {
  let departureDateTime;
  let departurePort;
  let departurePortCode;
  let arrivalDateTime;
  let arrivalPort;
  let arrivalPortCode;
  let vessel;
  let person;
  let departDate;
  let numberOfDraftReports;
  let numberOfSubmittedReports;
  let numberOfCancelledReports;

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
    departurePortCode = 'GB DVR';
    arrivalPort = 'Felixstowe';
    arrivalPortCode = 'GB FXT';
    departureDateTime = getFutureDate(1, 'DD/MM/YYYY HH:MM');
    departDate = departureDateTime.split(' ')[0];
    arrivalDateTime = getFutureDate(2, 'DD/MM/YYYY HH:MM');

    cy.navigation('Voyage Plans');
    cy.url().should('include', '/voyage-plans');
    cy.getNumberOfReports('Draft').then((res) => {
      numberOfDraftReports = res;
    });
    cy.getNumberOfReports('Submitted').then((res) => {
      numberOfSubmittedReports = res;
    });
    cy.getNumberOfReports('Cancelled').then((res) => {
      numberOfCancelledReports = res;
    });
    cy.get('.govuk-button--start').should('have.text', 'Start now').click();
  });

  it('Should submit voyage plan successfully', () => {
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
    cy.contains('Add to voyage plan').click();
    cy.assertPeopleTable((reportData) => {
      expect(reportData).to.have.length(1);
      expect(reportData[0]).to.deep.include({
      'Last name': `Last name${person.lastName}`,
      'First name': `First name${person.firstName}`
      });
      cy.get('.responsive-table__heading').should('not.be.visible');
    });
    cy.saveAndContinueOnPeopleManifest(true);
    cy.contains(`People already added to the voyage plan:${person.firstName} ${person.lastName}`);
    cy.saveAndContinue();
    cy.get('input[type="checkbox"]').eq(0).check();
    cy.contains('Remove person').click();
    cy.contains('There are no people on the voyage plan.');
    cy.saveAndContinueOnPeopleManifest(true);
    cy.contains('add a new person').click();
    cy.contains('Add to voyage plan').click();
    cy.assertPeopleTable((reportData) => {
      expect(reportData).to.have.length(1);
    });
    cy.saveAndContinueOnPeopleManifest(false);
    cy.checkNoErrors();
    cy.checkAccessibility();
    cy.enterSkipperDetails();
    cy.saveAndContinue();
    cy.get('.govuk-error-message').should('not.be.visible');
    cy.checkAccessibility();
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
        cy.wait(2000);
      });
    cy.contains('h2', 'Submitted').next().getTable().should((reportData) => {
      expect(reportData).to.deep.include({
        'Pleasure craft': `Pleasure craft${vessel.name}`,
        'Departure date': `Departure date${departDate}`,
        'Departure port': `Departure port${departurePortCode}`,
        'Arrival port': `Arrival port${arrivalPortCode}`
      });
    });
    cy.checkAccessibility();
  });

  it('Should be able to cancel voyage plan', () => {
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
    cy.contains('Add to voyage plan').click();
    cy.saveAndContinueOnPeopleManifest(false);
    cy.checkNoErrors();
    cy.enterSkipperDetails();
    cy.saveAndContinue();
    cy.get('.govuk-error-message').should('not.be.visible');
    cy.contains('Cancel voyage').click();
    cy.get('#confirm-yes').check();
    cy.contains('Continue').click();
    cy.url().should('include', '/voyage-plans');
    cy.navigation('Voyage Plans');
    cy.checkReports('Cancelled', (+numberOfCancelledReports) + (+1));
    cy.contains('View existing voyage plans').click();
    cy.get('.govuk-tabs__list li')
      .within(() => {
        cy.get('#cancelled').should('have.text', 'Cancelled')
          .click();
        cy.wait(2000);
      });
    cy.contains('h2', 'Cancelled').next().getTable().should((reportData) => {
      expect(reportData).to.deep.include({
        'Pleasure craft': `Pleasure craft${vessel.name}`,
        'Departure date': `Departure date${departDate}`,
        'Departure port': `Departure port${departurePortCode}`,
        'Arrival port': `Arrival port${arrivalPortCode}`
      });
    });
  });

  it('Should be able to save voyage plan for later', () => {
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
    cy.contains('Add to voyage plan').click();
    cy.saveAndContinueOnPeopleManifest(false);
    cy.checkNoErrors();
    cy.enterSkipperDetails();
    cy.saveAndContinue();
    cy.get('.govuk-error-message').should('not.be.visible');
    cy.contains('Exit without saving').click();
    cy.url().should('include', '/voyage-plans');
    cy.navigation('Voyage Plans');
    cy.checkReports('Draft', (+numberOfDraftReports) + (+1));
    cy.contains('View existing voyage plans').click();
    cy.get('.govuk-tabs__list li')
      .within(() => {
        cy.get('#draft').should('have.text', 'Draft')
          .click();
        cy.wait(2000);
      });
    cy.contains('h2', 'Draft').next().getTable().should((reportData) => {
      expect(reportData).to.deep.include({
        'Pleasure craft': `Pleasure craft${vessel.name}`,
        'Departure date': `Departure date${departDate}`,
        'Departure port': `Departure port${departurePortCode}`,
        'Arrival port': `Arrival port${arrivalPortCode}`
      });
    });
  });

  after(() => {
    cy.deleteAllEmails();
    let token =  sessionStorage.getItem('token');
    let apiServer = Cypress.env('api_server');
    let voyageIds = cy.request({
      url: `${apiServer}/user/voyagereport?per_page=100`,
      method: 'GET',
      auth: {
        'bearer': token
      }
    }).then((response) => {
        response.body.items.forEach((voyage) => {
        cy.request({
          url: `${apiServer}/voyagereport/${voyage.id}`,
          method: 'DELETE',
          auth: {
            'bearer': token
          }
        });
      });
    });
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
