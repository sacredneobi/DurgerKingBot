const models = require("../db/models");
const { Op, HasMany } = require("sequelize");
const jwtCheck = require("../utils/jwtMiddleware");

const model = models.order;

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
          model: models.client,
          as: "client",
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt", "chatId"],
          },
        },
        {
          association: new HasMany(model, models.compositionOrder, {}),
          required: false,
          attributes: {
            exclude: [
              "goodId",
              "orderId",
              "description",
              "createdAt",
              "updatedAt",
              "deletedAt",
            ],
          },
          include: [
            {
              model: models.good,
              as: "good",
              attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt", "articleId"],
              },
              include: [
                {
                  model: models.article,
                  as: "article",
                  attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                  },
                },
              ],
            },
          ],
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
  router.get("/", jwtCheck, checkMethod(get, moduleName));
  router.put("/", jwtCheck, checkMethod(put, moduleName));
  router.delete("/", jwtCheck, checkMethod(del, moduleName));
};
