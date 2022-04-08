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
    {
      inputField: 'pleasureCraftMooring',
      errorDisplayId: 'pleasureCraftMooring',
      type: 'required',
      message: 'You must enter a usual mooring location',
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
      inputField: 'registrationCountry',
      errorDisplayId: 'registrationCountry',
      type: 'required',
      message: 'You must select if you have a pleasure craft country of registration',
    },
    {
      inputField: 'registrationCountryName',
      errorDisplayId: 'registrationCountry',
      type: 'requiredOnVisible',
      visibilityIndicator: 'registrationCountryYes',
      message: 'You must enter a pleasure craft country of registration',
    },
    {
      inputField: 'pleasureCraftAIS',
      errorDisplayId: 'pleasureCraftAIS',
      type: 'required',
      message: 'You must select if you have a pleasure craft AIS',
    },
    {
      inputField: 'pleasureCraftMMSI',
      errorDisplayId: 'pleasureCraftMMSI',
      type: 'required',
      message: 'You must select if you have a pleasure craft MMSI number',
    },
    {
      inputField: 'pleasureCraftMMSINumber',
      errorDisplayId: 'pleasureCraftMMSI',
      type: 'requiredOnVisible',
      visibilityIndicator: 'pleasureCraftMMSIYes',
      message: 'You must enter a pleasure craft MMSI number',
    },
    {
      inputField: 'callSign',
      errorDisplayId: 'callSign',
      type: 'required',
      message: 'You must select if you have a pleasure craft call sign',
    },
    {
      inputField: 'callSignReference',
      errorDisplayId: 'callSignReference',
      type: 'requiredOnVisible',
      visibilityIndicator: 'callSignYes',
      message: 'You must enter a pleasure craft call sign',
    },
  ],
};

export default pleasureCraftValidation;
