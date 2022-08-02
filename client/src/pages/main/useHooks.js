import { useState, useContext, useCallback } from "react";
import { sendMessagePost as useSend } from "@api";
import { useSearchParams } from "react-router-dom";
import { ShoppingCart, shoppingCartNotEmpty } from "@context";
import {
  useTelegramWebApp,
  useIsTelegramWebAppReady,
} from "react-telegram-webapp";

const useHooks = () => {
  const [searchParams] = useSearchParams();
  const shoppingCart = useContext(ShoppingCart);
  const [showPayment, setShowPayment] = useState(
    shoppingCartNotEmpty(shoppingCart)
  );
  const [callbackPost] = useSend();
  const [payment, setPayment] = useState(null);
  const isReady = useIsTelegramWebAppReady();
  const telegram = useTelegramWebApp();

  const showShoppingCart = useCallback(() => {
    if (isReady) {
      telegram.MainButton.setParams({
        color: "rgb(49, 181, 69)",
        text: "VIEW ORDER",
        is_visible: shoppingCartNotEmpty(shoppingCart),
      });
    }
  }, [isReady, telegram, showPayment]);

  return {
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
  };
};

export default useHooks;
