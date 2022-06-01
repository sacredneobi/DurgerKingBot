import { IconButton } from "@mui/material";
import Icon from "../icon";

const Default = (props) => {
  const { help = "button", textIcon, icon, onClick, children, ...other } = props;
  const MyIcon = icon;

  const handleOnClick = (event) => {
    if (typeof onClick === "function") {
      onClick(event);
    }
  };

  return (
    <IconButton
      color="inherit"
      aria-label={help}
      edge="start"
      onClick={handleOnClick}
      sx={{
        marginRight: 5,
      }}
      {...other}
    >
      {icon && <MyIcon />}
      {textIcon && <Icon textIcon={textIcon} />}
      {children}
    </IconButton>
  );
};

export default Default;
