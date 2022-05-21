import { Box } from "@mui/material";

const Default = (props) => {
  const { children, ...other } = props;

  return <Box {...other}>{children}</Box>;
};

export default Default;
