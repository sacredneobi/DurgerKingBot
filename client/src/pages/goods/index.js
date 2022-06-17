import { Box, Loading } from "../../components";
import { useGoodGet } from "../../api";
import Grid from "../addons/grid";
import Bottom from "../addons/bottom";
import { root, grid, baseLine } from "./styles";
import Search from "../addons/search";
import Item from "./item";

const countPerPage = 5;

const Default = (props) => {
  const { articleId, showPayment, setShow } = props;

  const { countPage, items, usePage, page, loading, useSearch } = useGoodGet(
    countPerPage,
    articleId
  );

  return (
    <Box
      sx={{
        ...root,
        maxHeight: showPayment ? 0 : "100vh",
        transition: "max-height 0.3s ease-out, opacity 0.3s ease-out",
        visibility: !showPayment ? "visible" : "hidden",
        opacity: !showPayment ? 1 : 0,
      }}
    >
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
