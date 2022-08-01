const readXlsxFile = require("read-excel-file/node");
const models = require("../db/models");
const jwtCheck = require("../utils/jwtMiddleware");

const good = models.good;
const article = models.article;
const price = models.price;

const createOrReturn = async (model, data, insertData) => {
  const item = await model.findOne({ where: data });
  if (item) {
    if (insertData) {
      await model.update(insertData, { where: { id: item.id } });
    }
    return item.id;
  }
  const newItem = await model.create(insertData ? insertData : data);
  return newItem.id;
};

const getArticle = (caption) => {
  const data = String(caption).match(new RegExp("\\d+[.]\\dml|[\\d]+\\d+ml"));
  if (!data) {
    return "undefined";
  }
  return data[0];
};

const createGood = async (row) => {
  const articleId = await createOrReturn(article, {
    caption: getArticle(row[1]),
  });
  const goodId = await createOrReturn(
    good,
    { caption: String(row[1]) },
    { caption: String(row[1]), articleId: articleId }
  );
  await price.create({ sale: row[2], goodId: goodId });
  // const goodId = await createOrReturn(good, { caption: String(row[1]) });
  // good.create({ caption: row[1], description: "load from file" });
};

const post = (req, res) => {
  sampleFile = req.files.file;

  uploadPath = __dirname + "/../temp/" + sampleFile.name;
  sampleFile.mv(uploadPath, async (err) => {
    if (err) return res.status(500).send(err);

    await readXlsxFile(uploadPath).then(async (rows) => {
      for (let index = 1; index < rows.length; index++) {
        const element = rows[index];
        await createGood(element);
      }
    });
    res.send("File uploaded!");
  });
};

module.exports = (router) => {
  router.post("/", jwtCheck, post);
};
