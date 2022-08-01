import React, { createContext, useContext } from "react";
import { Articles } from "@data";

const context = createContext(null);

const useDefContext = () => {
  return useContext(context);
};

const Context = (props) => {
  return (
    <context.Provider value={{ dialog: new Articles() }} name="USERS CONTEXT">
      {props.children}
    </context.Provider>
  );
};

export { Context, useDefContext };
