const { Markup } = require("telegraf");

const test = (ctx) => {
  ctx.reply("https://t.me/like");
  return ctx.reply("Привет youtube", {
    caption: "Caption",
    parse_mode: "Markdown",
    ...Markup.keyboard([
      Markup.button.webApp("Тест SendData", `https://sacred.sytes.net`),
      Markup.button.url("связаться с менеджером", `https://sacred.sytes.net`),
    ]),
  });
};

module.exports = (bot) => {
  bot.newCommand({ command: "buttons", description: "Тест SendData" }, test);
};
