import { useState } from "react";
import { List, Collapse } from "@mui/material";

const Default = (props) => {
  const {
    children,
    level = 0,
    isOpen = false,
    collapse,
    rootItem,
    ...other
  } = props;

  const [open, setOpen] = useState(isOpen);

  const handleOnClick = (event) => {
    setOpen((prev) => !prev);
    event.preventDefault();
  };

  if (collapse) {
    return (
      <>
        {typeof rootItem === "function"
          ? rootItem({ onClick: handleOnClick, rootOpen: open })
          : null}
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List sx={{ paddingLeft: level }} {...other}>
            {children}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <List sx={{ paddingLeft: level }} {...other}>
      {children}
    </List>
  );
};

export default Default;
