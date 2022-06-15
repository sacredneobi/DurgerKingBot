const models = require("../db/models");
const { Op } = require("sequelize");

const model = models.article;

const post = (req, res) => {};

const get = (req, res) => {
  const search = req.query?.search
    ? { caption: { [Op.iLike]: `%${req.query?.search}%` } }
    : null;

  model
    .findAndCountAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
      order: [["id", "ASC"]],
      ...req.query,
      where: search,
    })
    .then((data) => {
      res.status(200).send(data);
    });
};

const put = (req, res) => {};

const del = (req, res) => {};

const { checkMethod } = require("../utils");

module.exports = (router, moduleName) => {
  router.post("/", checkMethod(post, moduleName));
  router.get("/", checkMethod(get, moduleName));
  router.put("/", checkMethod(put, moduleName));
  router.delete("/", checkMethod(del, moduleName));
};
