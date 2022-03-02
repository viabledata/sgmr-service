const removeError = (fieldName, errors) => {
  const errorList = { ...errors };
  let key;
  if (fieldName.includes('dateOfBirth')) {
    key = 'dateOfBirth';
  } else if (fieldName.includes('documentExpiryDate')) {
    key = 'documentExpiryDate';
  } else {
    key = fieldName;
  }
  delete errorList[key];
  return errorList;
};

export default removeError;
