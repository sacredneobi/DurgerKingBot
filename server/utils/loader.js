const fs = require("fs");
const path = require("path");
const { compareStringInArray } = require("./compare");

const getErrorMessage = (fileName, message) => {
  console.log(`Error load "${fileName}": ${message}`);
};

const check = (options) => {
  if (!options && options !== "object" && !options.path) {
    return false;
  }

  if (options.exclude && !Array.isArray(options.exclude)) {
    return false;
  }
  return true;
};

const defExclude = (file) =>
  file.indexOf(".") !== 0 && file !== "index.js" && file.slice(-3) === ".js";
const arrayExclude = (exclude) => {
  return (file) => !compareStringInArray(file, exclude);
};

/**
 * This returns true if the operand inputArg is a String.
 * @param {*} options path - путь для загрузки
 * @returns {}
 */

module.exports = (options, data, getData) => {
  if (!check(options)) return;

  if (!fs.existsSync(options.path)) return;

  fs.readdirSync(options.path)
    .filter(options.exclude ? arrayExclude(options.exclude) : defExclude)
    .forEach((file) => {
      let moduleName = path.basename(file, ".js");
      if (
        options.moduleNameExtExclude &&
        typeof options.moduleNameExtExclude === "string"
      ) {
        moduleName = path.basename(file, options.moduleNameExtExclude);
      }
      if (options.moduleNameCb && typeof options.moduleNameCb === "function") {
        moduleName = options.moduleNameCb(file);
      }

      try {
        const module = require(`../${options.path}/${file}`);
        if (typeof module === "function") {
          if (typeof getData === "function") {
            module(getData(moduleName), moduleName, data);
          } else {
            module(data);
          }
          console.log(
            `✅ ${options.type ? options.type : "module"}: ${moduleName}`
          );
        } else {
          getErrorMessage(
            `${options.type}.${moduleName}`,
            "Error load module export is not function"
          );
        }
      } catch (error) {
        getErrorMessage(moduleName, error.message);
      }
    });
};
