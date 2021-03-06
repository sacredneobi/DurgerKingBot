import { memo } from "react";
import { Text, IconButton, Box } from "@components";
import { areEqualObject } from "@utils/areRender";
import { useClientsContext } from "@context";
import { useNavigate } from "react-router-dom";

const Default = memo((props) => {
  const { first, last, id } = props;

  const caption = `${first ?? ""} ${last ?? ""}`;

  const { dialog } = useClientsContext();
  const navigate = useNavigate();

  const handleOnEdit = (event) => {
    dialog.setIsShowEdit(true, { select: id });
    event.stopPropagation();
  };

  const handleOnDelete = (event) => {
    dialog.setIsShowDelete(true, {
      select: id,
      onGetText: () => caption,
    });
    event.stopPropagation();
  };

  const handleOnAnalytics = (event) => {
    navigate(`/admin/clients/client/${id}`);
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
      <Text sx={{ color: "text.secondary", flexGrow: 1 }} caption={caption} />
      <IconButton
        textIcon="analytics"
        edge={false}
        onClick={handleOnAnalytics}
      />
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
