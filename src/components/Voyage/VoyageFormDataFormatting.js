import { formatDate } from '@utils/date';

const formatDepartureArrival = (status, data) => {
  const dataList = {
    status,
  };

  Object.entries(data).map((item) => {
    // If this is a date item, reformat to a single item
    if (item[0].search(/year/i) > 0) {
      const fieldName = item[0].slice(0, (item[0].length - 4));
      dataList[fieldName] = formatDate(data[`${fieldName}Year`], data[`${fieldName}Month`], data[`${fieldName}Day`]);
    }

    // If this is a time item, reformat to a single item
    if (item[0].search(/hour/i) > 0) {
      const fieldName = item[0].slice(0, (item[0].length - 4));
      // If hour or minute are not null then add, else, skip the time field
      if (`${data[`${fieldName}Hour`]}`.length > 0 && `${data[`${fieldName}Minute`]}`.length > 0) {
        dataList[fieldName] = (`${data[`${fieldName}Hour`]}:${data[`${fieldName}Minute`]}`);
      }
    }

    if (
      item[0].search(/year/i) === -1 // it's not the year part of the date (handed above)
          && item[0].search(/month/i) === -1 // it's not the month part of the date (handed above)
          && item[0].search(/day/i) === -1 // it's not the day part of the date (handled above)
          && item[0].search(/hour/i) === -1 // it's not the hour part of the time
          && item[0].search(/minute/i) === -1 // it's not the minute part of the time
          && item[1] // it's value is not null
          && item[0] !== 'id' // it's not the id field
          && typeof item[1] !== 'object' // it's not something being passed in obj form to us from an existing voyage
    ) {
      // Then add it to dataList
      dataList[item[0]] = item[1];
    }
  });
  return dataList;
};


const formatResponsiblePerson = (status, data, voyageData) => {
  const dataList = {
    status,
  };

  Object.entries(voyageData).map((item) => {
    if (
      item[0].search(/responsible/i) >= 0 // if item is a 'responsible' field
      && data[item[0]] !== item[1] // and value from voyageData !== value from form
    ) {
      // then add it to dataList
      dataList[item[0]] = data[item[0]];
    }
  });
  return dataList;
};

const formatVessel = (status, data, voyageData) => {
  const dataList = {
    status,
  };

  Object.entries(voyageData).map((item) => {
    if (
      (item[0].search(/vessel/i) >= 0 // if item is a 'vessel' field
        || item[0] === 'hullIdentificationNumber' // or one of the other vessel fields that don't contain 'vessel'
        || item[0] === 'registration'
        || item[0] === 'moorings'
        || item[0] === 'callsign'
      )
      && data[item[0]] !== item[1] // and value from voyageData !== value from form
    ) {
      // then add it to dataList
      dataList[item[0]] = data[item[0]];
    }
  });

  return dataList;
};

export {
  formatDepartureArrival,
  formatResponsiblePerson,
  formatVessel,
};
