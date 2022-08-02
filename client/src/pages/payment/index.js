import { Box } from "@components";
import { useContext } from "react";
import Item from "./item";
import Header from "./header";
import Bottom from "./bottom";
import { ShoppingCart } from "@context";
import styles from "./styles";

const Default = (props) => {
  const { show, ...other } = props;

  const shoppingCart = useContext(ShoppingCart);

  return (
    <Box sx={styles.root(show)}>
      <Header {...other} />
      <Box sx={styles.rootGrid}>
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
