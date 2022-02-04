import dayjs from 'dayjs';

export const formatDate = (year, month, day) => {
  return dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD').format('YYYY-M-D');
};

export const formatUIDate = (date) => {
  return dayjs(date, 'YYYY-M-D').format('DD/MM/YYYY');
};

export const isDateValid = (year, month, day) => {
  const numbers = /^[0-9]+$/;
  if ((year > 2099 || year < 1900 || month > 12 || month < 1 || day > 31 || day < 1)
    || !numbers.test(year) || !numbers.test(month) || !numbers.test(day)) {
    return false;
  }
  // If the above tests pass, then test format date using dayjs, if it fails return false (date not valid)
  if (formatDate(year, month, day) === 'Invalid date') {
    return false;
  }
  return true;
};

export const isInThePast = (year, month, day) => {
  const today = new Date();
  const testDate = new Date(year, (month - 1), day);
  return today.getTime() >= testDate.getTime();
};

export const splitDate = (date, fieldName) => {
  const [year, month, day] = date.split('-');
  return ({ [`${fieldName}Year`]: year, [`${fieldName}Month`]: month, [`${fieldName}Day`]: day });
};
