import Main from "./main";
import translation from "./admin/translation";
import goods from "./admin/goods";
import articles from "./admin/articles";
import clients from "./admin/clients";
import client from "./admin/client";
import orders from "./admin/orders";
import order from "./admin/order";
import Login from "./admin/login";
import users from "./admin/users";

const adminPages = [
  translation,
  goods,
  articles,
  clients,
  orders,
  order,
  client,
  users,
];

export { Main, adminPages, Login };
