const sortNames = (names) => {
  return names.sort((a, b) => {
    if (a.lastName.toLowerCase() === b.lastName.toLowerCase()) {
      return a.firstName.toLowerCase() < b.firstName.toLowerCase() ? -1 : 1;
    }
    return a.lastName.toLowerCase() < b.lastName.toLowerCase() ? -1 : 1;
  });
};

export default sortNames;
