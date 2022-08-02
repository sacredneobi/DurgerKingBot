import { memo } from "react";
import { Text, IconButton, Box, Icon } from "@components";
import { areEqualObject } from "@utils";
import { useNavigate } from "react-router-dom";

const getDate = (stringDate) => {
  const fix = (value) => {
    return String(value).padStart(2, "0");
  };

  const date = new Date(stringDate);
  return `${fix(date.getDate())}.${fix(
    date.getMonth()
  )}.${date.getFullYear()} ${fix(date.getHours())}:${fix(
    date.getMinutes()
  )}:${fix(date.getSeconds())}`;
};

const Default = memo((props) => {
  const { id, saleSum, isPayment, updatedAt } = props;

  const navigate = useNavigate();

  const handleOnShowOrder = (event) => {
    navigate(`/admin/orders/order/${id}`);
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
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Text sx={{ flexGrow: 1 }} caption={`Заказ #${id}`} />
        <Text
          variant="caption"
          display="block"
          gutterBottom
          sx={{ flexGrow: 1 }}
          caption={`${getDate(updatedAt)}`}
        />
      </Box>
      <Text sx={{ flexShrink: 0 }} caption={`${saleSum.toFixed(2)} $`} />
      <Icon
        textIcon={isPayment ? "paid" : "money_off"}
        color={isPayment ? "success" : "error"}
      />
      <IconButton
        textIcon="shopping_cart_checkout"
        color="primary"
        onClick={handleOnShowOrder}
      />
    </Box>
  );
}, areEqualObject);

export default Default;
