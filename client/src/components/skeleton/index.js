import { Skeleton } from "@mui/material";

export default (props) => {
  return (
    <Skeleton variant="rectangular" width="100%" height="200px" {...props} />
  );
};
