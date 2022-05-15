const fs = require("fs");
const path = require("path");

const getErrorMessage = (fileName, message) => {
  console.log(`Error load "${fileName}": ${message}`);
};

const initCommand = (bot) => {
  fs.readdirSync(__dirname)
    .filter((file) => file.indexOf(".") !== 0 && file !== "index.js" && file.slice(-3) === ".js")
    .forEach((item) => {
      const moduleName = path.basename(item, ".js");
      const fileCommand = require(`./${item}`);
      if (typeof fileCommand === "function") {
        fileCommand(bot);
      } else {
        getErrorMessage(moduleName, "Error load is not a function");
      }
    });
};

module.exports = initCommand;
