import { Box, Loading } from "../../components";
import { useGoodGet } from "../../api";
import Grid from "../addons/grid";
import Bottom from "../addons/bottom";
import { root, grid, baseLine } from "./styles";
import Search from "../addons/search";
import Item from "./item";
import { useEffect, useContext } from "react";
import { ShoppingCart } from "../../context";

const countPerPage = 10;

const Default = (props) => {
  const { articleId, showPayment, setShow, showShoppingCart } = props;

  const { countPage, items, usePage, page, loading, useSearch } = useGoodGet(
    countPerPage,
    articleId
  );

  const shoppingCart = useContext(ShoppingCart);

  useEffect(() => {
    return () => {
      if (shoppingCart.length !== 0) {
        localStorage.setItem(
          "shoppingCart",
          JSON.stringify(shoppingCart, null, 2)
        );
      }
    };
  }, [shoppingCart]);

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
