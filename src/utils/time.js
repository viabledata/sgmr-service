const isTimeValid = (hour, minute) => {
  const numbers = new RegExp('^[0-9]+$');
  if ((hour > 23 || minute > 59)
  || !numbers.test(hour) || !numbers.test(minute)) {
    return false;
  }
  return true;
};

export default isTimeValid;
