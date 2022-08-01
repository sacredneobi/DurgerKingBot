import React, { createContext, useContext } from "react";
import { User } from "@data";

const context = createContext({ data: new User() });

const useDefContext = () => {
  return useContext(context);
};

const Context = (props) => {
  return (
    <context.Provider value={{ data: new User() }} name="USERS CONTEXT">
      {props.children}
    </context.Provider>
  );
};

export { Context, useDefContext };
