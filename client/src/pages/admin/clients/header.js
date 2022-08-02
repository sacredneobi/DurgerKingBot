import { memo } from "react";
import { Text, IconButton, Box } from "@components";
import { areEqualObject } from "@utils";
import { useClientsContext as useContext } from "@context";
import { useNavigate } from "react-router-dom";

const Default = memo((props) => {
  const { first, last, id } = props;

  const caption = `${first ?? ""} ${last ?? ""}`;

  const { dialog } = useContext();
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
      <Text sx={{ flexGrow: 1 }} caption={caption} />
      <IconButton textIcon="analytics" onClick={handleOnAnalytics} />
      <IconButton textIcon="edit" color="primary" onClick={handleOnEdit} />
      <IconButton textIcon="delete" color="error" onClick={handleOnDelete} />
    </Box>
  );
}, areEqualObject);

export default Default;
