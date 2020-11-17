/// <reference types="cypress" />
/**
 * @type {Cypress.PluginConfig}
 */

const faker = require('faker');
const path = require('path');
const fs = require('fs-extra');
const ObjectsToCsv = require('objects-to-csv');

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

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve('.', 'cypress', 'config', `${file}.json`);
  return fs.readJson(pathToConfigFile);
}

module.exports = (on, config) => {
  const file = config.env.configFile || 'local';
  on('task', {
    newUser() {
      return generateNewUser();
    },
    log(message) {
      console.log(message);
      return null;
    },
    table(message) {
      console.table(message);
      return null;
    },
    csv(data) {
      new ObjectsToCsv(data).toDisk('axe.csv', { append: true });
      return null;
    },
  });
  return getConfigurationByFile(file);
};
