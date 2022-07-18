import { memo, useState, useCallback, useEffect } from "react";
import { Box, IconButton, Autocomplete, Input } from "@components";
import { areEqualObject } from "@utils/areRender";
import { useGoodsContext } from "@context";
import { useArticleGetAll } from "@api";
import { isFunc } from "@utils";

const Default = memo((props) => {
  const { select, selectCount, onClear, setArticleId, onSearch } = props;

  const { dialog } = useGoodsContext();
  const [data, setData] = useState({});

  useEffect(() => {
    if (data?.articleId?.id) {
      setArticleId(data?.articleId?.id);
    }
    if (data?.search !== null && data?.search !== undefined) {
      isFunc(onSearch, data?.search);
    }
  }, [data]);

  const handleOnClear = useCallback(() => {
    setArticleId(null);
  }, []);

  const handleOnDelete = () => {
    dialog.setIsShowDelete(true, {
      select: select.map((item) => item.id),
      onClear,
      onGetText: () => select.map((item) => item.caption).join(",\n"),
    });
  };

  const handleChange = useCallback((param) => {
    return (event) => {
      setData((prev) => {
        prev[param] = event.target.value;
        return { ...prev };
      });
    };
  }, []);

  const handleOnCreate = () => {
    dialog.setIsShowEdit(true);
  };

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", width: "100%" }}
      name="TOP CONTAINER"
    >
      <Autocomplete
        name="articleId"
        caption="Артикул"
        useGet={useArticleGetAll}
        data={data}
        onChange={handleChange}
        onClear={handleOnClear}
      />
      <Input
        sx={{ marginLeft: 1 }}
        name="search"
        caption="Поиск по названию"
        data={data}
        onChange={handleChange}
        changeOnEnter
      />
      <Box sx={{ flexGrow: 1 }} />
      <IconButton
        textIcon="delete"
        color="error"
        onClick={handleOnDelete}
        edge={false}
        disabled={selectCount === 0}
      />
      <IconButton textIcon="add" onClick={handleOnCreate} edge={false} />
    </Box>
  );
}, areEqualObject);

export default Default;
