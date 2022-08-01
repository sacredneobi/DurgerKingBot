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
  // app.use(async (req, res, next) => {
  //   if (req.url.includes("locales") || req.url.includes("auth")) {
  //     next();
  //   } else {
  //     if (!req.headers.authorization) {
  //       res.status(401).send({ error: "Auth failed" });
  //     } else {
  //       const jwtToken = req.headers?.authorization ?? "";
  //       if (jwtToken && jwtToken.includes("JWT ")) {
  //         jwt.verify(
  //           jwtToken.split(" ")[1],
  //           process.env["SECRET_TOKEN"],
  //           function (err, decoded) {
  //             isError = !!err;
  //             error = err;
  //             if (!err) {
  //               req.user = decoded;
  //               next();
  //             } else {
  //               res.status(401).send({ error: "Auth failed" });
  //             }
  //           }
  //         );
  //       } else {
  //         res.status(401).send({ error: "Auth failed" });
  //       }
  //     }
  //   }
  // });
  app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );

  return app;
};

module.exports = def;
