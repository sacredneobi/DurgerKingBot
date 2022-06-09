import { useState } from "react";
import { ButtonBase } from "@mui/material";
import { Box, Pagination, Icon } from "../../../components";
import {
  root,
  buttonInvisible,
  buttonContainer,
  buttonIcon,
  pagination,
} from "./styles";

const Default = (props) => {
  const { search, count, page, onSetPage, ...other } = props;

  const [showSearch, setShowSearch] = useState(false);

  const handleOnClick = () => {
    setShowSearch((prev) => !prev);
  };

  return (
    <Box sx={root} {...other}>
      {search && showSearch ? (
        search()
      ) : (
        <>
          <Icon sx={buttonInvisible} />
          <Pagination
            center
            sx={pagination}
            count={count}
            page={page}
            onChange={(event, page) => {
              if (typeof onSetPage === "function") {
                onSetPage(page);
              }
            }}
          />
        </>
      )}
      <Box sx={buttonContainer}>
        <ButtonBase onClick={handleOnClick}>
          <Icon textIcon="search" sx={buttonIcon} />
        </ButtonBase>
      </Box>
    </Box>
  );
};

export default Default;
