exports.getFutureDate = (year, format) => {
  let featureDate;
  switch (format) {
    case 'DD/MM/YYYY':
      featureDate = Cypress.moment().add(year, 'year').format(format);
      break;
    case 'DD/MM/YYYY HH:MM':
      featureDate = Cypress.moment().add(year, 'year').format(format);
      break;
    default:
      break;
  }
  return featureDate;
};

exports.getPastDate = (age, format) => {
  let pastDate;
  switch (format) {
    case 'DD/MM/YYYY':
      pastDate = Cypress.moment().subtract(age, 'year').format(format);
      break;
    case 'DD/MM/YYYY HH:MM':
      pastDate = Cypress.moment().subtract(age, 'year').format(format);
      break;
    default:
      break;
  }
  return pastDate;
};
