exports.getFutureDate = (year, format) => {
  const dayjs = require('dayjs');
  return ['DD/MM/YYYY', 'DD/MM/YYYY HH:MM'].includes(format)
    ? dayjs().add(year, 'year').format(format)
    : null;
};

exports.getPastDate = (age, format) => {
  const dayjs = require('dayjs');
  return ['DD/MM/YYYY', 'DD/MM/YYYY HH:MM'].includes(format)
    ? dayjs().subtract(age, 'year').format(format)
    : null;
};

exports.terminalLog = (violations) => {
  cy.task(
    'log',
    `${violations.length} accessibility violation${violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected`,
  );
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({
      id, impact, description, nodes,
    }) => ({
      id,
      impact,
      description,
      nodes: nodes.length,
      spec: Cypress.spec.name,
    }),
  );
  cy.task('table', violationData);
};
