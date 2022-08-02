import { memo } from "react";
import { ShoppingCart } from "@context";
import Container from "./container";
import { areEqualAlways } from "@utils";

export default memo((props) => {
  let data;
  try {
    data = localStorage.getItem("shoppingCart")
      ? JSON.parse(localStorage.getItem("shoppingCart"))
      : [];
  } catch {
    data = [];
  }

  return (
    <ShoppingCart.Provider value={data.filter((item) => item.count > 0)}>
      <Container {...props} />
    </ShoppingCart.Provider>
  );
}, areEqualAlways);
