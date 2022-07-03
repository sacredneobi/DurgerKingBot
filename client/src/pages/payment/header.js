import { Typography, Button } from "@mui/material";
import { Box } from "../../components";
import { isFunc } from "@utils/";

const Default = (props) => {
  const { setShow, showShoppingCart } = props;

  const handleOnClick = () => {
    isFunc(setShow, false);
    isFunc(showShoppingCart, true);
  };
  return (
    <Box
      sx={{
        padding: 2.5,
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        color: "#000",
      }}
    >
      <Typography variant="h6" gutterBottom component="div">
        YOUR ORDER
      </Typography>
      <Button
        color="secondary"
        onClick={handleOnClick}
        sx={{ textTransform: "none" }}
      >
        Edit...
      </Button>
    </Box>
  );
};

export default Default;
