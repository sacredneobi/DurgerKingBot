import { List } from "@mui/material";

const Default = (props) => {
  const { children, ...other } = props;

  return <List {...other}>{children}</List>;
};

export default Default;
