const pleasureCraftValidation = {
  page1: [
    {
      inputField: 'pleasureCraftName',
      errorDisplayId: 'pleasureCraftName',
      type: 'required',
      message: 'You must enter a pleasure craft name',
    },
    {
      inputField: 'type',
      errorDisplayId: 'type',
      type: 'required',
      message: 'You must select a type of pleasure craft',
    },
    {
      inputField: 'mooring',
      errorDisplayId: 'mooring',
      type: 'required',
      message: 'You must enter a usual mooring location',
    },
  ],
  page2: [
    {
      inputField: 'registrationNumber',
      errorDisplayId: 'registrationNumber',
      type: 'required',
      message: 'You must enter a registration number',
    },
    {
      inputField: 'registrationCountry',
      errorDisplayId: 'registrationCountry',
      type: 'required',
      message: 'You must select if your pleasure craft has acountry of registration',
    },
    {
      inputField: 'registrationCountryName',
      errorDisplayId: 'registrationCountry',
      type: 'requiredOnVisible',
      visibilityIndicator: 'registrationCountryYes',
      message: 'You must enter a country of registration',
    },
    // { // Waiting on API update:
    //   inputField: 'pleasureCraftAIS',
    //   errorDisplayId: 'pleasureCraftAIS',
    //   type: 'required',
    //   message: 'You must select if you have a pleasure craft AIS',
    // },
    // {
    //   inputField: 'pleasureCraftMMSI',
    //   errorDisplayId: 'pleasureCraftMMSI',
    //   type: 'required',
    //   message: 'You must select if you have a pleasure craft MMSI number',
    // },
    // {
    //   inputField: 'pleasureCraftMMSINumber',
    //   errorDisplayId: 'pleasureCraftMMSI',
    //   type: 'requiredOnVisible',
    //   visibilityIndicator: 'pleasureCraftMMSIYes',
    //   message: 'You must enter a pleasure craft MMSI number',
    // },
    {
      inputField: 'callSign',
      errorDisplayId: 'callSign',
      type: 'required',
      message: 'You must select if the pleasure craft has a call sign',
    },
    {
      inputField: 'callSignReference',
      errorDisplayId: 'callSign',
      type: 'requiredOnVisible',
      visibilityIndicator: 'callSignYes',
      message: 'You must enter a call sign',
    },
  ],
};

export default pleasureCraftValidation;
