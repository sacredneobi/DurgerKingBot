import { Box, Loading } from "@components";
import { ShoppingCart } from "@context";
import { useGoodGet as useGet } from "@api";
import Grid from "../addons/grid";
import Bottom from "../addons/bottom";
import { root, grid, baseLine } from "./styles";
import Search from "../addons/search";
import Item from "./item";
import { useEffect, useContext } from "react";

const Default = (props) => {
  const {
    articleId,
    showPayment,
    setShow,
    showShoppingCart,
    countPerPage = 10,
  } = props;

  const { countPage, items, loading, useSearch, usePage, page } = useGet(
    countPerPage,
    articleId
  );

  const shoppingCart = useContext(ShoppingCart);

  useEffect(() => {
    return () => {
      if (shoppingCart.length !== 0) {
        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
      }
    };
  }, [shoppingCart]);

  return (
    <Box sx={root(showPayment)}>
      {loading ? (
        <Loading />
      ) : (
        <Grid
          items={items}
          sx={grid}
          renderItem={(props) => (
            <Item {...props} showShoppingCart={showShoppingCart} />
          )}
        />
      )}
      <Box sx={{ ...baseLine }} />
      <Bottom
        search={(props) => (
          <Search {...props} sx={{ marginLeft: 1, marginRight: 1 }} />
        )}
        showBack
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
