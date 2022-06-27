const models = require("../db/models");

const client = models.client;

const def = async (ctx) => {
  const { id, first_name: first, last_name: last } = ctx.message.from;

  const clientItem = await client.findOne({ where: { chatId: String(id) } });
  if (!clientItem) {
    await client.create({
      first,
      last,
      chatId: String(id),
    });
  } else {
    await client.update(
      {
        first,
        last,
      },
      { where: { chatId: id } }
    );
  }

  ctx.reply("Привет youtube");
};

module.exports = (bot) => {
  bot.start(def);
};
