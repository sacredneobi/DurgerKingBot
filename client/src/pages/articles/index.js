import { Box, Loading } from "../../components";
import { useArticleGet } from "../../api";
import Grid from "../addons/grid";
import Bottom from "../addons/bottom";
import { root, grid, baseLine } from "./styles";
import Search from "../addons/search";
import Item from "./item";

const countPerPage = 20;

const Default = (props) => {
  const { countPage, items, usePage, page, loading, useSearch } =
    useArticleGet(countPerPage);

  return (
    <Box sx={root}>
      {loading ? (
        <Loading />
      ) : (
        <Grid
          items={loading ? [] : items}
          sx={grid}
          renderItem={(props) => <Item {...props} />}
        />
      )}
      <Box sx={{ ...baseLine }} />
      <Bottom
        search={(props) => (
          <Search {...props} sx={{ marginLeft: 1, marginRight: 1 }} />
        )}
        onSearch={useSearch}
        page={page}
        count={countPage}
        onSetPage={usePage}
      />
    </Box>
  );
};

export default Default;
