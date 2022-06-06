require("dotenv").config();
const { Router } = require("express");
const app = require("./config/express")();
const { Telegraf } = require("telegraf");
const { loader, sleep } = require("./utils");
const { commands } = require("./utils/telegrafProto");
const ws = require("./webSocket");

const bot = new Telegraf(process.env.BOT_ID);

// typeof ws === "function" && ws(app, bot);

loader({ path: "./middleware", type: "middleware" }, bot);
loader({ path: "./commands", type: "command" }, bot);
loader({ path: "./controllers", type: "controller" }, bot, (moduleName) => {
  const router = Router();
  app.use(`/api/${moduleName}`, router);
  return router;
});

bot.telegram.setMyCommands(commands);

bot.launch();
app.listen(4000);
