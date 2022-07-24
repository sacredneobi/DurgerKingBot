import { DialogTitle, Divider } from "@components";
import { Dialog } from "@mui/material";
import Container from "./container";

const Default = (props) => {
  return (
    <Dialog open fullWidth maxWidth="md">
      <DialogTitle onClose={props?.onClose}>
        {props.id ? "Edit good" : "Create good"}
      </DialogTitle>
      <Divider />
      <Container {...props} />
    </Dialog>
  );
};

export default Default;
