const jwtCheck = require("../utils/jwtMiddleware");

const defMenu = [
  { name: "goods", caption: "goods", icon: "inventory_2" },
  { name: "articles", caption: "articles", icon: "document_scanner" },
  {
    name: "clients",
    caption: "clients",
    icon: "group",
    route: [{ name: "client/:id", caption: "client", icon: "analytics" }],
  },
  {
    name: "orders",
    caption: "orders",
    icon: "production_quantity_limits",
    route: [
      { name: "order/:id", caption: "order", icon: "shopping_cart_checkout" },
    ],
  },
  { name: "users", caption: "users", icon: "group" },
];

const defSettings = [
  { name: "translation", caption: "translation", icon: "translate" },
];

const get = (req, res) => {
  res.status(200).send({ route: defMenu, routeSetting: defSettings });
};

module.exports = (router) => {
  router.get("/", jwtCheck, get);
};
