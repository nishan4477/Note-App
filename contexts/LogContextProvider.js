"use client";

import React, { createContext, useState, useEffect, useContext } from "react";

export const logContext = createContext(null);

export default function LogContextProvider({ children }) {
  const [isLogIn, setIsLogIn] = useState(false);
  const[isPop,setIsPop] = useState(false)
  useEffect(() => {
    console.log("called");
    const data = window.localStorage.getItem("isLogIn");
    if (data) {
      setIsLogIn(JSON.parse(data));
    }
  }, []);

  return (
    <logContext.Provider
      value={{
        isLogIn,
        setIsLogIn,
      }}
    >
      {children}
    </logContext.Provider>
  );
}

export function useLogContext() {
  const context = useContext(logContext);
  if (!context) {
    throw new Error("useLog must be used within the LogContextProvider ");
  }

  return context;
}
