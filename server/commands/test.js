const { Markup } = require("telegraf");

const test = (ctx) => {
  return ctx.reply("Привет youtube", {
    caption: "Caption",
    parse_mode: "Markdown",
    ...Markup.inlineKeyboard([Markup.button.webApp("Купи что нибудь", "https://test.sacred.us.to/")]),
  });
};

module.exports = (bot) => {
  bot.newCommand({ command: "test", description: "Тестовые команды" }, test);
};
