/// <reference types="cypress" />
/**
 * @type {Cypress.PluginConfig}
 */

const faker = require('faker');

function generateNewUser() {
  let user = {
    firstName: `Auto-${faker.name.firstName()}`,
    email: `Auto-${faker.internet.exampleEmail()}`,
    lastName: `Auto-${faker.name.lastName()}`,
    password: 'SuperSecret',
    mobileNumber: '07000055555',
  };
  return user;
}

module.exports = (on) => {
  on('task', {
    newUser() {
      return generateNewUser();
    },
  });
};
