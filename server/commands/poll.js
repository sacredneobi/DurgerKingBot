const createPoll = (ctx) => {
  ctx.replyWithPoll("Your favorite math constant", ["x", "e", "π", "φ", "γ"], {
    is_anonymous: false,
    allows_multiple_answers: true,
  });
};

module.exports = (bot) => {
  bot.newCommand(
    { command: "create_poll", description: "Создать опрос" },
    true,
    createPoll
  );
};
