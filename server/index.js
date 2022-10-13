require("dotenv").config();
const { Router } = require("express");
const app = require("./config/express")();
const { Telegraf } = require("telegraf");
const { loader, sleep } = require("./utils");
const { commands } = require("./utils/telegrafProto");
const ws = require("./webSocket");

const bot = new Telegraf(process.env.BOT_ID);

// typeof ws === "function" && ws(app, bot);

loader({ path: "./commands", type: "Bot command" }, bot);
loader(
  { path: "./controllers", type: "Express controller" },
  bot,
  (moduleName) => {
    const router = Router();
    app.use(`/api/${moduleName}`, router);
    return router;
  }
);

bot.telegram.setMyCommands(commands);

bot.use(async(ctx, next) => {
  // console.log(ctx);
  await next();
});

bot.on("pre_checkout_query", async(ctx, test) => {
  // console.log("payment", ctx.update.pre_checkout_query);
  await ctx.answerPreCheckoutQuery(true);
});

bot.catch(console.log);
bot.launch();
app.listen(4000);
