import React, { createContext, useContext } from "react";
import { Orders } from "@data";

const context = createContext(null);

const useDefContext = () => {
  return useContext(context);
};

const Context = (props) => {
  return (
    <context.Provider value={{ dialog: new Orders() }} name="orders CONTEXT">
      {props.children}
    </context.Provider>
  );
};

export { Context, useDefContext };
