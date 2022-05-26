const { Markup } = require("telegraf");

const test = (ctx) => {
  console.log(ctx.message);
  return ctx.reply("Привет youtube", {
    caption: "Caption",
    parse_mode: "Markdown",
    ...Markup.inlineKeyboard([
      Markup.button.webApp("Купи что нибудь", `https://test.sacred.us.to/?chat_id=${ctx.chat.id}`),
    ]),
  });
};

module.exports = (bot) => {
  bot.newCommand({ command: "test", description: "Тестовые команды" }, test);
};
