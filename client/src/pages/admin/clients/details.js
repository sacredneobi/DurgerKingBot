import { memo, useEffect } from "react";
import { Text } from "@components";
import { areEqualObject } from "@utils/areRender";

const Default = memo((props) => {
  const { first, last, id, description, expanded } = props;

  const caption = `${first ?? ""} ${last ?? ""}`;

  useEffect(() => {
    if (expanded) {
      console.log(expanded, id);
      return () => {
        console.log("unMount", id);
      };
    }
  }, [expanded, id]);

  return (
    <>
      <Text sx={{ width: "15%", flexShrink: 0 }} caption={id} />
      <Text sx={{ color: "text.secondary" }} caption={description} />
      <Text sx={{ color: "text.secondary" }} caption={caption} />
    </>
  );
}, areEqualObject);

export default Default;
