import { useState, useContext } from "react";
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
  const isReady = useIsTelegramWebAppReady();
  const telegram = useTelegramWebApp();

  return {
    searchParams,
    shoppingCart,
    showPayment,
    setShowPayment,
    isReady,
    telegram,
  };
};

export default useHooks;
