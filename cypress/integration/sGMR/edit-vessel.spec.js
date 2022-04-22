describe('Edit existing pleasure craft information', () => {
    const numberOfVessels = 2;
    let vessels=[];
    before(() => {
        cy.registerUser();
        cy.login();
        cy.navigation('Pleasure Crafts');

        for(let i = 0;i < numberOfVessels;i++)
        {
            cy.getVesselObj().then((vesselObj) => {
                vessels[i] = vesselObj;
                cy.addVessel(vessels[i]);
            });
        }
    });

    beforeEach(() => {
        cy.login();
        cy.navigation('Pleasure Crafts');
        cy.url().should('include', '/pleasure-crafts');
    });

    it('Should be able to edit existing pleasure craft information and save', () => {
        cy.get('.govuk-table td a').contains(vessels[1].name).click();
        vessels[1].name = 'Auto-test-edit-1234';
        vessels[1].type = 'Sailboat';
        vessels[1].moorings = 'US';
        cy.get('[name="vesselName"]').click().clear().type(vessels[1].name);
        cy.get('[name="vesselType"]').clear().type(vessels[1].type);
        cy.get('[name="moorings"]').clear().type(vessels[1].moorings);
        cy.get('.govuk-button').contains('Save').click();
        cy.get('.govuk-error-message').should('not.exist');

        cy.get('table').getTable().then((vesselData) => {
            expect(vesselData).to.not.be.empty;
            expect(vesselData).to.deep.include({
                'Pleasure craft name': `Pleasure craft name${vessels[1].name}`,
                'Pleasure craft type': `Pleasure craft type${vessels[1].type}`,
                'Usual moorings': `Usual moorings${vessels[1].moorings}`,
            });
        });
    });

    it('Should be able to edit existing pleasure craft information and NOT save', () => {
        cy.get('.govuk-table td a').contains(vessels[1].name).click();
        cy.get('[name="vesselName"]').click().clear().type('Auto-test-edit-5555');
        cy.get('[name="vesselType"]').clear().type('Sailboat');
        cy.get('[name="moorings"]').clear().type('FR');
        cy.get('.govuk-link--no-visited-state').click();
        cy.get('.govuk-error-message').should('not.exist');

        cy.get('table').getTable().then((vesselData) => {
            expect(vesselData).to.not.be.empty;
            expect(vesselData).to.deep.include({
                'Pleasure craft name': `Pleasure craft name${vessels[1].name}`,
                'Pleasure craft type': `Pleasure craft type${vessels[1].type}`,
                'Usual moorings': `Usual moorings${vessels[1].moorings}`,
            });
        });
    });

    it('Should be able to delete the saved pleasure craft',()=>{
        cy.get('.govuk-table td a').contains(vessels[1].name).click();
        cy.url().should('include', '/pleasure-crafts/');
        cy.get('[name="vesselName"]').should('have.value',vessels[1].name);
        cy.get('.govuk-button--warning').click();
        cy.get('#confirm-yes').check();
        cy.get('.govuk-button').contains('Continue').click()
        cy.url().should('include', '/pleasure-crafts');
        cy.contains('Pleasure craft successfully deleted');
        cy.get('.govuk-table td a').should('not.have.value',vessels[1].name);
    })

    after(() => {
        cy.deleteAllEmails();
        cy.removeTestData();
    });
});
