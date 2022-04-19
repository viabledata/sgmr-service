describe('Edit existing pleasure craft information', () => {
    let vessel;

    before(() => {
        cy.registerUser();
        cy.login();
        cy.navigation('Pleasure Crafts');

        cy.getVesselObj().then((vesselObj) => {
            vessel = vesselObj;
            cy.addVessel(vessel);
        });
    });

    beforeEach(() => {
        cy.login();
        cy.navigation('Pleasure Crafts');
        cy.url().should('include', '/pleasure-crafts');
    });

    it('Should be able to edit existing pleasure craft information and save', () => {
        cy.get('.govuk-table td a').contains(vessel.name).click();
        vessel.name = 'Auto-test-edit-1234';
        vessel.type = 'Sailboat';
        vessel.moorings = 'US';
        cy.get('[name="vesselName"]').click().clear().type(vessel.name);
        cy.get('[name="vesselType"]').clear().type(vessel.type);
        cy.get('[name="moorings"]').clear().type(vessel.moorings);
        cy.get('.govuk-button').contains('Save').click();
        cy.get('.govuk-error-message').should('not.exist');

        cy.get('table').getTable().then((vesselData) => {
            expect(vesselData).to.not.be.empty;
            expect(vesselData).to.deep.include({
                'Pleasure craft name': `Pleasure craft name${vessel.name}`,
                'Pleasure craft type': `Pleasure craft type${vessel.type}`,
                'Usual moorings': `Usual moorings${vessel.moorings}`,
            });
        });
    });

    it('Should be able to edit existing pleasure craft information and NOT save', () => {
        cy.get('.govuk-table td a').contains(vessel.name).click();
        cy.get('[name="vesselName"]').click().clear().type('Auto-test-edit-5555');
        cy.get('[name="vesselType"]').clear().type('Sailboat');
        cy.get('[name="moorings"]').clear().type('FR');
        cy.get('.govuk-link--no-visited-state').click();
        cy.get('.govuk-error-message').should('not.exist');

        cy.get('table').getTable().then((vesselData) => {
            expect(vesselData).to.not.be.empty;
            expect(vesselData).to.deep.include({
                'Pleasure craft name': `Pleasure craft name${vessel.name}`,
                'Pleasure craft type': `Pleasure craft type${vessel.type}`,
                'Usual moorings': `Usual moorings${vessel.moorings}`,
            });
        });
    });

    it('Should be able to delete the saved pleasure craft',()=>{
        cy.get('.govuk-table td a').contains(vessel.name).click();
        cy.url().should('include', '/pleasure-crafts/');
        cy.get('[name="vesselName"]').should('have.value',vessel.name);
        cy.get('.govuk-button--warning').click();
        cy.get('#confirm-yes').check();
        cy.get('.govuk-button').contains('Continue').click()
        cy.url().should('include', '/pleasure-crafts');
        cy.contains('Pleasure craft successfully deleted');
        cy.get('.govuk-table td a').should('not.have.value',vessel.name);
    })

    after(() => {
        cy.deleteAllEmails();
        cy.removeTestData();
    });
});
