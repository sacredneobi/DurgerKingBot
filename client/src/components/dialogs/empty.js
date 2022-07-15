import { DialogTitle } from "@mui/material";
import IconButton from "../iconButton";

const Default = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton textIcon="close" edge={false} onClick={onClose} />
      ) : null}
    </DialogTitle>
  );
};

export default Default;
