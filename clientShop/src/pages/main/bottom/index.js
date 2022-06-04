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
  const { search } = props;

  const [showSearch, setShowSearch] = useState(false);

  const handleOnClick = () => {
    setShowSearch((prev) => !prev);
  };

  return (
    <Box sx={root}>
      {search && showSearch ? (
        search()
      ) : (
        <>
          <Icon sx={buttonInvisible} />
          <Pagination center sx={pagination} />
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
