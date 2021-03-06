import { memo } from "react";
import { Text, IconButton, Box } from "@components";
import { areEqualObject } from "@utils/areRender";
import { useOrdersContext } from "@context";
import { useNavigate } from "react-router-dom";

const Default = memo((props) => {
  const { client: { first, last } = {}, id } = props;

  const caption = `#${id} ${first ?? ""} ${last ?? ""}`;

  const { dialog } = useOrdersContext();
  const navigate = useNavigate();

  const handleOnEdit = (event) => {
    navigate(`/admin/orders/order/${id}`);
    // dialog.setIsShowEdit(true, { select: id });
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
      <Text sx={{ color: "text.secondary", flexGrow: 1 }} caption={caption} />
      <IconButton
        textIcon="shopping_cart_checkout"
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
