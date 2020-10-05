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
