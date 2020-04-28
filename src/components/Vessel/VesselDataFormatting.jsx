const VesselDataFormatting = (status, formData, storedData) => {
  let dataList = {};
  if (status !== 'na') { dataList = { status }; }

  Object.entries(storedData).map((item) => {
    if (
      (item[0].search(/vessel/i) >= 0 // if item is a 'vessel' field
        || item[0] === 'hullIdentificationNumber' // or one of the other vessel fields that don't contain 'vessel'
        || item[0] === 'registration'
        || item[0] === 'moorings'
        || item[0] === 'callsign'
        || item[0] === 'portOfRegistry'
      )
      && formData[item[0]] !== item[1] // and value from storedData !== value from form
    ) {
      // then add it to dataList
      dataList[item[0]] = formData[item[0]];
      // if the fields listed below haven't changed, send them with their original value
    } else if (item[0] === 'vesselName'
        || item[0] === 'registration'
        || item[0] === 'moorings'
        || item[0] === 'vesselType'
    ) {
      dataList[item[0]] = item[1];
    }
  });

  return dataList;
};

export default VesselDataFormatting;
