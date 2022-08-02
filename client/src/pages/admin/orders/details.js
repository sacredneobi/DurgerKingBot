import { memo, useEffect } from "react";
import { Text } from "@components";
import { areEqualObject } from "@utils";

const Default = memo((props) => {
  const { client: { first, last } = {}, id, description, expanded } = props;

  const caption = `order from "${first ?? ""} ${last ?? ""}"`;

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
      <Text caption={description} />
      <Text caption={caption} />
    </>
  );
}, areEqualObject);

export default Default;
