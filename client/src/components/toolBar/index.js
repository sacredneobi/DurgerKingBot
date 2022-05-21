import { Toolbar } from "@mui/material";

const Default = (props) => {
  const { children, sx, ...other } = props;

  return (
    <Toolbar sx={{ height: 100, ...sx }} {...other}>
      {children}
    </Toolbar>
  );
};

export default Default;
