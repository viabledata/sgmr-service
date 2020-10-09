exports.getFutureDate = (year) => {
  return Cypress.moment().add(year, 'year').format('DD/MM/YYYY');
};

exports.getPastDate = (age) => {
  return Cypress.moment().subtract(age, 'year').format('DD/MM/YYYY');
};
