import React, { createContext, useContext } from "react";
import { Goods } from "@data";

const context = createContext(null);

const useDefContext = () => {
  return useContext(context);
};

const Context = (props) => {
  return (
    <context.Provider value={{ dialog: new Goods() }} name="GOODS CONTEXT">
      {props.children}
    </context.Provider>
  );
};

export { Context, useDefContext };
