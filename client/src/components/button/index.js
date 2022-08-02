import { Button } from "@mui/material";
import Icon from "../icon";

const Default = (props) => {
  const { icon, textIcon, caption, children, ...other } = props;

  const RenderIcon = icon;

  return (
    <Button variant="contained" endIcon={icon ? RenderIcon : null} {...other}>
      {textIcon ? <Icon textIcon={textIcon} sx={{ fontSize: 35 }} /> : null}
      {caption}
      {children}
    </Button>
  );
};

export default Default;
