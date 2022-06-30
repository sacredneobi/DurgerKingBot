const style = {
  root: { display: "flex" },
  appBar: { zIndex: 1201 },
  boxMain: () => {
    return (theme) => ({
      flexGrow: 1,
      px: 3,
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      height: "100vh",
      padding: theme.spacing(10, 1, 1, 1),
    });
  },
};

export default style;
