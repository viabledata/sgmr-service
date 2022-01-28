import React, { createContext, useState } from 'react';

export const AlertContext = createContext({});

export const AlertContextProvider = ({ children }) => {
  const [alertContext, setAlertContext] = useState(null);

  return (
    <AlertContext.Provider value={{ alertContext, setAlertContext }}>
      {children}
    </AlertContext.Provider>
  );
};
