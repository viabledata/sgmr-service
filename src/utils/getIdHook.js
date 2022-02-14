const getId = (form) => {
  const idType = `${form}Id`;
  let id;
  if (location && location.state && location.state[idType]) {
    id = location.state[idType];
  } else if (history && history.state && history.state.state && history.state.state[idType]) {
    id = history.state.state[idType];
  } else if (JSON.parse(sessionStorage.getItem('formData')).id) {
    id = JSON.parse(sessionStorage.getItem('formData')).id;
  }
  return id;
};

export default getId;
