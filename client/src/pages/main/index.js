import { useSearchParams } from "react-router-dom";
import { useState, memo } from "react";
import { Box } from "../../components";
import Goods from "../goods";
import Article from "../articles";
import Payment from "../payment";
import { ShoppingCart } from "../../context";

const Default = (props) => {
  const [searchParams] = useSearchParams();
  const [showPayment, setShowPayment] = useState(true);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        alignItems: "center",
      }}
    >
      {searchParams.get("articleId") ? (
        <Goods
          articleId={searchParams.get("articleId")}
          showPayment={showPayment}
          setShow={setShowPayment}
        />
      ) : (
        <Article
          showPayment={showPayment}
          setShow={setShowPayment}
          defPage={
            searchParams.get("pageArticle")
              ? parseInt(searchParams.get("pageArticle"))
              : null
          }
        />
      )}
      <Payment show={showPayment} setShow={setShowPayment} />
    </Box>
  );
};

function areEqual(prev, next) {
  return true;
}

const Main = memo((props) => {
  const data = localStorage.getItem("shoppingCart")
    ? JSON.parse(localStorage.getItem("shoppingCart"))
    : [];

  return (
    <ShoppingCart.Provider value={data} name="MAIN CONTEXT">
      <Default {...props} />
    </ShoppingCart.Provider>
  );
}, areEqual);

export default Main;
