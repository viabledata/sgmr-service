exports.getFutureDate = (year, format) => {
  return ['DD/MM/YYYY', 'DD/MM/YYYY HH:MM'].includes(format)
    ? Cypress.moment().add(year, 'year').format(format)
    : null;
};

exports.getPastDate = (age, format) => {
  return ['DD/MM/YYYY', 'DD/MM/YYYY HH:MM'].includes(format)
    ? Cypress.moment().subtract(age, 'year').format(format)
    : null;
};
