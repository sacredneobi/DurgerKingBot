const style = {
  root: { display: "flex" },
  appBar: { zIndex: 1201 },
  boxMain: (matches) => {
    return (theme) => ({
      flexGrow: 1,
      px: 3,
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      height: matches ? "100vh" : "110vh",
      padding: matches ? theme.spacing(10, 1, 1, 1) : 0,
    });
  },
};

export default style;
