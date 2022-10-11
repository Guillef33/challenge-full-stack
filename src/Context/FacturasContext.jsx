import React, { useState, createContext, useEffect } from "react";

export const FacturasContext = createContext(null);

const FacturasProvider = (props) => {


  return (
    <UserContext.Provider
      value={{

      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default FacturasProvider;
