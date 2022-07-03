import { memo } from "react";
import { Box, IconButton } from "@components";
import { areEqualObject } from "@utils/areRender";

const Default = memo((props) => {
  const handleOnClick = () => {
    console.log("create new");
  };

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", width: "100%" }}
      name="TOP CONTAINER"
    >
      <Box sx={{ flexGrow: 1 }} />
      <IconButton
        textIcon="delete"
        color="error"
        onClick={handleOnClick}
        edge={false}
      />
      <IconButton textIcon="add" onClick={handleOnClick} edge={false} />
    </Box>
  );
}, areEqualObject);

export default Default;
