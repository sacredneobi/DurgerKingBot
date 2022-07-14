import {
  Button,
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import Divider from "../divider";

const Default = (props) => {
  const { caption, container = null, actions = [], ...other } = props;

  const dialogActions = actions.map((item, index) => {
    return (
      <Button
        key={index}
        onClick={item.onClick}
        color={item.color ? item.color : "primary"}
        variant={item.variant ? item.variant : "outlined"}
      >
        {item.caption}
      </Button>
    );
  });

  return (
    <Dialog open {...other}>
      <DialogTitle>{caption}</DialogTitle>
      <DialogContent>{container}</DialogContent>
      {actions.length > 0 ? <Divider /> : null}
      <DialogActions>{dialogActions}</DialogActions>
    </Dialog>
  );
};

export default Default;
