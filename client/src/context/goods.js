import React, { createContext, useContext } from "react";
import { Goods } from "@data";
import Select from "./defaultSelect";

const context = createContext(null);

const useDefContext = () => {
  return useContext(context);
};

const Context = (props) => {
  return (
    <Select>
      <context.Provider value={{ dialog: new Goods() }} name="GOODS CONTEXT">
        {props.children}
      </context.Provider>
    </Select>
  );
};

export { Context, useDefContext };
