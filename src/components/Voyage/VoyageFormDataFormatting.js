import { formatDate } from '@utils/date';

const formatDepartureArrival = (status, data) => {
  const dataList = {
    status,
  };

  if (data.departureDateYear) { // format departure date.toString()
    dataList.departureDate = formatDate(data.departureDateYear, data.departureDateMonth, data.departureDateDay);
  }

  if (data.departureTimeHour) { // format departure time
    if (String(data.departureTimeHour).length > 0 && String(data.departureTimeMinute).length > 0) {
      dataList.departureTime = `${data.departureTimeHour}:${data.departureTimeMinute}`;
    }
  }

  if (data.arrivalDateYear) { // format arrival date
    dataList.arrivalDate = formatDate(data.arrivalDateYear, data.arrivalDateMonth, data.arrivalDateDay);
  }

  if (data.arrivalTimeHour) { // format arrival time
    if (String(data.arrivalTimeHour).length > 0 && String(data.arrivalTimeMinute).length > 0) {
      dataList.arrivalTime = `${data.arrivalTimeHour}:${data.arrivalTimeMinute}`;
    }
  }

  Object.entries(data).map((item) => {
    if (item[0] === 'departurePort' && !item[1]) { // null value departure port
      dataList.departurePort = 'ZZZD';
    } else if (item[0] === 'arrivalPort' && !item[1]) { // null value arrival port
      dataList.arrivalPort = 'ZZZA';
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

const formatNewPerson = (status, data) => {
  const dataList = {
    status,
    people: [
      {
        firstName: data.firstName,
        lastName: data.lastName,
        documentType: data.documentType,
        documentNumber: data.documentNumber,
        documentExpiryDate: formatDate(data.documentExpiryDateYear, data.documentExpiryDateMonth, data.documentExpiryDateDay),
        documentIssuingState: data.documentIssuingState,
        peopleType: data.peopleType,
        gender: data.gender,
        dateOfBirth: formatDate(data.dateOfBirthYear, data.dateOfBirthMonth, data.dateOfBirthDay),
        placeOfBirth: data.placeOfBirth,
        nationality: data.nationality,
      },
    ],
  };
  return dataList;
};

const formatPerson = (data) => {
  const dataList = {
    firstName: data.firstName,
    lastName: data.lastName,
    documentType: data.documentType,
    documentNumber: data.documentNumber,
    documentExpiryDate: data.documentExpiryDate,
    documentIssuingState: data.documentIssuingState,
    peopleType: data.peopleType.name,
    gender: data.gender,
    dateOfBirth: data.dateOfBirth,
    placeOfBirth: data.placeOfBirth,
    nationality: data.nationality,
  };
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
  formatNewPerson,
  formatPerson,
  formatResponsiblePerson,
  formatVessel,
};
