import { Typography, Button } from "@mui/material";
import { Box } from "../../components";

const Default = (props) => {
  const { setShow, showShoppingCart } = props;

  const handleOnClick = () => {
    if (typeof setShow === "function") {
      setShow(false);
    }
    if (typeof showShoppingCart === "function") {
      showShoppingCart(true);
    }
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
