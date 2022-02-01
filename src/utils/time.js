const isTimeValid = (hour, minute) => {
  const numbers = /^[0-9]+$/;
  if ((hour > 23 || minute > 59)
  || !numbers.test(hour) || !numbers.test(minute)) {
    return false;
  }
  return true;
};

const isDateToday = (year, month, day) => {
  const today = new Date();
  const testDate = new Date(year, (month - 1), day);

  // Set the times to an equal value for a simpler date comparison with timestamps
  today.setHours(0, 0, 0, 0);
  testDate.setHours(0, 0, 0, 0);

  return today.getTime() === testDate.getTime();
};

const isTimeAndDateBeforeNow = (year, month, day, hour, minute) => {
  const today = new Date();
  const testDate = new Date(year, (month - 1), day, hour, minute);
  return today.getTime() >= testDate.getTime();
};

const splitTime = (time, fieldName) => {
  const [hour, minute] = time.split(':');
  return ({ [`${fieldName}Hour`]: hour, [`${fieldName}Minute`]: minute });
};

export {
  isTimeValid,
  isDateToday,
  isTimeAndDateBeforeNow,
  splitTime,
};
