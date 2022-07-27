import { useEffect, useCallback, useState } from "react";
import { sendMessagePost } from "@api";
import {
  shoppingCartNotEmpty,
  shoppingCartFilter,
  shoppingCartCalcSum,
} from "@context";
import { Box } from "@components";
import Goods from "../goods";
import Article from "../articles";
import Payment from "../payment";
import styles from "./styles";
import { telegramButtonColor } from "./constParam";
import useHooks from "./useHooks";

export default (props) => {
  const {
    searchParams,
    shoppingCart,
    showPayment,
    setShowPayment,
    isReady,
    telegram,
  } = useHooks();

  const [callbackPost] = sendMessagePost();
  const [payment, setPayment] = useState(null);

  const showShoppingCart = useCallback(() => {
    if (isReady) {
      telegram.MainButton.setParams({
        ...telegramButtonColor,
        text: "VIEW ORDER",
        is_visible: shoppingCartNotEmpty(shoppingCart),
      });
    }
  }, [isReady, telegram, showPayment]);

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
          ...telegramButtonColor,
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
