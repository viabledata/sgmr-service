exports.randomEmail = () => {
  const uuid = () => Cypress._.random(0, 1e6);
  const id = uuid();
  const testname = `Auto-test${id}@mail.com`;
  return testname;
};

exports.randomNumber = () => {
  const uuid = () => Cypress._.random(0, 10000000);
  const id = uuid();
  return id;
};

exports.getFutureDate = () => {
  return Cypress.moment().add(2, 'year').format('DD/MM/YYYY');
};
