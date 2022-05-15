const def = (ctx) => {
  ctx.replyWithDice();
};

module.exports = (bot) => {
  bot.newCommand({ command: "dice", description: "Бросить кубик" }, true, def);
};
