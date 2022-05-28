require("dotenv").config();
const { Telegraf } = require("telegraf");
const loader = require("./utils/loader");
const { commands } = require("./utils/telegrafProto");
const express = require("express");
const { Router } = require("express");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const bot = new Telegraf(process.env.BOT_ID);

loader({ path: "./middleware", type: "middleware" }, bot);
loader({ path: "./commands", type: "command" }, bot);
loader({ path: "./controllers", type: "controller" }, null, (moduleName) => {
  const router = Router();
  app.use(`/${moduleName}`, router);
  return router;
});

bot.telegram.setMyCommands(
  commands.sort((left, right) =>
    left.description.localeCompare(right.description)
  )
);

bot.start((ctx) => ctx.reply("Welcome"));

bot.on("message", (ctx) => console.log(ctx.message));
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
