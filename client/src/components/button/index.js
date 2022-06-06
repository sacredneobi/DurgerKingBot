import { Button } from "@mui/material";

const Default = (props) => {
  const { icon, ...other } = props;

  const Icon = icon;

  return <Button variant="contained" endIcon={icon ? Icon : null} {...other} />;
};

export default Default;
