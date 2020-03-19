import moment from 'moment';

export const isDateValid = (year, month, day) => {
  if (!year || !month || !day || year.length < 4 || month > 12 || month < 1 || day > 31 || day < 1) {
    return false;
  }

  return true;
};

export const formatDate = (year, month, day) => {
  const newDate = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD').format('YYYY-M-D');

  return newDate;
};
