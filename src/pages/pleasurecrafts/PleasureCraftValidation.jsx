const pleasureCraftValidationRules = {
  page1: [
    {
      inputField: 'vesselName',
      errorDisplayId: 'vesselName',
      type: 'required',
      message: 'You must enter a pleasure craft name',
    },
    {
      inputField: 'vesselType',
      errorDisplayId: 'vesselType',
      type: 'required',
      message: 'You must enter a pleasure craft type',
    },
  ],
  page2: [
    {
      inputField: 'hasRegistration',
      errorDisplayId: 'hasRegistration',
      type: 'required',
      message: 'You must select an option for the pleasure craft registration number',
    },
    {
      inputField: 'registration',
      errorDisplayId: 'registration',
      visibilityIndicator: 'registrationYes',
      type: 'requiredOnVisible',
      message: 'You must enter the pleasure craft registration number',
    },
    {
      inputField: 'nationality',
      errorDisplayId: 'nationality',
      visibilityIndicator: 'registrationYes',
      type: 'requiredOnVisible',
      message: 'You must enter the pleasure craft nationality',
    },
    {
      inputField: 'ais',
      errorDisplayId: 'ais',
      type: 'required',
      message: 'You must specify if the pleasure craft has an AIS',
    },
    {
      inputField: 'hasMMSI',
      errorDisplayId: 'hasMMSI',
      type: 'required',
      message: 'You must specify if the pleasure craft has a MMSI',
    },
    {
      inputField: 'mmsi',
      errorDisplayId: 'mmsi',
      visibilityIndicator: 'mmsiYes',
      type: 'requiredOnVisible',
      message: 'You must enter the pleasure craft MMSI',
    },
    {
      inputField: 'hasCallsign',
      errorDisplayId: 'hasCallsign',
      type: 'required',
      message: 'You must specify if the pleasure craft has a call sign',
    },
    {
      inputField: 'callsign',
      errorDisplayId: 'callsign',
      visibilityIndicator: 'callsignYes',
      type: 'requiredOnVisible',
      message: 'You must enter the pleasure craft call sign',
    },
  ],
};

export default pleasureCraftValidationRules;
