const def = (func) => {
  return async (ctx) => {
    await ctx.deleteMessage(ctx.message.message_id, ctx.message.chat);
    func(ctx);
  };
};

module.exports = def;
