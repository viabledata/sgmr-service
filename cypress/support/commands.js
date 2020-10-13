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
