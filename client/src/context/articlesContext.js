import React, { createContext, useContext } from "react";
import Store from "@data/articlesStore";

const context = createContext(null);

const useDefContext = () => {
  return useContext(context);
};

const Context = (props) => {
  return (
    <context.Provider value={{ dialog: new Store() }} name="ARTICLES CONTEXT">
      {props.children}
    </context.Provider>
  );
};

export { Context, useDefContext };
