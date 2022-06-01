const rootBox = {
  padding: (theme) => theme.spacing(0.75),
  margin: (theme) => theme.spacing(0.75),
};

const rootTypography = {
  variant: "button",
  gutterBottom: true,
  sx: { marginTop: 1 },
  noWrap: true,
};

const rootContainer = {
  flexDirection: "column",
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
};

const rootContainerButton = {
  width: "100%",
  minHeight: 25,
  display: "flex",
  justifyContent: "space-between",
};

const containerButton = (show, add = false) => {
  const height = 50;

  const def = {
    minWidth: 0,
    transition: "all 0.2s ease-out",
    borderRadius: 2,
    height,
    maxHeight: height,
    padding: "unset",
    "&:hover": {
      backgroundColor: add ? "#f8a917" : "#e64d44",
    },
    backgroundColor: add ? "#f8a917" : "#e64d44",
  };

  if (add) {
    return {
      ...def,
      flexBasis: show ? "100%" : "45%",
    };
  }
  return {
    ...def,
    flexBasis: show ? "0%" : "45%",
    visibility: show ? "hidden" : "visible",
    opacity: show ? 0 : 1,
  };
};

const containerButtonIconDefault = { fontSize: 35 };

export {
  rootBox,
  rootTypography,
  rootContainerButton,
  containerButton,
  containerButtonIconDefault,
  rootContainer,
};
