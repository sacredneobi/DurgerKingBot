var jwt = require("jsonwebtoken");
const models = require("../db/models");

const model = models.user;

const post = async (req, res) => {
  const { login, password } = req.body;

  const user = await model.findOne({
    where: { name: login.toLowerCase(), password: String(password) },
  });

  if (user) {
    var token = jwt.sign(
      { id: user.id, user: user.name, role: "admin" },
      process.env["SECRET_TOKEN"]
    );
    res.status(200).send({ isAuth: true, accessToken: token });
  } else {
    res.status(401).send({
      isAuth: false,
      error: { message: "Error auth", code: 401 },
    });
  }
};

module.exports = (router) => {
  router.post("/", post);
};
