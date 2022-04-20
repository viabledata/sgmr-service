const {getFutureDate} = require('../../support/utils');

describe('Edit Details & Submit new voyage plan', () => {
    let departureDateTime;
    let departurePort;
    let departurePortCode;
    let arrivalDateTime;
    let arrivalPort;
    let arrivalPortCode;
    let vessel;
    let person;
    let departDate;
    let numberOfSubmittedReports;
    let numberOfDraftReports;
    let numberOfCancelledReports;

    before(() => {
        cy.registerUser();
        if (Cypress.env('envname') === 'local') {
            const query = `sh cypress/scripts/delete-reports.sh ${Cypress.env('dbName')}`;
            cy.exec(query);
        }
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

        departurePort = 'Dover Marina';
        departurePortCode = 'ZZZD';
        arrivalPort = 'FelixstoweFerry';
        arrivalPortCode = 'ZZZA';
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
        cy.wait(1000);
        cy.url().should('include', '/voyage-plans/start');
        cy.get('button[title="saveButton"]').should('have.text','Continue').click();
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
            cy.contains('Add to voyage plan').click();
            cy.saveAndContinueOnPeopleManifest(false);
        });
        cy.checkNoErrors();
        cy.enterSkipperDetails();
        cy.saveAndContinue();
        cy.wait(1000);
        cy.get('.govuk-error-message').should('not.be.visible');
    });

    it('Should be able to edit Departure and Arrival details before submit the voyage plan', () => {
        departureDateTime = getFutureDate(2, 'DD/MM/YYYY HH:MM');
        departurePort = 'London Corinthians sailing club';
        departurePortCode = 'ZZZD';
        departDate = departureDateTime.split(' ')[0];
        arrivalDateTime = getFutureDate(2, 'DD/MM/YYYY HH:MM');
        arrivalPort = 'Swansea Marina';
        arrivalPortCode = 'ZZZA';

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
        cy.contains('add a new person').click();
        cy.checkNoErrors();
        cy.get('button[type="submit"]').click();
        cy.url().should('include', 'page-5');
        cy.saveAndContinueOnPeopleManifest(false);
        cy.checkNoErrors();
        cy.url().should('include', 'page-6');
        cy.saveAndContinue();
        cy.wait(1000)
        cy.get('.govuk-error-message').should('not.be.visible');
        cy.contains('Accept and submit voyage plan').click();
        cy.url().should('include', '/save-voyage/page-submitted');
        cy.get('.govuk-panel__title').should('have.text', 'Pleasure Craft Voyage Plan Submitted');
        cy.navigation('Voyage Plans');
        //  cy.checkReports('Submitted', (+numberOfSubmittedReports) + (+1));
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
    });

    it('Should be able to edit Pleasure Craft and Person details before submit the voyage plan', () => {
        cy.get('a[href="/save-voyage/page-3"]').click();
        cy.enterVesselInfo(vessel);
        cy.saveAndContinue();
        cy.checkNoErrors();
        cy.url().should('include', 'page-4');
        cy.contains('add a new person').click();
        cy.checkNoErrors();
        cy.get('button[type="submit"]').click();
        cy.url().should('include', 'page-5');
        cy.saveAndContinueOnPeopleManifest();
        cy.checkNoErrors();
        cy.url().should('include', 'page-6');
        cy.saveAndContinue();
        cy.wait(1000);
        cy.get('.govuk-error-message').should('not.be.visible');
        cy.contains('Accept and submit voyage plan').click();
        cy.url().should('include', '/save-voyage/page-submitted');
        cy.get('.govuk-panel__title').should('have.text', 'Pleasure Craft Voyage Plan Submitted');
        cy.navigation('Voyage Plans');
        // cy.checkReports('Submitted', (+numberOfSubmittedReports) + (+1));
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

        cy.contains('a', vessel.name).click();

        cy.get('a[href="/save-voyage/page-3"]').click();

        cy.get('[name="vesselType"]').should('have.value', vessel.type);
        cy.get('[name="moorings"]').should('have.value', vessel.moorings);
        cy.get('[name="registration"]').should('have.value', vessel.regNumber);
    });

    it('Should be able to edit the draft and submit the report', ()=>{
        cy.visit('/voyage-plans');
        cy.url().should('include','voyage-plans')
        cy.contains('View existing voyage plans').click();
        cy.get('.govuk-tabs__list')
            .within(() =>{
                cy.get('#draft').should('have.text','Draft')
                    .click();
                cy.wait(1000);
            })
        cy.contains('h2','Draft').next().getTable().should((reportData) =>{
            expect(reportData).to.deep.include({
                'Pleasure craft': `Pleasure craft${vessel.name}`,
                'Departure date': `Departure date${departDate}`,
                'Departure port': `Departure port${departurePortCode}`,
                'Arrival port': `Arrival port${arrivalPortCode}`
            })
        })
        cy.contains('a', vessel.name).click();
        cy.url().should('include','/save-voyage/page-7');
        cy.contains('.govuk-button','Accept and submit voyage plan').click();
        cy.url().should('include','save-voyage/page-submitted')
        cy.get('.govuk-panel__title').should('have.text','Pleasure Craft Voyage Plan Submitted')
        cy.navigation('Voyage Plans')
      //cy.checkReports('Submitted', (+numberOfSubmittedReports) + (+1));
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
        cy.visit('/voyage-plans');
        // cy.checkReports('Draft', (+numberOfDraftReports) + (-1));
        cy.url().should('include','voyage-plans')
        cy.contains('View existing voyage plans').click();
        cy.get('.govuk-tabs__list')
            .within(() =>{
                cy.get('#draft').should('have.text','Draft')
                    .click();
                cy.wait(1000);
            })
        cy.contains('h2','Draft').next().getTable().should((reportData) =>{
            expect(reportData).not.to.deep.include({
                'Pleasure craft': `Pleasure craft${vessel.name}`,
                'Departure date': `Departure date${departDate}`,
                'Departure port': `Departure port${departurePortCode}`,
                'Arrival port': `Arrival port${arrivalPortCode}`
            })
        })
    });

    after(() => {
        cy.deleteAllEmails();
        cy.removeTestData();
    });
});
