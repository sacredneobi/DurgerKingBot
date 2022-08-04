const path = require("path");
const jwtCheck = require("../utils/jwtMiddleware");

const post = (req, res) => {
  Object.keys(req.files).forEach(async (file) => {
    var ext = path.extname(req.files[file].name || "");
    const filePath = `${__dirname}/../../media/${req.files[file].md5}`;
    await req.files[file].mv(filePath);
  });

  res.status(200).send({ fileCount: Object.keys(req.files).length });
};

const { checkMethod } = require("../utils");

module.exports = (router, moduleName) => {
  router.post("/", jwtCheck, checkMethod(post, moduleName));
};
