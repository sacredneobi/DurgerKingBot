import { Toolbar } from "@mui/material";

const Default = (props) => {
  const { children, sx, ...other } = props;

  return (
    <Toolbar sx={{ ...sx }} {...other}>
      {children}
    </Toolbar>
  );
};

export default Default;
