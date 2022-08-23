const models = require("../db/models");
const { Op, HasMany } = require("sequelize");
const jwtCheck = require("../utils/jwtMiddleware");

const model = models.compositionOrder;

const get = (req, res) => {
  const { id, limit, offset, ...other } = req.query;

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
      limit: parseInt(limit) ? parseInt(limit) : null,
      offset: parseInt(offset) ? parseInt(offset) : null,
      ...other,
      where: where,
    })
    .then((data) => {
      res.status(200).send(data);
    });
};

const post = (req, res, promiseError) => {
  const { orderId, count, sale, goodId } = req.body;

  if (!orderId) {
    throw new Error("Not found id in body");
  }

  model
    .create({ count, sale, goodId: goodId?.id, orderId })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(promiseError);
};

const put = (req, res, promiseError) => {
  const { id, ...body } = req.body;

  if (!id) {
    throw new Error("Not found id in body");
  }

  const data = { sale: body.sale, count: body.count, goodId: body.goodId.id };

  model
    .update(data, { where: { id: id } })
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
  router.put("/", jwtCheck, checkMethod(put, moduleName));
  router.post("/", jwtCheck, checkMethod(post, moduleName));
  router.delete("/", jwtCheck, checkMethod(del, moduleName));
};
