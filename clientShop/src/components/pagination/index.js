import * as React from "react";
import Pagination from "@mui/material/Pagination";

export default function (props) {
  const { ...other } = props;
  return (
    <Pagination
      count={5}
      variant="outlined"
      shape="rounded"
      size="large"
      {...other}
    />
  );
}
