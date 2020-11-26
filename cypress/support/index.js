import './commands';
import 'cypress-axe';

const addContext = require('mochawesome/addContext');

require('cypress-get-table');

Cypress.on('uncaught:exception', () => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    const screenshotFileName = `${Cypress.config('screenshotsFolder')}/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (failed).png`;
    addContext({ test }, `assets/${Cypress.spec.name}/${screenshotFileName}`);
  }
});
