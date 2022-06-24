const models = require("../db/models");

const client = models.client;
const order = models.order;
const compositionOrder = models.compositionOrder;

const post = (bot) => {
  if (!bot) {
    return (req, res) => {
      res.status(404).send({ error: "Bot not found" });
    };
  }

  const crateOrderAndUser = async (user, goods) => {
    let clientItem;
    clientItem = await client.findOne({ where: { chatId: String(user.id) } });
    if (!clientItem) {
      clientItem = await client.create({
        first: user.first_name,
        last: user.last_name,
        chatId: String(user.id),
      });
    } else {
      await client.update(
        {
          first: user.first_name,
          last: user.last_name,
        },
        { where: { chatId: user.id } }
      );
    }

    const orderItem = await order.create({
      clientId: clientItem.id,
      description: "From telegram bot",
    });

    if (orderItem) {
      for (var i = 0; i < goods.length; i++) {
        const { id: goodId, count = 0, sale = 0 } = goods[i];
        await compositionOrder.create({
          orderId: orderItem.id,
          goodId,
          count,
          sale,
        });
      }
    }
  };

  return (req, res) => {
    const { query_id, goods, user } = req.body;

    bot.telegram
      .answerWebAppQuery(query_id, {
        type: "article",
        id: query_id,
        title: "YOUTUBE",
        input_message_content: {
          message_text: `Order summary:\n\n${goods
            .map(
              ({ id, count, sale }) =>
                `${count.toFixed(2)} x ${sale.toFixed(2)} = ${(
                  sale * count
                ).toFixed(2)}`
            )
            .join("\n")}\n\nTotal - ${goods
            .reduce((prev, next) => prev + next.sale * next.count, 0)
            .toFixed(2)}`,
        },
      })
      .then(async (data) => {
        if (user) {
          bot.telegram.sendMessage(user.id, "Спасибо за заказ");
        }
        await crateOrderAndUser(user, goods);
        res.status(200).send({ done: true });
      })
      .catch((error) => {
        res.status(500).send({ done: false, error: error.message });
      });
  };
};

module.exports = (router, moduleName, bot) => {
  router.post("/", post(bot));
};
