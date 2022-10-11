import React, { useState, createContext, useEffect } from "react";

export const FacturasContext = createContext(null);

const FacturasProvider = (props) => {


  return (
    <FacturasContext.Provider
      value={{

      }}
    >
      {props.children}
    </FacturasContext.Provider>
  );
};

export default FacturasProvider;
