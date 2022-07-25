import { Box } from "../../components";
import { useContext } from "react";
import Item from "./item";
import Header from "./header";
import Bottom from "./bottom";
import { ShoppingCart } from "../../context";

const Default = (props) => {
  const { show, ...other } = props;

  const shoppingCart = useContext(ShoppingCart);

  const handleOnClick = () => {
    // setShow((prev) => !prev);
  };
  return (
    <Box
      sx={{
        opacity: show ? 1 : 0,
        display: show ? "block" : "none",
        visibility: show ? "visible" : "hidden",
        maxHeight: show ? "100vh" : 0,
        height: show ? "100vh" : 0,
        transition: "all 0.3s ease-out",
        flexDirection: "column",
        width: "100%",
        overflow: "auto",
        backgroundColor: "#ebedf0",
        color: "#000",
      }}
      onClick={handleOnClick}
    >
      <Header {...other} />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "#fff",
          paddingBottom: 2,
        }}
      >
        {shoppingCart
          .filter((item) => item.count > 0)
          .map((item, index, arr) => (
            <Item key={index} {...item} isLast={arr.length - 1 === index} />
          ))}
      </Box>
      <Bottom />
    </Box>
  );
};

export default Default;
