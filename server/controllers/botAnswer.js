const post = (bot) => {
  if (!bot) {
    return (req, res) => {
      res.status(404).send({ error: "Bot not found" });
    };
  }
  return (req, res) => {
    const { query_id, goods, user } = req.body;
    bot.telegram
      .answerWebAppQuery(query_id, {
        type: "article",
        id: query_id,
        title: "YOUTUBE",
        input_message_content: {
          message_text: `ПРИВЕТ МИР\n\n${goods
            .map((item) => `${item.id} x ${item.count}`)
            .join("\n")}`,
        },
      })
      .then((data) => {
        if (user) {
          bot.telegram.sendMessage(user.id, "Спасибо за заказ");
        }
      });
    res.status(200).send({ done: true });
  };
};

module.exports = (router, moduleName, bot) => {
  router.post("/", post(bot));
};
