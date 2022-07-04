import {
  Button,
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { observer } from "mobx-react-lite";

export default observer((props) => {
  const { useContext, propsContext, onDelete } = props;

  if (!propsContext || !useContext) {
    return null;
  }

  const fnClose = `set${Array.prototype.map
    .call(propsContext, (item, index) =>
      index === 0 ? item.toUpperCase() : item
    )
    .join("")}`;

  const { dialog = {} } = useContext ? useContext() : {};

  if (dialog[propsContext]) {
    const handleOnClose = () => {
      if (typeof dialog[fnClose] === "function") {
        dialog[fnClose](false);
      }
    };

    const handleOnDelete = (item) => {
      handleOnClose();
      if (typeof onDelete === "function") {
        onDelete(dialog.data.select.map((item) => item.id));
      }
      if (typeof dialog.data.onClear === "function") {
        dialog.data.onClear();
      }
    };

    return (
      <Dialog open onClose={handleOnClose}>
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ whiteSpace: "pre-line" }}
          >
            {dialog.data.select.map((item) => item.caption).join(",\n")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOnDelete}>Delete</Button>
          <Button onClick={handleOnClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
});
