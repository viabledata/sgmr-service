const validate = async (rules, data) => {
  const errors = {};
  if (rules) {
    const promises = rules.map((rule) => {
      return new Promise((resolve) => {
        const value = data[rule.inputField];
        switch (rule.type) {
          case 'pattern':
            if (value && !rule.pattern.test(value)) {
              return { [rule.errorDisplayId]: rule.message };
            }
            break;
          case 'async':
            if (value) {
              rule.callback(value, data).then((valid) => {
                if (!valid) {
                  resolve({ [rule.errorDisplayId]: rule.message });
                } else {
                  resolve(undefined);
                }
              });
            } else {
              resolve(undefined);
            }
            break;
          case 'required':
            if (value === '' || !value) {
              resolve({ [rule.errorDisplayId]: rule.message });
            } else {
              resolve(undefined);
            }
            break;
          case 'requiredOnVisible':
            if (Object.values(data).includes(rule.visibilityIndicator)) {
              if (value === '' || !value) {
                resolve({ [rule.errorDisplayId]: rule.message });
              } else {
                resolve(undefined);
              }
            } else {
              resolve(undefined);
            }
            break;
          default:
        }
      });
    });

    const results = await Promise.all(promises);
    return results.filter(Boolean).reduce((acc, error) => {
      if (error) {
        return {
          ...error,
          ...acc,
        };
      }
    }, {});
  }
  return errors;
};

export default validate;
