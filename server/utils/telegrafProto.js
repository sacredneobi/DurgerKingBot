const { Composer } = require("telegraf");
const deleteMessage = require("./deleteMessage");

let commands = [];

const isObj = (obj) => {
  return typeof obj === "object";
};

const checkMiddleware = (needReplace) => {
  return (middleware, index) => {
    return index === 2
      ? needReplace
        ? deleteMessage(middleware)
        : middleware
      : index === 1
      ? null
      : middleware;
  };
};

Composer.prototype.newCommand = function () {
  commands.push(
    isObj(arguments[0])
      ? arguments[0]
      : { command: arguments[0], description: "empty command" }
  );

  let newArgs = Object.values(arguments).map((item, index) =>
    index === 0 && isObj(item) ? item.command : item
  );

  if (typeof arguments[1] === "boolean") {
    newArgs = newArgs
      .map(checkMiddleware(arguments[1]))
      .filter((item) => !!item);
  }
  this.command(...newArgs);
};

module.exports = {
  commands: commands.sort((left, right) =>
    left.description.localeCompare(right.description)
  ),
};
