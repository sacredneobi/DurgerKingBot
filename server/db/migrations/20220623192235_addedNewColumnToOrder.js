const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * addColumn(sale) => "orders"
 * addColumn(count) => "orders"
 *
 */

const info = {
  revision: 3,
  name: "addedNewColumnToOrder",
  created: "2022-06-23T19:22:35.286Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "addColumn",
    params: [
      "orders",
      "sale",
      { type: Sequelize.FLOAT, field: "sale" },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "orders",
      "count",
      { type: Sequelize.FLOAT, field: "count" },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["orders", "sale", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["orders", "count", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
