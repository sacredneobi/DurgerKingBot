import { memo } from "react";
import { Text, IconButton, Box } from "@components";
import { areEqualObject } from "@utils";
import { useGoodsContext as useContext } from "@context";

const Default = memo((props) => {
  const { caption, id } = props;

  const { dialog } = useContext();

  const handleOnEdit = (event) => {
    dialog.setIsShowEdit(true, { select: id });
    event.stopPropagation();
  };

  const handleOnDelete = (event) => {
    dialog.setIsShowDelete(true, { select: id, onGetText: () => caption });
    event.stopPropagation();
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        gap: 1,
        alignItems: "center",
        padding: (them) => them.spacing(0, 1),
      }}
    >
      <Text sx={{ flexGrow: 1 }} caption={caption} />
      <IconButton textIcon="edit" color="primary" onClick={handleOnEdit} />
      <IconButton textIcon="delete" color="error" onClick={handleOnDelete} />
    </Box>
  );
}, areEqualObject);

export default Default;
