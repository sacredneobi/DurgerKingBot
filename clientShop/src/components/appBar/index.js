import { AppBar } from "@mui/material";

const Default = (props) => {
  const { children, ...other } = props;

  return <AppBar {...other}>{children}</AppBar>;
};

export default Default;
