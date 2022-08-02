import { memo } from "react";
import { Text, IconButton, Box } from "@components";
import { areEqualObject } from "@utils";
import { useOrdersContext as useContext } from "@context";
import { useNavigate } from "react-router-dom";

const Default = memo((props) => {
  const { client: { first, last } = {}, id } = props;

  const caption = `#${id} ${first ?? ""} ${last ?? ""}`;

  const { dialog } = useContext();
  const navigate = useNavigate();

  const handleOnEdit = (event) => {
    navigate(`/admin/orders/order/${id}`);
    event.stopPropagation();
  };

  const handleOnDelete = (event) => {
    dialog.setIsShowDelete(true, {
      select: id,
      onGetText: () => caption,
    });
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
      <IconButton
        textIcon="shopping_cart_checkout"
        color="primary"
        onClick={handleOnEdit}
      />
      <IconButton textIcon="delete" color="error" onClick={handleOnDelete} />
    </Box>
  );
}, areEqualObject);

export default Default;
