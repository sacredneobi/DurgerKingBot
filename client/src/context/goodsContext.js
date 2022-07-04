import React, { createContext, useContext } from "react";
import Store from "@data/goodsStore";

const context = createContext(null);

const useDefContext = () => {
  return useContext(context);
};

const Context = (props) => {
  return (
    <context.Provider value={{ dialog: new Store() }} name="GOODS CONTEXT">
      {props.children}
    </context.Provider>
  );
};

export { Context, useDefContext };
