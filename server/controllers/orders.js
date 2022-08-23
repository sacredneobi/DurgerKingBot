const models = require("../db/models");
const { Op } = require("sequelize");
const jwtCheck = require("../utils/jwtMiddleware");

const model = models.order;

const post = (req, res, promiseError) => {
  model
    .create({ ...req.body })
    .then((data) => {
      const { id = -1, caption } = data;
      res.status(200).send({ id, caption });
    })
    .catch(promiseError);
};

const get = (req, res) => {
  const { search, id, limit, offset, ...other } = req.query;

  const searchCaption = search
    ? {
        [Op.or]: [
          { description: { [Op.iLike]: `%${search}%` } },
          { [`$${models.client.name}.first$`]: { [Op.iLike]: `%${search}%` } },
          { [`$${models.client.name}.last$`]: { [Op.iLike]: `%${search}%` } },
          {
            [`$${models.client.name}.description$`]: {
              [Op.iLike]: `%${search}%`,
            },
          },
        ],
      }
    : null;

  const searchId = id ? { id } : null;

  const where =
    searchCaption || searchId ? { ...searchCaption, ...searchId } : null;

  model
    .findAndCountAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt", "chatId", "clientId"],
      },
      include: [
        {
          model: models.client,
          as: "client",
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
  router.post("/", jwtCheck, checkMethod(post, moduleName));
  router.get("/", checkMethod(get, moduleName));
  router.put("/", jwtCheck, checkMethod(put, moduleName));
  router.delete("/", jwtCheck, checkMethod(del, moduleName));
};
