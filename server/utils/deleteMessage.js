const def = (func) => {
  return (ctx) => {
    ctx.deleteMessage(ctx.message.message_id, ctx.message.chat);
    func(ctx);
  };
};

module.exports = def;
