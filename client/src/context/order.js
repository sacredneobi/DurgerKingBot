import React, { createContext, useContext } from "react";
import { Order as Data } from "@data";

const context = createContext(null);

const useDefContext = () => {
  return useContext(context);
};

const Context = (props) => {
  return (
    <context.Provider value={{ dialog: new Data() }} name="ORDER CONTEXT">
      {props.children}
    </context.Provider>
  );
};

export { Context, useDefContext };
