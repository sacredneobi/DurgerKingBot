const style = {
  root: {
    flexGrow: 1,
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    padding: 0.5,
    boxShadow:
      "rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;",
  },
  loading: {
    overflow: "auto",
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  top: {
    gap: 1,
    margin: (theme) => theme.spacing(0.1, 0, 1, 0),
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    alignItems: "center",
  },
  bottom: {
    margin: 1,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  bottomSelect: { flexGrow: 1 },
};

export default style;
