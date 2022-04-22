const faker = require('faker');

describe('Edit existing People information in the account', () => {
    let persons=[];
    const numberOfPeople=2;

    before(() => {
        cy.registerUser();
        cy.login();
        cy.navigation('People');
        for (let i = 0; i < numberOfPeople; i++) {
        cy.getPersonObj().then((personObj) => {
            persons[i] = personObj;
            cy.addPeople(persons[i]);
        });
    }
    });

    beforeEach(() => {
        cy.login();
        cy.injectAxe();
        cy.navigation('People');
        cy.checkAccessibility();
        cy.url().should('include', '/people');
    });

    it('Should be able to edit existing people information and save', () => {
        cy.contains('a', persons[1].lastName).click();
        cy.checkAccessibility();
        persons[1].firstName = `Auto-${faker.name.firstName()}`;
        persons[1].lastName = faker.name.lastName();
        persons[1].personType = 'Employed Crew';
        persons[1].travelDocType = 'IdentityCard';
        persons[1].documentNumber = faker.datatype.number();
        persons[1].issuingState = 'AUS';
        persons[1].personTypeValue = 'Crew';

        const expectedPerson = [
            {
                'Last Name': `Last Name${persons[1].lastName}`,
                'First Name': `First Name${persons[1].firstName}`,
                'Type': `Type${persons[1].personType}`,
            }
        ];
        cy.get('input[name="firstName"]').clear().type(persons[1].firstName);
        cy.get('input[name="lastName"]').clear().type(persons[1].lastName);
        cy.get('[type="radio"]').check(persons[1].personTypeValue).should('be.checked');
        cy.get('[type="radio"]').check(persons[1].travelDocType).should('be.checked');
        cy.get('input[name="documentNumber"]').clear().type(persons[1].documentNumber);
        cy.get('input[name="documentIssuingState"]').clear().type(persons[1].issuingState);
        cy.get('.govuk-button').contains('Add to saved people list').click();
        cy.get('.govuk-error-message').should('not.exist');

        cy.get('table').getTable().then((peopleData) => {
            expect(peopleData).to.not.be.empty;
            expectedPerson.forEach((item) => expect(peopleData).to.deep.include(item));
        });

        cy.contains('a', persons[1].lastName).click();

        cy.get('input[name="documentNumber"]').should('have.value', persons[1].documentNumber);
        cy.get('input[name="documentIssuingState"]').should('have.value', persons[1].issuingState);
        cy.checkAccessibility();
    });

    it('Should be able to edit existing people information and NOT save', () => {
        cy.contains('a', persons[1].lastName).click();
        cy.checkAccessibility();
        persons[1].travelDocType = 'Passport';
        persons[1].documentNumber = faker.datatype.number();
        persons[1].issuingState = 'CUB';

        const expectedPerson = [
            {
                'Last Name': `Last Name${persons[1].lastName}`,
                'First Name': `First Name${persons[1].firstName}`,
                'Type': `Type${persons[1].personType}`,
            }
        ];
        cy.get('input[name="firstName"]').clear().type(`Auto-${faker.name.firstName()}`);
        cy.get('input[name="lastName"]').clear().type(faker.name.lastName());
        cy.get('[type="radio"]').check(persons[1].personTypeValue).should('be.checked');
        cy.get('[type="radio"]').check(persons[1].travelDocType).should('be.checked');
        cy.get('input[name="documentNumber"]').clear().type(persons[1].documentNumber);
        cy.get('input[name="documentIssuingState"]').clear().type(persons[1].issuingState);
        cy.get('.govuk-link--no-visited-state').click();
        cy.get('.govuk-error-message').should('not.exist');

        cy.get('table').getTable().then((peopleData) => {
            expect(peopleData).to.not.be.empty;
            expectedPerson.forEach((item) => expect(peopleData).to.deep.include(item));
        });

        cy.contains('a', persons[1].lastName).click();

        cy.get('input[name="documentNumber"]').should('not.have.value', persons[1].documentNumber);
        cy.get('input[name="documentIssuingState"]').should('not.have.value', persons[1].issuingState);
    });
    it('Should be able to delete the added person',()=>{
        cy.get('tr td:nth-child(1)').contains(persons[1].lastName).click();
        cy.url().should('include', '/people/edit-person');
        cy.get('input[name="lastName"]').should('have.value',persons[1].lastName);
        cy.get('input[name="firstName"]').should('have.value',persons[1].firstName);
        cy.get('.govuk-button--warning').click();
        cy.get('#confirm-yes').check();
        cy.get('.govuk-button').contains('Continue').click()
        cy.url().should('include', '/people');
        cy.contains('Person successfully deleted');
    });

    after(() => {
        cy.deleteAllEmails();
        cy.removeTestData();
    });
});
