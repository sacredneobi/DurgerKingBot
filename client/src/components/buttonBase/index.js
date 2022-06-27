import { ButtonBase } from "@mui/material";

export default (props) => {
  return <ButtonBase {...props}>{props.children}</ButtonBase>;
};
