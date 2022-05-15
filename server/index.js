const { Telegraf } = require("telegraf");
const loader = require("./utils/loader");
const { commands } = require("./utils/telegrafProto");

const bot = new Telegraf("XXXXXXX");

loader({ path: "./middleware", type: "middleware" }, bot);
loader({ path: "./commands", type: "command" }, bot);

bot.telegram.setMyCommands(commands.sort((left, right) => left.description.localeCompare(right.description)));

bot.start((ctx) => ctx.reply("Welcome"));

bot.on("sticker", (ctx) => ctx.reply("👍"));
bot.hears("hi", (ctx) => ctx.reply("Hey there"));
bot.launch();
