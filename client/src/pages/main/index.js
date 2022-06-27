import { memo } from "react";
import { ShoppingCart } from "@context";
import Container from "./container";

function areEqual(prev, next) {
  return true;
}

const Main = memo((props) => {
  const data = localStorage.getItem("shoppingCart")
    ? JSON.parse(localStorage.getItem("shoppingCart"))
    : [];

  return (
    <ShoppingCart.Provider
      value={data.filter((item) => item.count > 0)}
      name="MAIN CONTEXT"
    >
      <Container {...props} />
    </ShoppingCart.Provider>
  );
}, areEqual);

export default Main;
