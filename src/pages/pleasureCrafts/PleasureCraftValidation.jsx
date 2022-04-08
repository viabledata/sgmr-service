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
  page2: [
    {
      inputField: 'pleasureCraftRegistrationNumber',
      errorDisplayId: 'pleasureCraftRegistrationNumber',
      type: 'required',
      message: 'You must enter a pleasure craft registration number',
    },
    {
      inputField: 'pleasureCraftRegistrationCountry',
      errorDisplayId: 'pleasureCraftRegistrationCountry',
      type: 'required',
      message: 'You must enter a pleasure craft country of registration',
    },
  ],
};

export default pleasureCraftValidation;
