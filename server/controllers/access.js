const defMenu = [{ name: "goods", caption: "goods", icon: "inventory_2" }, { name: "articles", caption: "articles", icon: "document_scanner" }];
const defSettings = [
  { name: "translation", caption: "translation", icon: "translate" },
];

const get = (req, res) => {
  res.status(200).send({ route: defMenu, routeSetting: defSettings });
};

module.exports = (router) => {
  router.get("/", get);
};
