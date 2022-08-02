import { useEffect } from "react";
import { shoppingCartFilter, shoppingCartCalcSum } from "@context";
import { Box } from "@components";
import Goods from "../goods";
import Article from "../articles";
import Payment from "../payment";
import styles from "./styles";
import useHooks from "./useHooks";

export default (props) => {
  const {
    searchParams,
    shoppingCart,
    showPayment,
    setShowPayment,
    isReady,
    telegram,
    showShoppingCart,
    callbackPost,
    payment,
    setPayment,
  } = useHooks();

  useEffect(() => {
    if (isReady && payment?.result) {
      telegram.openInvoice(payment.result, (status) => {
        if (status === "paid") {
          telegram.close();
        }
      });
    }
  }, [payment, telegram, isReady]);

  useEffect(() => {
    if (isReady) {
      telegram.expand(true);
      const handleOnClick = () => {
        showPayment
          ? // Отправка при использовании keyboardButton (Markup.keyboard) в телеграмме
            // ? telegram.sendData(
            //     JSON.stringify({ ...telegram.initDataUnsafe, test: 100 })
            //   )
            callbackPost(
              {
                ...telegram.initDataUnsafe,
                goods: shoppingCartFilter(shoppingCart),
              },
              setPayment
            )
          : setShowPayment(true);
      };
      telegram.MainButton.onClick(handleOnClick);

      if (showPayment) {
        telegram.MainButton.setParams({
          color: "rgb(49, 181, 69)",
          text: `Payment ${shoppingCartCalcSum(shoppingCart)}`,
          is_visible: true,
        });
      }

      return () => {
        telegram.MainButton.offClick(handleOnClick);
      };
    }
  }, [isReady, telegram, showPayment]);

  const defShoppingCart = {
    setShow: setShowPayment,
    showShoppingCart: showShoppingCart,
  };

  return (
    <Box sx={styles.root}>
      {searchParams.get("articleId") ? (
        <Goods
          {...defShoppingCart}
          articleId={searchParams.get("articleId")}
          showPayment={showPayment}
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
      <Payment {...defShoppingCart} show={showPayment} />
    </Box>
  );
};
