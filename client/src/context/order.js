import React, { createContext, useContext } from "react";
import { Order as Data } from "@data";
import Select from "./defaultSelect";

const context = createContext(null);

const useDefContext = () => {
  return useContext(context);
};

const Context = (props) => {
  return (
    <Select>
      <context.Provider value={{ dialog: new Data() }} name="ORDER CONTEXT">
        {props.children}
      </context.Provider>
    </Select>
  );
};

export { Context, useDefContext };
