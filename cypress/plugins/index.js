/// <reference types="cypress" />
/**
 * @type {Cypress.PluginConfig}
 */

const faker = require('faker');
const fs = require('fs');

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
    readFileMaybe(filename) {
      if (fs.existsSync(filename)) {
        return fs.readFileSync(filename, 'utf8');
      }
      return null;
    },
    newUser() {
      return generateNewUser();
    },
  });
};
