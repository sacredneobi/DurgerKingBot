const models = require("../db/models");

const model = models["order"];

module.exports = (bot) => {
  bot.on("successful_payment", async (ctx, next) => {
    if (ctx?.update?.message?.successful_payment) {
      try {
        const payload = JSON.parse(
          ctx.update.message.successful_payment.invoice_payload
        );
        if (typeof payload === "object") {
          await model.update(
            { isPayment: true },
            { where: { id: payload.orderId } }
          );
        }
      } catch {}
    }

    await ctx.reply("SuccessfulPayment").catch((error) => {
      console.log("error payment", error);
    });
  });
};
