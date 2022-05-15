const def = (ctx, next) => {
  if (ctx.update?.message?.new_chat_members) {
    ctx
      .reply(
        `Привет: ${
          ctx.update?.message?.new_chat_members
            ?.map((item) => `${item.first_name} ${item.last_name} (${item.username})`)
            .join(",") +
          "\n" +
          "Подпишись на канала что бы не пропустить новые видео\n" +
          "https://www.youtube.com/channel/UCuDZdzBT2Xd7ex6EjL3aL4w\n" +
          "Для начала изучения рекомендую посмотреть плей лист с настройкой инструментов\n" +
          "https://youtube.com/playlist?list=PLdRkxc5c2e3khVAa0e1H-IjheRxDsmDt0"
        }`
        // {
        //   reply_to_message_id: ctx.message.message_id,
        // }
      )
      .then(() => {
        // ctx.deleteMessage(ctx.message.message_id, ctx.message.chat);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    next();
  }
};

module.exports = (bot) => {
  bot.use(def);
};
