const models = require("../db/models");
const axios = require("axios").default;

const client = models.client;
const order = models.order;
const compositionOrder = models.compositionOrder;

const getInvoice = (id, goods, orderId) => {
  const invoice = {
    provider_token: "632593626:TEST:sandbox_i49650467127",
    start_parameter: "get_access", //Уникальный параметр глубинных ссылок. Если оставить поле пустым, переадресованные копии отправленного сообщения будут иметь кнопку «Оплатить», позволяющую нескольким пользователям производить оплату непосредственно из пересылаемого сообщения, используя один и тот же счет. Если не пусто, перенаправленные копии отправленного сообщения будут иметь кнопку URL с глубокой ссылкой на бота (вместо кнопки оплаты) со значением, используемым в качестве начального параметра.
    title: "Привет YouTube",
    description: "YouTube",
    currency: "USD",
    prices: goods.map((item) => ({
      label: `${item.caption} x ${item.count}`,
      amount: (item.sale * item.count * 100).toFixed(0),
    })),
    payload: {
      orderId: orderId,
    },
  };

  return invoice;
};

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
      isPayment: false,
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

    return orderItem;
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
        const order = await crateOrderAndUser(user, goods);
        if (user) {
          bot.telegram.sendInvoice(
            user.id,
            getInvoice(user.id, goods, order.id)
          );
        }
        res.status(200).send({ done: true });
      })
      .catch((error) => {
        res.status(500).send({ done: false, error: error.message });
      });
  };
};

const postSendInvoice = (bot) => {
  return async (req, res) => {
    const { goods } = req.body;
    axios
      .post(
        `https://api.telegram.org/bot${process.env.BOT_ID}/createInvoiceLink`,
        getInvoice(100, Array.isArray(goods) ? goods : [], "TestOrder")
      )
      .then((response) => {
        console.log(response.data);
        res.status(200).send({ done: true, ...response.data });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ done: false, error: error.message });
      });
  };
};

module.exports = (router, moduleName, bot) => {
  router.post("/", post(bot));
  router.post("/senInvoice", postSendInvoice(bot));
};
