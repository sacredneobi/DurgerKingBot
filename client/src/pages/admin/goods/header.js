import { memo } from "react";
import { Text, IconButton, Box } from "@components";
import { areEqualObject } from "@utils/areRender";

const Default = memo((props) => {
  const { caption, id } = props;

  const handleOnEdit = (event) => {
    console.log("edit");
    event.stopPropagation();
  };

  const handleOnDelete = (event) => {
    console.log("delete");
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
      <Text sx={{ flexShrink: 0 }} caption={id} />
      <Text sx={{ color: "text.secondary", flexGrow: 1 }} caption={caption} />
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
