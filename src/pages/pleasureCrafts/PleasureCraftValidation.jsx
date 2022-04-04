const pleasureCraftValidation = {
  page1: [
    {
      inputField: 'pleasureCraftName',
      errorDisplayId: 'pleasureCraftName',
      type: 'required',
      message: 'You must enter a pleasure craft name',
    },
    {
      inputField: 'pleasureCraftType',
      errorDisplayId: 'pleasureCraftType',
      type: 'required',
      message: 'You must select a type of pleasure craft',
    },
  ],
};

export default pleasureCraftValidation;
