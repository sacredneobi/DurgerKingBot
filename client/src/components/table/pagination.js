import { memo } from "react";
import { Pagination } from "@mui/material";
import { areEqualObject } from "@utils/areRender";

const Default = memo((props) => {
  return (
    props.count !== 0 && (
      <Pagination variant="outlined" shape="rounded" {...props} />
    )
  );
}, areEqualObject);

export default Default;
