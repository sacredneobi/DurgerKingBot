import { memo, useEffect } from "react";
import { Text } from "@components";
import { areEqualObject } from "@utils/areRender";

const Default = memo((props) => {
  const { id, expanded } = props;

  const description = props?.good?.description;
  const articleDescription = props?.good?.article?.description;
  const articleCaption = props?.good?.article?.caption;

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
      <Text
        sx={{ color: "text.secondary" }}
        caption={`Название артикула:${articleCaption}`}
        checkRender={() => !!articleCaption}
      />
      <Text
        sx={{ color: "text.secondary" }}
        caption={`Описание артикула:${articleDescription}`}
        checkRender={() => !!articleDescription}
      />
      <Text
        sx={{ color: "text.secondary" }}
        caption={`Описание товара:${description}`}
        checkRender={() => !!description}
      />
    </>
  );
}, areEqualObject);

export default Default;
