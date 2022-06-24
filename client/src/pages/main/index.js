import { useSearchParams } from "react-router-dom";
import { useState, memo, useContext, useEffect, useCallback } from "react";
import { Box } from "../../components";
import Goods from "../goods";
import Article from "../articles";
import Payment from "../payment";
import { ShoppingCart } from "../../context";
import {
  useTelegramWebApp,
  useIsTelegramWebAppReady,
} from "react-telegram-webapp";
import { post } from "../../api/sendMessage";
import { convertToPrice } from "../../utils";

const Default = (props) => {
  const [searchParams] = useSearchParams();
  const shoppingCart = useContext(ShoppingCart);
  const [showPayment, setShowPayment] = useState(
    shoppingCart.filter((item) => item.count > 0).length > 0
  );
  const isReady = useIsTelegramWebAppReady();
  const telegram = useTelegramWebApp();

  const showShoppingCart = useCallback(() => {
    if (isReady) {
      telegram.MainButton.setParams({
        color: "rgb(49, 181, 69)",
        text: "VIEW ORDER",
        is_visible: shoppingCart.filter((item) => item.count > 0).length > 0,
        is_active: true,
      });
      // .showProgress(true)
    }
  }, [isReady, telegram, showPayment]);

  useEffect(() => {
    if (isReady) {
      telegram.expand(true);
      const handleOnClick = () => {
        // showPayment ? telegram.sendData("TEST") : setShowPayment(true);
        showPayment
          ? // Отправка при использовании keyboardButton (Markup.keyboard) в телеграмме
            // ? telegram.sendData(
            //     JSON.stringify({ ...telegram.initDataUnsafe, test: 100 })
            //   )
            post({
              ...telegram.initDataUnsafe,
              goods: shoppingCart.filter((item) => item.count > 0),
            })
          : setShowPayment(true);
      };
      telegram.MainButton.onClick(handleOnClick);

      if (showPayment) {
        telegram.MainButton.setParams({
          color: "rgb(49, 181, 69)",
          text: `Payment ${convertToPrice(
            shoppingCart.reduce(
              (prev, next) => prev + next.sale * next.count,
              0
            )
          )}`,
          is_visible: true,
          is_active: true,
        });
      }

      return () => {
        telegram.MainButton.offClick(handleOnClick);
      };
    }
  }, [isReady, telegram, showPayment]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {searchParams.get("articleId") ? (
        <Goods
          articleId={searchParams.get("articleId")}
          showPayment={showPayment}
          setShow={setShowPayment}
          showShoppingCart={showShoppingCart}
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
      <Payment
        show={showPayment}
        setShow={setShowPayment}
        showShoppingCart={showShoppingCart}
      />
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
    <ShoppingCart.Provider
      value={data.filter((item) => item.count > 0)}
      name="MAIN CONTEXT"
    >
      <Default {...props} />
    </ShoppingCart.Provider>
  );
}, areEqual);

export default Main;
