import { Text, Box, Button } from "@components";
import { isFunc } from "@utils";
import styles from "./styles";

const Default = (props) => {
  const { setShow, showShoppingCart } = props;

  const handleOnClick = () => {
    isFunc(setShow, false);
    isFunc(showShoppingCart, true);
  };
  return (
    <Box sx={styles.rootHeader}>
      <Text caption="YOUR ORDER" variant="h6" gutterBottom />
      <Button
        caption="Edit..."
        color="secondary"
        variant="default"
        onClick={handleOnClick}
        sx={styles.headerButton}
      />
    </Box>
  );
};

export default Default;
