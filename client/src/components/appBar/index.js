import { AppBar } from "@mui/material";

const Default = (props) => {
  const { children, sx, ...other } = props;

  return (
    <AppBar sx={{ height: 100, ...sx }} {...other}>
      {children}
    </AppBar>
  );
};

export default Default;
