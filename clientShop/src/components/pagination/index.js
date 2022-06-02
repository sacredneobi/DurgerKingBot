import * as React from "react";
import { Pagination, PaginationItem } from "@mui/material";

export default function (props) {
  const {
    color = "#fff",
    backgroundColor = "#f8a917",
    center = false,
    sx,
    ...other
  } = props;

  const style = center ? { justifyContent: "center" } : null;

  return (
    <Pagination
      count={600}
      variant="outlined"
      shape="rounded"
      size="large"
      sx={{ "& .MuiPagination-ul": style, ...sx }}
      renderItem={(item) => (
        <PaginationItem
          {...item}
          sx={{
            color: color,
            boxShadow: `0px 0 4px 0px ${backgroundColor}aa`,
            fontSize: 20,
            backgroundColor: backgroundColor,
            "&:hover": {
              color: color,
              backgroundColor: `${backgroundColor}dd !important`,
            },
            "&:active": {
              color: color,
              backgroundColor: `${backgroundColor}dd !important`,
            },
            "&.Mui-selected": {
              color: color,
              backgroundColor: `${backgroundColor}70 !important`,
            },
          }}
        />
      )}
      {...other}
    />
  );
}
