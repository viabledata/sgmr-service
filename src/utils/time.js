const isTimeValid = (hour, minute) => {
  const numbers = new RegExp('^[0-9]+$');
  if ((hour > 23 || minute > 59)
  || !numbers.test(hour) || !numbers.test(minute)) {
    return false;
  }
  return true;
};

const splitTime = (time, fieldName) => {
  const [hour, minute] = time.split(':');
  return ({ [`${fieldName}Hour`]: hour, [`${fieldName}Minute`]: minute });
};


export {
  isTimeValid,
  splitTime,
};
