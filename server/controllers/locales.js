const path = require("path");

const get = (lang) => {
  return (req, res) => {
    res
      .status(200)
      .sendFile(path.join(__dirname, `../res/${lang}`, "lng.json"));
  };
};

module.exports = (router) => {
  router.get("/ru", get("ru"));
  router.get("/en", get("en"));
};
