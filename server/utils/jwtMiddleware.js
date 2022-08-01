var jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const jwtToken = req.headers["authorization"];
  if (jwtToken && jwtToken.includes("JWT ")) {
    jwt.verify(
      jwtToken.split(" ")[1],
      process.env["SECRET_TOKEN"],
      function (err, decoded) {
        if (!err) {
          req.user = decoded;
          next();
        } else {
          res.status(401).send({
            isAuth: false,
            error: { message: err.message, code: err.code },
          });
        }
      }
    );
  } else {
    res.status(401).send({
      isAuth: false,
      error: { message: "Error auth", code: 401 },
    });
  }
};
