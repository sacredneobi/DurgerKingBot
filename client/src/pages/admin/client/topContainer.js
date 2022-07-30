import { memo } from "react";
import { Box, Icon, Text } from "@components";
import { areEqualObject } from "@utils/areRender";

const Default = memo((props) => {
  const { first, orderAVGSum = 0, orderSum = 0, last } = props;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        gap: 1,
      }}
      name="TOP CONTAINER"
    >
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 1, maxWidth: 250 }}
      >
        <Icon textIcon="account_circle" sx={{ fontSize: "2rem" }} />
        <Text caption={`${first ?? ""} ${last ?? ""}`} />
      </Box>
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 1, maxWidth: 250 }}
      >
        <Icon textIcon="payments" sx={{ fontSize: "2rem" }} />
        <Text caption={`средняя сумма чека: ${orderAVGSum.toFixed(2)}`} />
      </Box>
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 1, maxWidth: 200 }}
      >
        <Icon textIcon="payments" sx={{ fontSize: "2rem" }} />
        <Text caption={`Сумма чеков: ${orderSum.toFixed(2)}`} />
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );
}, areEqualObject);

export default Default;
