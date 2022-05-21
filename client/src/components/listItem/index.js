import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Icon from "../icon";

const Default = (props) => {
  const { textIcon, text, open, children, ...other } = props;

  return (
    <ListItem disablePadding sx={{ display: "block" }} {...other}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
        }}
      >
        {textIcon && (
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <Icon textIcon={textIcon} />
          </ListItemIcon>
        )}
        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
      {children}
    </ListItem>
  );
};

export default Default;
