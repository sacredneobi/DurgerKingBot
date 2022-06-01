import { CssBaseline } from "@mui/material";

const Default = (props) => {
  const { ...other } = props;

  return <CssBaseline {...other} />;
};

export default Default;
