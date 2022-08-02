import { memo, useEffect, useState } from "react";
import { Text, Box } from "@components";
import { areEqualObject } from "@utils";
import { useOrderGetById as useGet } from "@api";

const Default = memo((props) => {
  const { id, expanded } = props;

  const [data, setData] = useState({});
  const [callbackGet, loading, abort] = useGet();

  useEffect(() => {
    if (expanded) {
      callbackGet(id, setData);
      return abort;
    }
  }, [expanded, id]);

  if (!data.compositionOrders || loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
        <Text loading={true} sx={{ width: "180%" }} />
        <Text loading={true} />
      </Box>
    );
  }

  return data.compositionOrders.map((item, index) => {
    return (
      <Box
        key={index}
        sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}
      >
        <Text
          caption={item.good?.caption}
          checkRender={() => !!item.good?.caption}
        />
        <Text
          caption={`Количество :${item.count}`}
          checkRender={() => !!item.count}
        />
      </Box>
    );
  });
}, areEqualObject);

export default Default;
