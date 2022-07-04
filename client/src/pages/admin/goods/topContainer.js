import { memo } from "react";
import { Box, IconButton } from "@components";
import { areEqualObject } from "@utils/areRender";
import { useGoodsContext } from "@context";

const Default = memo((props) => {
  const { select, selectCount, onClear } = props;

  const { dialog } = useGoodsContext();

  const handleOnDelete = () => {
    dialog.setIsShowDelete(true, {
      select: select.map((item) => item.id),
      onClear,
      onGetText: () => select.map((item) => item.caption).join(",\n"),
    });
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
        disabled={selectCount === 0}
      />
      <IconButton textIcon="add" onClick={handleOnCreate} edge={false} />
    </Box>
  );
}, areEqualObject);

export default Default;
