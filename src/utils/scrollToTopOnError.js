const scrollToTopOnError = (errors) => {
  if (Object.keys(errors).length > 0) {
    window.scrollTo(0, 0);
  }
};

export default scrollToTopOnError;
