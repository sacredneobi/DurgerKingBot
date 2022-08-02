import { createContext } from "react";
const contextSelect = createContext([]);

const Default = (props) => {
  return (
    <contextSelect.Provider value={[]}>{props.children}</contextSelect.Provider>
  );
};

export { contextSelect };

export default Default;
