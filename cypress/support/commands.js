const faker = require('faker');

const { getFutureDate, getPastDate } = require('./utils');

Cypress.Commands.add('enterUserInfo', (user) => {
  cy.get('input[name="firstName"]').clear().type(user.firstName);
  cy.get('input[name="lastName"]').clear().type(user.lastName);
  cy.get('input[name="mobileNumber"]').clear().type(user.mobileNumber);
  cy.get('input[name="email"]').clear().type(user.email);
  cy.get('input[name="confirmEmail"]').clear().type(user.email);
  cy.get('input[name="password"]').clear().type(user.password);
  cy.get('input[name="confirmPassword"]').clear().type(user.password);
});

Cypress.Commands.add('enterVesselInfo', (newVessel) => {
  cy.get('[name="vesselName"]').clear().type(newVessel.name);
  cy.get('[name="vesselType"]').clear().type(newVessel.type);
  cy.get('[name="moorings"]').clear().type(newVessel.moorings);
  cy.get('[name="registration"]').clear().type(newVessel.regNumber);
  cy.get('[name="hullIdentificationNumber"]').clear().type(newVessel.hullIdNumber);
  cy.get('[name="callsign"]').clear().type(newVessel.callSign);
  cy.get('[name="vesselNationality"]').clear().type(newVessel.nationality);
  cy.get('[name="portOfRegistry"]').clear().type(newVessel.port);
});

Cypress.Commands.add('enterPeopleInfo', (people) => {
  let date = people.expiryDate.split('/');
  let dob = people.dateOfBirth.split('/');
  cy.get('input[name="firstName"]').clear().type(people.firstName);
  cy.get('input[name="lastName"]').clear().type(people.lastName);
  cy.get('[type="radio"]').check(people.gender).should('be.checked');
  cy.get('input[name="dateOfBirthDay"]').clear().type(dob[0]);
  cy.get('input[name="dateOfBirthMonth"]').clear().type(dob[1]);
  cy.get('input[name="dateOfBirthYear"]').clear().type(dob[2]);
  cy.get('input[name="placeOfBirth"]').clear().type(people.placeOfBirth);
  cy.get('select').select(people.nationality).should('have.value', 'GBR');
  cy.get('[type="radio"]').check(people.personType).should('be.checked');
  cy.get('[type="radio"]').check(people.travelDocType).should('be.checked');
  cy.get('input[name="documentNumber"]').clear().type(people.documentNumber);
  cy.get('input[name="documentIssuingState"]').clear().type(people.issuingState);
  cy.get('input[name="documentExpiryDateDay"]').clear().type(date[0]);
  cy.get('input[name="documentExpiryDateMonth"]').clear().type(date[1]);
  cy.get('input[name="documentExpiryDateYear"]').clear().type(date[2]);
});

Cypress.Commands.add('navigation', (option) => {
  cy.contains('a', option).click();
});

Cypress.Commands.add('login', () => {
  cy.fixture('users.json').then((user) => {
    const { email, password } = user;
    cy.visit('/');
    cy.get('.govuk-button--start').click();
    cy.get('input[name="email"]').clear().type(email);
    cy.get('input[name="password"]').clear().type(password);

    cy.server();
    cy.route('POST', `${Cypress.env('api_server')}/login`).as('login');

    cy.get('.govuk-button').click();
    cy.url().should('include', '/verify?source=reports');

    cy.wait('@login').should((xhr) => {
      expect(xhr.status).to.eq(200);
      let authCode = xhr.responseBody.twoFactorToken;
      cy.get('input[name="twoFactorToken"]').clear().type(authCode);
      cy.get('.govuk-button').click();
    });
    cy.url().should('include', '/reports');
    cy.get('.govuk-button--start').should('have.text', 'Start now');
  });
});

Cypress.Commands.add('registerUser', () => {
  let apiServer = Cypress.env('api_server');
  cy.readFile('cypress/fixtures/user-registration.json').then((registrationData) => {
    cy.request({
      method: 'POST',
      url: `${apiServer}/registration`,
      body: registrationData,
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        cy.request(
          'PATCH',
          `${apiServer}/submit-verification-code`,
          {
            email: response.body.email,
            twoFactorToken: response.body.twoFactorToken,
          },
        ).then((response2) => {
          expect(response2.status).to.eq(200);
        });
      } else if (response.body.message === 'User already registered') {
        expect(response.status).to.eq(400);
      } else {
        throw Error('Could not register the user');
      }
    });
  });
});

Cypress.Commands.add('enterDepartureDetails', (date, port) => {
  let dateTime = date.split(' ');
  const departureDate = dateTime[0].split('/');
  const departureTime = dateTime[1].split(':');
  cy.get('input[name="departureDateDay"]').clear().type(departureDate[0]);
  cy.get('input[name="departureDateMonth"]').clear().type(departureDate[1]);
  cy.get('input[name="departureDateYear"]').clear().type(departureDate[2]);
  cy.get('input[name="departureTimeHour"]').clear().type(departureTime[0]);
  cy.get('input[name="departureTimeMinute"]').clear().type(departureTime[1]);
  cy.log(port);
  cy.get('input[name="departurePort"]').clear().type(port);
});

Cypress.Commands.add('enterArrivalDetails', (date, port) => {
  let dateTime = date.split(' ');
  const arrivalDate = dateTime[0].split('/');
  const arrivalTime = dateTime[1].split(':');
  cy.get('input[name="arrivalDateDay"]').clear().type(arrivalDate[0]);
  cy.get('input[name="arrivalDateMonth"]').clear().type(arrivalDate[1]);
  cy.get('input[name="arrivalDateYear"]').clear().type(arrivalDate[2]);
  cy.get('input[name="arrivalTimeHour"]').clear().type(arrivalTime[0]);
  cy.get('input[name="arrivalTimeMinute"]').clear().type(arrivalTime[1]);
  cy.get('input[name="arrivalPort"]').clear().type(port);
});

Cypress.Commands.add('enterSkipperDetails', () => {
  faker.locale = 'en_GB';
  cy.get('input[name="responsibleGivenName"]').clear().type(faker.name.firstName());
  cy.get('input[name="responsibleSurname"]').clear().type(faker.name.lastName());
  cy.get('input[name="responsibleContactNo"]').clear().type(faker.phone.phoneNumber());
  cy.get('input[name="responsibleAddressLine1"]').clear().type(faker.address.streetAddress());
  cy.get('input[name="responsibleAddressLine2"]').clear().type(faker.address.streetName());
  cy.get('input[name="responsibleTown"]').clear().type(faker.address.city());
  cy.get('input[name="responsibleCounty"]').clear().type(faker.address.county());
  cy.get('input[name="responsiblePostcode"]').clear().type(faker.address.zipCode());
});

Cypress.Commands.add('checkNoErrors', () => {
  cy.get('.govuk-error-message').should('not.be.visible');
});

Cypress.Commands.add('saveAndContinue', () => {
  cy.contains('Save and continue').click();
});

Cypress.Commands.add('saveAndContinueOnPeopleManifest', (makeChanges) => {
  cy.contains('Would you like to make further changes?').parent().parent()
    .contains(makeChanges ? 'Yes' : 'No')
    .click();
  cy.saveAndContinue();
});

Cypress.Commands.add('getPersonObj', () => {
  cy.fixture('people.json').then((personObj) => {
    personObj.documentNumber = faker.random.number();
    personObj.firstName = `Auto-${faker.name.firstName()}`;
    personObj.lastName = faker.name.lastName();
    personObj.dateOfBirth = getPastDate(30, 'DD/MM/YYYY');
    personObj.expiryDate = getFutureDate(3, 'DD/MM/YYYY');
    return cy.wrap(personObj);
  });
});

Cypress.Commands.add('getVesselObj', () => {
  cy.fixture('vessel.json').then((vesselObj) => {
    vesselObj.regNumber = faker.random.number();
    vesselObj.name = `${vesselObj.name}${faker.random.number()}`;
    return cy.wrap(vesselObj);
  });
});

Cypress.Commands.add('addPeople', (person) => {
  cy.navigation('People');
  cy.get('.govuk-button--start').should('have.text', 'Save a person').click();
  cy.url().should('include', '/save-person?source=people');
  cy.enterPeopleInfo(person);
  cy.get('.govuk-button').click();
  cy.get('.govuk-error-message').should('not.be.visible');
});

Cypress.Commands.add('addVessel', (vessel) => {
  cy.navigation('Vessels');
  cy.get('.govuk-button--start').should('have.text', 'Save a vessel').click();
  cy.url().should('include', '/save-vessel?source=vessels');
  cy.enterVesselInfo(vessel);
  cy.get('.govuk-button').click();
  cy.get('.govuk-error-message').should('not.be.visible');
});

Cypress.Commands.add('selectCheckbox', (option) => {
  cy.get('.table-clickable td').contains(option)
    .prev('.multiple-choice--hod')
    .find('input[type="checkbox"]')
    .check()
    .should('be.checked');
});

Cypress.Commands.add('checkReports', (type, numberOfReports) => {
  cy.get('.govuk-grid-row')
    .find('p.govuk-body-s')
    .filter(`:contains(${type})`)
    .find('strong')
    .should('have.text', numberOfReports);
});

Cypress.Commands.add('assertPeopleTable', (callback) => {
  cy.contains('The people you have selected for this voyage are:').next()
    .getTable().then(callback);
});
