import { useState, useCallback, useContext } from "react";
import Box from "../box";
import Text from "../text";
import Divider from "../divider";
import Rows from "./rows";
import Pagination from "./pagination";
import DefaultContext from "./context";
import styles from "./styles";
import { isFunc } from "@utils";

export default (props) => {
  const {
    itemsRender = {},
    countPage,
    page,
    usePage,
    loading,
    userContext,
    topContainer,
    ...other
  } = props;
  const select = useContext(userContext ? userContext : DefaultContext);
  const [, setReload] = useState(false);

  const handleOnChange = useCallback((event, page) => {
    isFunc(usePage, page);
  }, []);

  const handleOnSelect = useCallback((item, checked) => {
    const findGood = select.find((select) => select.id === item.id);
    findGood ? (findGood.checked = checked) : select.push({ ...item, checked });
    setReload((prev) => !prev);
  }, []);

  const countSelect = select.filter((item) => item.checked === true).length;

  return (
    <Box sx={styles.root}>
      {topContainer && (
        <Box sx={styles.top}>
          {isFunc(topContainer)}
          <Divider flexItem />
        </Box>
      )}
      {loading ? (
        <Box sx={styles.loading}>LOADING</Box>
      ) : (
        <Rows
          {...itemsRender}
          {...other}
          onSelect={handleOnSelect}
          select={select}
        />
      )}
      <Box sx={styles.bottom}>
        <Text
          sx={styles.bottomSelect}
          caption={`Количество выделенных элементов (${countSelect})`}
          checkRender={() => countSelect > 0}
        />
        <Pagination count={countPage} page={page} onChange={handleOnChange} />
      </Box>
    </Box>
  );
};
