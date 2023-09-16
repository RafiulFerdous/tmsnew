import React, { useState } from "react";

let initial_login = {
  status: null,
  token: null,
  expiration: null,
  all_user_list: {
    employeE_ID: null,
    employeE_NAME: null,
    employeE_USER_ID: null,
    employeE_PASSWORD: null,
    employeE_ADDRESS: null,
    employeE_ZONE: null,
    employeE_DEGIGNATION: null,
    employeE_TYPE: null,
    employeE_CONTACT: null,
    employeE_EMERGENCY_CONTACT: null,
    employeE_EMAIL: null,
    employeE_CREATION_DATE: null,
  },
};

export const LoginContext = React.createContext();

export const LoginContextProvider = ({ children }) => {
  const [loginInformation, setloginInformation] = useState(initial_login);
  return (
    <LoginContext.Provider value={{ loginInformation, setloginInformation }}>
      {children}
    </LoginContext.Provider>
  );
};
