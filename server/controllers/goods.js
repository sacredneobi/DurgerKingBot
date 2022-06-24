const models = require("../db/models");
const { HasMany, HasOne, Op } = require("sequelize");
const sleep = require("../utils/sleep");

const model = models.good;

const post = (req, res, promiseError) => {
  if (!req?.body?.articleId) {
    throw new Error("Not found articleId in body");
  }
  model
    .create({ ...req.body })
    .then((data) => {
      const { id = -1, caption } = data;
      res.status(200).send({ id, caption });
    })
    .catch(promiseError);
};

const get = async (req, res, promiseError) => {
  // await sleep(5000);

  const { search, articleId, id, ...other } = req.query;

  const searchCaption = search
    ? { caption: { [Op.iLike]: `%${search}%` } }
    : null;

  const searchArticle = articleId ? { articleId } : null;

  const searchId = id ? { id } : null;

  const where =
    searchArticle || searchCaption || searchId
      ? { ...searchCaption, ...searchArticle, ...searchId }
      : null;

  model
    .findAndCountAll({
      attributes: {
        exclude: [
          "articleId",
          "warehouseId",
          "createdAt",
          "updatedAt",
          "deletedAt",
        ],
      },
      include: [
        {
          model: models.article,
          as: "article",
          attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
        },
        {
          association: new HasOne(model, models.price, {}),
          required: false,
          attributes: {
            exclude: [
              "goodId",
              "id",
              "description",
              "purchase",
              "createdAt",
              "updatedAt",
              "deletedAt",
            ],
          },
        },
      ],
      order: [["id", "ASC"]],
      ...other,
      where: where,
    })
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

  model
    .update(body, { where: { id: id } })
    .then(() => {
      model
        .findOne({
          where: { id: id },
          attributes: {
            exclude: [
              "articleId",
              "warehouseId",
              "createdAt",
              "updatedAt",
              "deletedAt",
            ],
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
    .destroy({ where: { id: id } })
    .then(() => {
      res.status(200).send({ id, message: "deleted" });
    })
    .catch(promiseError);
};

const { checkMethod } = require("../utils");

module.exports = (router, moduleName) => {
  router.post("/", checkMethod(post, moduleName));
  router.get("/", checkMethod(get, moduleName));
  router.put("/", checkMethod(put, moduleName));
  router.delete("/", checkMethod(del, moduleName));
};
