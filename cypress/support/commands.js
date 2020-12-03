const faker = require('faker');
const { MailSlurp } = require('mailslurp-client');

const { getFutureDate, getPastDate, terminalLog } = require('./utils');

const apiKey = 'e6a3b1f5d1877486bba59baa6800bcccc252997dc7561e56065a0a0d953f75bd';
const mailslurp = new MailSlurp({ apiKey });

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
  let apiServer = Cypress.env('api_server');
  cy.fixture('users.json').then((user) => {
    cy.request({
      method: 'POST',
      url: `${apiServer}/login`,
      body: user,
      followRedirect: true,
    }).then((response) => {
      if (response.status === 200) {
        cy.visit('/');
        localStorage.setItem('token', response.body.token);
      } else {
        throw Error(`Login Failed for user: ${user.email}`);
      }
    });
  });
  cy.navigation('Reports');
  cy.get('.govuk-button--start').should('have.text', 'Start now');
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
        cy.waitForLatestEmail('cb52ca14-0d64-4821-9970-4e81b47e13c1').then((mail) => {
          assert.isDefined(mail);
          const token = /token=([A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*)/.exec(mail.body)[1];
          const email = /email=([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/i.exec(mail.body)[1];
          cy.visit(`/activate-account?email=${email}&token=${token}`);
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
  cy.get('input[id="departurePort"]').clear().type(port);
  cy.get('ul[id="departurePort__listbox"] .autocomplete__option').contains(port).click();
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
  cy.get('input[id="arrivalPort"]').clear().type(port);
  cy.get('ul[id="arrivalPort__listbox"] .autocomplete__option').contains(port).click();
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
  cy.contains('Save and continue').click({ force: true });
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
  cy.contains('a', 'Save a person').should('have.text', 'Save a person').click();
  cy.enterPeopleInfo(person);
  cy.get('.govuk-button').click();
  cy.get('.govuk-error-message').should('not.be.visible');
  cy.get('table').getTable().then((peopleData) => {
    expect(peopleData).to.deep.include({
      'Surname': person.lastName,
      'Given name': person.firstName,
      'Type': person.personType,
    });
  });
});

Cypress.Commands.add('addVessel', (vessel) => {
  cy.contains('a', 'Save a vessel').should('have.text', 'Save a vessel').click();
  cy.enterVesselInfo(vessel);
  cy.get('.govuk-button').click();
  cy.get('.govuk-error-message').should('not.be.visible');
  cy.get('table').getTable().then((vesselData) => {
    expect(vesselData).to.deep.include({
      'Vessel name': vessel.name,
      'Vessel type': vessel.type,
      'Usual moorings': vessel.moorings,
    });
  });
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

Cypress.Commands.add('checkAccessibility', () => {
  cy.checkA11y(null, {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa'],
    },
  }, terminalLog, true);
});

Cypress.Commands.add('deleteReports', () => {
  if (Cypress.env('envname') === 'local') {
    const query = `sh cypress/scripts/delete-reports.sh ${Cypress.env('dbName')}`;
    cy.exec(query);
  }
});

Cypress.Commands.add('createInbox', () => {
  return mailslurp.createInbox();
});

Cypress.Commands.add('waitForLatestEmail', (inboxId) => {
  return mailslurp.waitForLatestEmail(inboxId, 30000);
});
