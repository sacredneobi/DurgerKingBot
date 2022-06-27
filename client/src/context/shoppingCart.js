import { createContext } from "react";
import { convertToPrice } from "@utils";
const Default = createContext([]);

const notEmpty = (shoppingCart) => {
  return shoppingCart.filter((item) => item.count > 0).length > 0;
};

const filter = (shoppingCart) => {
  return shoppingCart.filter((item) => item.count > 0);
};

const calcSum = (shoppingCart) => {
  return convertToPrice(
    shoppingCart.reduce((prev, next) => prev + next.sale * next.count, 0)
  );
};

export { notEmpty, filter, calcSum };

export default Default;
