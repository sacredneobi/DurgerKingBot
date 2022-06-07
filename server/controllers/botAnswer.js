const post = (bot) => {
  if (!bot) {
    return (req, res) => {
      res.status(404).send({ error: "Bot not found" });
    };
  }
  return (req, res) => {
    // const { query_id } = req.body;
    // bot.telegram.answerWebAppQuery(query_id, {
    //   type: "article",
    //   id: query_id,
    //   title: "YOUTUBE",
    //   input_message_content: { message_text: "ПРИВЕТ МИР" },
    // });
    res.status(200).send({ done: true });
  };
};

module.exports = (router, moduleName, bot) => {
  router.post("/", post(bot));
};
