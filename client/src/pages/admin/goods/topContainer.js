import { memo } from "react";
import { Box, IconButton } from "@components";
import { areEqualObject } from "@utils/areRender";
import { useGoodsContext } from "@context";

const Default = memo((props) => {
  const { dialog } = useGoodsContext();

  const handleOnDelete = () => {
    dialog.setIsShowDelete(true, props);
  };

  const handleOnCreate = () => {
    dialog.setIsShowCreate(true);
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
        onClick={handleOnDelete}
        edge={false}
      />
      <IconButton textIcon="add" onClick={handleOnCreate} edge={false} />
    </Box>
  );
}, areEqualObject);

export default Default;
