const fs = require("fs");
const stream = require("stream");
const { checkMethod } = require("../utils");

const get = (req, res) => {
  const { fileId } = req.query;
  const file = `${__dirname}/../../media/${fileId}`;
  if (fs.existsSync(file)) {
    const r = fs.createReadStream(file); // or any other way to get a readable stream
    const ps = new stream.PassThrough(); // <---- this makes a trick with stream error handling
    stream.pipeline(
      r,
      ps, // <---- this makes a trick with stream error handling
      (err) => {
        if (err) {
          console.log(err); // No such file or any other kind of error
          return res.sendStatus(400);
        }
      }
    );
    ps.pipe(res); // <---- this makes a trick with stream error handling
  } else {
    throw new Error("fileId not found");
  }
};

module.exports = (router, moduleName) => {
  router.get("/", checkMethod(get, moduleName));
};
