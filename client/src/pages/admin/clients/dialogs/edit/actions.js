import { memo } from "react";
import { Divider, Button } from "@components";
import { DialogActions as MUIDialogActions } from "@mui/material";
import { areEqualObject } from "@utils";

const Default = memo((props) => {
  const { onClose, handleOnSave, disabled } = props;

  const actions = [
    { onClick: handleOnSave, caption: "Save", disabled },
    {
      onClick: onClose,
      disabled: false,
      caption: "Cancel",
      variant: "contained",
      color: "error",
    },
  ];

  return (
    <>
      <Divider />
      <MUIDialogActions>
        {actions.map((item, index) => {
          return (
            <Button
              key={index}
              onClick={item.onClick}
              disabled={item.disabled}
              color={item.color ? item.color : "primary"}
              variant={item.variant ? item.variant : "outlined"}
            >
              {item.caption}
            </Button>
          );
        })}
      </MUIDialogActions>
    </>
  );
}, areEqualObject);

export default Default;
