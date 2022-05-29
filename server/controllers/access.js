const defMenu = [
  { caption: "Andrey", icon: "directions_walk" },
  { caption: "GRAND", icon: "self_improvement" },
  { caption: "Виктор", icon: "emoji_people" },
  { caption: "Виктория", icon: "pool" },
  { caption: "Лута", icon: "sensor_occupied" },
  { caption: "ddddd" },
];
const defSettings = [
  { name: "translation", caption: "translation", icon: "translate" },
];

const get = (req, res) => {
  console.log("access");
  res.status(200).send({ route: defMenu, routeSetting: defSettings });
};

module.exports = (router) => {
  router.get("/", get);
};
