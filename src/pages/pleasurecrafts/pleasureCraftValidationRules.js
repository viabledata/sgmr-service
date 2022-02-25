const pleasureCraftValidationRules = [
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
  {
    inputField: 'registration',
    errorDisplayId: 'registration',
    type: 'required',
    message: 'You must select an option for the pleasure craft registration number',
  },
  {
    inputField: 'ais',
    errorDisplayId: 'ais',
    type: 'required',
    message: 'You must specify if the pleasure craft has an AIS',
  },
  {
    inputField: 'mmsi',
    errorDisplayId: 'mmsi',
    type: 'required',
    message: 'You must specify if the pleasure craft has a MMSI',
  },
  {
    inputField: 'callsign',
    errorDisplayId: 'callsign',
    type: 'required',
    message: 'You must specify if the pleasure craft has a call sign',
  },
];

export default pleasureCraftValidationRules;
