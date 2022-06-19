import * as React from "react";
import { Pagination, PaginationItem } from "@mui/material";

export default function (props) {
  const {
    color = "var(--tg-theme-button-text-color, #fff)",
    backgroundColor = "#f8a917",
    center = false,
    sx,
    size = 30,
    count = 0,
    page = 0,
    ...other
  } = props;

  const style = center ? { justifyContent: "center" } : null;

  return (
    <Pagination
      size="small"
      count={count}
      page={page}
      variant="outlined"
      shape="rounded"
      sx={{
        "& .MuiPagination-ul": style,
        "& .MuiPaginationItem-ellipsis": {
          color: "var(--tg-theme-text-color, #222222)",
          padding: (theme) => theme.spacing(0, 0.2),
          margin: (theme) => theme.spacing(0, 0.2),
          minWidth: size,
        },
        ...sx,
      }}
      renderItem={(item) => {
        if (item.type === "next" || item.type === "previous") {
          return null;
        }
        return (
          <PaginationItem
            {...item}
            sx={{
              color: color,
              height: size,
              minWidth: size,
              lineHeight: "1px",
              padding: (theme) => theme.spacing(0, 0.2),
              margin: (theme) => theme.spacing(0, 0.2),
              boxShadow: `0px 0 4px 0px ${backgroundColor}aa`,
              fontSize: 14,
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
        );
      }}
      {...other}
    />
  );
}
