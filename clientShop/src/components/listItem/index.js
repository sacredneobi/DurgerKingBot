import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Icon from "../icon";
import { Link, useLocation } from "react-router-dom";
import { Path } from "path-parser";

const VariantListItem = (props) => {
  const { to, ...other } = props;

  const location = useLocation();

  if (to) {
    const path = new Path(`/${to}`);
    return (
      <ListItem
        button
        to={to}
        component={Link}
        {...other}
        selected={path.partialTest(location.pathname) ? true : false}
      />
    );
  }
  return <ListItem {...other} />;
};

const Default = (props) => {
  const { textIcon, text, open, children, to, ...other } = props;

  return (
    <VariantListItem
      disablePadding
      to={to}
      sx={{ display: "block" }}
      {...other}
    >
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
    </VariantListItem>
  );
};

export default Default;
