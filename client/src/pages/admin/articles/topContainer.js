import { memo, useState, useCallback, useEffect } from "react";
import { Box, IconButton, Input } from "@components";
import { useArticlesContext as useContext } from "@context";
import { isFunc, areEqualObject } from "@utils";

const Default = memo((props) => {
  const { select, selectCount, onClear, onSearch } = props;

  const { dialog } = useContext();
  const [data, setData] = useState({});

  useEffect(() => {
    if (data?.search !== null && data?.search !== undefined) {
      isFunc(onSearch, data?.search);
    }
  }, [data]);

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
        disabled={selectCount === 0}
      />
      <IconButton textIcon="add" onClick={handleOnCreate} />
    </Box>
  );
}, areEqualObject);

export default Default;
