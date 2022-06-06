const def = (app, bot) => {
  var expressWs = require("express-ws")(app);

  app.ws("/test_ws", function (ws, req) {
    ws.on("message", function (msg) {
      ws.send("ping: " + msg);
    });
    console.log("socket client connect");
  });

  var aWss = expressWs.getWss("/test_ws");

  bot.on("message", (ctx) => {
    const user = ctx.message.from;
    let userName = user.first_name ? user.first_name : "";
    userName = userName + (user.last_name ? " " + user.last_name : "");
    userName = userName + (user.username ? ` (${user.username})` : "");

    const data = {
      userName,
      message: ctx.message.text,
      id: `${ctx.message.chat.id}.${ctx.message.message_id}`,
    };

    aWss.clients.forEach(function (client) {
      client.send(JSON.stringify(data));
    });
  });
};

module.exports = def;
