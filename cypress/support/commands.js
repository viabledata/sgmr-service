const faker = require('faker');

Cypress.Commands.add('enterUserInfo', (user) => {
  cy.get('#firstName [type="text"]').clear().type(user.firstName);
  cy.get('#lastName [type="text"]').clear().type(user.lastName);
  cy.get('input[name="mobileNumber"][type="text"]').clear().type(user.mobileNumber);
  cy.get('#email input[type="text"]').clear().type(user.email);
  cy.get('#confirmEmail input[type="text"]').clear().type(user.email);
  cy.get('#password input[type="password"]').clear().type(user.password);
  cy.get('#confirmPassword input[type="password"]').clear().type(user.password);
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
  cy.get('#firstName [type="text"]').clear().type(people.firstName);
  cy.get('#lastName [type="text"]').clear().type(people.lastName);
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

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/sign-in');
  cy.get('#email input').type(email);
  cy.get('#password input ').type(password);

  cy.server();
  cy.route('POST', `${Cypress.env('api_server')}/login`).as('login');

  cy.get('.govuk-button').click();
  cy.url().should('include', '/verify?source=reports');

  cy.wait('@login').should((xhr) => {
    expect(xhr.status).to.eq(200);
    let authCode = xhr.responseBody.twoFactorToken;
    cy.get('input[name="twoFactorToken"]').type(authCode);
    cy.get('.govuk-button').click();
  });
  cy.url().should('include', '/reports');
  cy.get('.govuk-button--start').should('have.text', 'Start now');
});

Cypress.Commands.add('navigation', (option) => {
  cy.contains('a', option).click();
});

Cypress.Commands.add('registerUser', () => {
  let apiServer = Cypress.env('api_server');
  cy.writeFile('cypress/fixtures/user-registration.json',
    {
      email: faker.internet.exampleEmail(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      mobileNumber: '07800055555',
      password: 'test1234',
    });

  cy.readFile('cypress/fixtures/user-registration.json').then((registrationData) => {
    cy.request(
      'POST',
      `${apiServer}registration`,
      registrationData,
    ).as('registration');
  });

  cy.get('@registration').then((response) => {
    expect(response.status).to.eq(200);
    let code = response.body.twoFactorToken;
    let emailAddress = response.body.email;
    cy.request(
      'PATCH',
      `${apiServer}submit-verification-code`,
      {
        email: emailAddress,
        twoFactorToken: code.trim(),
      },
    ).then((res) => {
      expect(res.status).to.eq(200);
      cy.writeFile('cypress/fixtures/users.json', { email: emailAddress, password: 'test1234' });
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

Cypress.Commands.add('checkUserExists', (user) => {
  const query = `sh cypress/scripts/check-user-exist.sh ${user}`;
  cy.exec(query).then((result) => {
    if (result.stdout.includes('0 rows')) {
      return false;
    }
    return true;
  });
});
