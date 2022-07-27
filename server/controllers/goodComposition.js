const models = require("../db/models");
const { Op, HasMany } = require("sequelize");

const model = models.compositionOrder;

const get = (req, res) => {
  const { id, ...other } = req.query;

  const searchId = id ? { id } : null;

  const where = searchId ? { ...searchId } : null;

  model
    .findOne({
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt", "clientId"],
      },
      include: [
        {
          model: models.good,
          as: "good",
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt", "chatId"],
          },
        },
      ],
      order: [["id", "DESC"]],
      ...other,
      where: where,
    })
    .then((data) => {
      res.status(200).send(data);
    });
};

const put = (req, res, promiseError) => {
  const { id, ...body } = req.body;

  if (!id) {
    throw new Error("Not found id in body");
  }

  model
    .update(body, { where: { id: id } })
    .then(() => {
      model
        .findOne({
          where: { id: id },
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
          },
        })
        .then((data) => {
          res.status(200).send(data);
        })
        .catch(promiseError);
    })
    .catch(promiseError);
};

const del = (req, res, promiseError) => {
  const { id } = req.body;

  if (!id) {
    throw new Error("Not found id in body");
  }

  model
    .destroy({ where: { id } })
    .then(() => {
      res.status(200).send({ id, message: "deleted" });
    })
    .catch(promiseError);
};

const { checkMethod } = require("../utils");

module.exports = (router, moduleName) => {
  router.get("/", checkMethod(get, moduleName));
  router.put("/", checkMethod(put, moduleName));
  router.delete("/", checkMethod(del, moduleName));
};
