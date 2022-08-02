import ShoppingCart, {
  notEmpty as shoppingCartNotEmpty,
  filter as shoppingCartFilter,
  calcSum as shoppingCartCalcSum,
} from "./shoppingCart";
import {
  Context as UserContext,
  useDefContext as useUserContext,
} from "./user";
import MainButton from "./mainButton";
import {
  Context as GoodsContext,
  useDefContext as useGoodsContext,
} from "./goods";
import {
  Context as ArticlesContext,
  useDefContext as useArticlesContext,
} from "./articles";
import {
  Context as ClientsContext,
  useDefContext as useClientsContext,
} from "./clients";
import {
  Context as OrdersContext,
  useDefContext as useOrdersContext,
} from "./orders";
import {
  Context as OrderContext,
  useDefContext as useOrderContext,
} from "./order";
import {
  Context as UsersContext,
  useDefContext as useUsersContext,
} from "./users";

import { contextSelect } from "./defaultSelect";
import { useContext } from "react";

const useContextSelect = () => {
  return useContext(contextSelect);
};

export {
  ShoppingCart,
  MainButton,
  shoppingCartNotEmpty,
  shoppingCartFilter,
  shoppingCartCalcSum,
  GoodsContext,
  useGoodsContext,
  ArticlesContext,
  useArticlesContext,
  ClientsContext,
  useClientsContext,
  OrdersContext,
  useOrdersContext,
  OrderContext,
  useOrderContext,
  UserContext,
  useUserContext,
  UsersContext,
  useUsersContext,
  useContextSelect,
};
