const test = (ctx) => {
  ctx
    .reply("dddd")
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = (bot) => {
  bot.newCommand({ command: "test", description: "Тестовые команды" }, test);
};
