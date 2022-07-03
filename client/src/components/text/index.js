import { Typography, Skeleton } from "@mui/material";
import Box from "../box";

const Default = (props) => {
  const { caption, checkRender, loading = false, ...other } = props;

  if (loading) {
    return <Skeleton variant="text" {...other} sx={{ width: "100%" }} />;
  }

  const item = (
    <Typography component="div" text="" {...other}>
      {caption}
    </Typography>
  );

  if (typeof checkRender === "function") {
    return checkRender() ? item : <Box {...other}></Box>;
  }

  return item;
};

export default Default;
