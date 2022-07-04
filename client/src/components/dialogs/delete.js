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
  const { useContext, propsContext, caption, onDelete } = props;

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
        onDelete(dialog.data);
      }
    };

    let text = "Удалить элементы ?";
    if (typeof dialog?.data?.onGetText === "function") {
      text = dialog.data.onGetText();
    }

    return (
      <Dialog open>
        <DialogTitle id="alert-dialog-title">{caption}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ whiteSpace: "pre-line" }}
          >
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOnDelete} color="error" variant="contained">
            Delete
          </Button>
          <Button onClick={handleOnClose} autoFocus variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
});
