import { Divider } from "@mui/material";

const Default = (props) => {
  const { ...other } = props;

  return <Divider {...other} />;
};

export default Default;
