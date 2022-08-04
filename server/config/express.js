const express = require("express");
const fileUpload = require("express-fileupload");
var jwt = require("jsonwebtoken");

const def = () => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(async (req, res, next) => {
    // await sleep(9000);
    next();
  });
  app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );

  return app;
};

module.exports = def;
