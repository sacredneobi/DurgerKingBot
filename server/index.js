require("dotenv").config();
const { Telegraf } = require("telegraf");
const loader = require("./utils/loader");
const { commands } = require("./utils/telegrafProto");
const express = require("express");
const { Router } = require("express");
const sleep = require("./utils/sleep");

const app = express();

var expressWs = require("express-ws")(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const bot = new Telegraf(process.env.BOT_ID);

loader({ path: "./middleware", type: "middleware" }, bot);
loader({ path: "./commands", type: "command" }, bot);
loader({ path: "./controllers", type: "controller" }, null, (moduleName) => {
  const router = Router();
  app.use(
    `/api/${moduleName}`,
    async (req, res, next) => {
      // if (moduleName !== "locales") {
      //   await sleep(3000);
      // }
      next();
    },
    router
  );
  return router;
});

bot.telegram.setMyCommands(
  commands.sort((left, right) =>
    left.description.localeCompare(right.description)
  )
);

bot.start((ctx) => ctx.reply("Welcome"));

app.ws("/test_ws", function (ws, req) {
  ws.on("message", function (msg) {
    ws.send("ping: " + msg);
  });
  console.log("socket client connect");
});

var aWss = expressWs.getWss("/test_ws");

bot.on("message", (ctx) => {
  const user = ctx.message.from;
  // console.log(ctx.message);
  let userName = user.first_name ? user.first_name : "";
  userName = userName + (user.last_name ? " " + user.last_name : "");
  userName = userName + (user.username ? ` (${user.username})` : "");

  const data = {
    userName,
    message: ctx.message.text,
    id: `${ctx.message.chat.id}.${ctx.message.message_id}`,
  };

  aWss.clients.forEach(function (client) {
    client.send(JSON.stringify(data));
  });
});

bot.launch();

app.post("/api/", (req, res) => {
  // const { query_id } = req.body;
  // bot.telegram.answerWebAppQuery(query_id, {
  //   type: "article",
  //   id: query_id,
  //   title: "YOUTUBE",
  //   input_message_content: { message_text: "ПРИВЕТ МИР" },
  // });
  res.status(200).send({ done: true });
});

app.listen(4000);
