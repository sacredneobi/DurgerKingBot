import { IconButton } from "@mui/material";
import Icon from "../icon";
import { isFunc } from "@utils";

const Default = (props) => {
  const {
    help = "button",
    textIcon,
    icon,
    onClick,
    children,
    iconSx,
    edge,
    ...other
  } = props;
  const MyIcon = icon;

  const handleOnClick = (event) => {
    isFunc(onClick, event);
  };

  const style =
    edge !== "start"
      ? null
      : {
          marginRight: 5,
        };

  return (
    <IconButton
      color="inherit"
      aria-label={help}
      edge={edge}
      onClick={handleOnClick}
      sx={style}
      {...other}
    >
      {icon && <MyIcon />}
      {textIcon && <Icon textIcon={textIcon} sx={{ ...iconSx }} />}
      {children}
    </IconButton>
  );
};

export default Default;
