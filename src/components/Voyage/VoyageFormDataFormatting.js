import { formatDate } from '@utils/date';

const VoyageFormDataFormatting = (id, status, data) => {
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
      dataList[fieldName] = (`${data[`${fieldName}Hour`]}:${data[`${fieldName}Minute`]}`);
    }

    // If this is a date or time field ignore them as they're handled above
    if (item[0].search(/month/i) === -1 && item[0].search(/day/i) === -1 && item[0].search(/minute/i) === -1
    && item[0].search(/year/i) === -1 && item[0].search(/hour/i) === -1) {
      // Add other fields to the dataList
      dataList[item[0]] = item[1];
    }
  });

  return dataList;
};

export default VoyageFormDataFormatting;
