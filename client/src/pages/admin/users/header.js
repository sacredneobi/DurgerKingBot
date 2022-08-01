import { memo } from "react";
import { Text, IconButton, Box } from "@components";
import { areEqualObject } from "@utils/areRender";
import { useUsersContext as useContext } from "@context";

const Default = memo((props) => {
  const { name, id } = props;

  const { dialog } = useContext();

  const handleOnEdit = (event) => {
    dialog.setIsShowEdit(true, { select: id });
    event.stopPropagation();
  };

  const handleOnDelete = (event) => {
    dialog.setIsShowDelete(true, { select: id, onGetText: () => name });
    event.stopPropagation();
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        gap: 1,
        alignItems: "center",
        padding: (them) => them.spacing(0, 1, 0, 1),
      }}
    >
      <Text sx={{ color: "text.secondary", flexGrow: 1 }} caption={name} />
      <IconButton
        textIcon="edit"
        color="primary"
        edge={false}
        onClick={handleOnEdit}
      />
      <IconButton
        textIcon="delete"
        color="error"
        edge={false}
        onClick={handleOnDelete}
      />
    </Box>
  );
}, areEqualObject);

export default Default;
