import { useEffect } from "react";
import { Box, Loading } from "@components";
import { useArticleGet as useGet } from "@api";
import Grid from "../addons/grid";
import Bottom from "../addons/bottom";
import { root, grid, baseLine } from "./styles";
import Search from "../addons/search";
import Item from "./item";

const Default = (props) => {
  const { showPayment, setShow, defPage, countPerPage = 10 } = props;

  const { countPage, items, usePage, page, loading, useSearch } =
    useGet(countPerPage);

  useEffect(() => {
    if (defPage && defPage !== page) {
      usePage(defPage);
    }
  }, [defPage]);

  return (
    <Box sx={root(showPayment)}>
      {loading ? (
        <Loading />
      ) : (
        <Grid
          items={items}
          sx={grid}
          renderItem={(props) => <Item {...props} page={page} />}
        />
      )}
      <Box sx={{ ...baseLine }} />
      <Bottom
        search={(props) => (
          <Search {...props} sx={{ marginLeft: 1, marginRight: 1 }} />
        )}
        setShow={setShow}
        onSearch={useSearch}
        page={page}
        count={countPage}
        onSetPage={usePage}
      />
    </Box>
  );
};

export default Default;
