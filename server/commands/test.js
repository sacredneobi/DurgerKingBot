const { Markup } = require("telegraf");

const test = (ctx) => {
  console.log(ctx.message);
  return ctx.reply("Привет youtube", {
    caption: "Caption",
    parse_mode: "Markdown",
    ...Markup.inlineKeyboard([
      Markup.button.webApp("Купи что нибудь", `https://bot.sacred.us.to/`),
    ]),
  });
};

module.exports = (bot) => {
  bot.newCommand({ command: "buy", description: "Магазин подписчиков" }, test);
};
