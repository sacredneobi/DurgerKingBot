import { useState } from "react";
import { List, Collapse } from "@mui/material";
import { useMatch, useResolvedPath } from "react-router-dom";

const Default = (props) => {
  const {
    children,
    level = 0,
    isOpen = false,
    collapse,
    rootItem,
    to,
    ...other
  } = props;

  let isRenderOpen = isOpen;

  if (to) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });
    let match2 = useMatch({ path: resolved.pathname, end: false });

    isRenderOpen = !match && match2 ? true : isRenderOpen;
  }

  const [open, setOpen] = useState(isRenderOpen);

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
        <Collapse in={open} timeout="auto">
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
