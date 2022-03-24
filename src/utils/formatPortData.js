const formatPortValue = (data, type) => {
  if (!data[`${type}Port`]) {
    return data[`${type}PortName`];
  }
  if (data[`${type}Port`] && data[`${type}PortName`]) {
    return `${data[`${type}PortName`]} (${data[`${type}Port`]})`;
  }
};

export default formatPortValue;
