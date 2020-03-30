import moment from 'moment';

export const isDateValid = (year, month, day) => {
  const numbers = new RegExp('^[0-9]+$');
  if ((year < 1900 || month > 12 || month < 1 || day > 31 || day < 1)
  && (numbers.test(year) && numbers.test(month) && numbers.test(day))) {
    return false;
  }

  return true;
};

export const formatDate = (year, month, day) => {
  moment(`${year}-${month}-${day}`, 'YYYY-MM-DD').format('YYYY-M-D');
};

export const formatUIDate = (date) => {
  const uiDate = moment(date, 'YYYY-M-D').format('DD/MM/YYYY');

  return uiDate;
};
