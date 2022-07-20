import React, { createContext, useContext } from "react";
import { Clients } from "@data";

const context = createContext(null);

const useDefContext = () => {
  return useContext(context);
};

const Context = (props) => {
  return (
    <context.Provider value={{ dialog: new Clients() }} name="Clients CONTEXT">
      {props.children}
    </context.Provider>
  );
};

export { Context, useDefContext };
