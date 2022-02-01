const isTimeValid = (hour, minute) => {
  const numbers = /^[0-9]+$/;
  if ((hour > 23 || minute > 59)
  || !numbers.test(hour) || !numbers.test(minute)) {
    return false;
  }
  return true;
};

const isCurrentDateWithTimeBeforeNow = (year, month, day, hour, minute) => {
  const [currentDate, currentTime] = [1, 2].map(() => new Date());
  const [testDate, testTime] = [1, 2].map(() => new Date(year, (month - 1), day, hour, minute));

  currentDate.setHours(0, 0, 0, 0);
  testDate.setHours(0, 0, 0, 0);
  currentTime.setDate(0, 0, 0);
  testTime.setDate(0, 0, 0);

  if (currentDate.getTime() === testDate.getTime()) {
    return currentTime.getTime() >= testTime.getTime();
  }
  return false;
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
  isCurrentDateWithTimeBeforeNow,
  isTimeAndDateBeforeNow,
  splitTime,
};
