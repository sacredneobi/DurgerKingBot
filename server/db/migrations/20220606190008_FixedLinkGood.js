const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * removeColumn(addonPropsId) => "goods"
 * removeColumn(priceId) => "goods"
 * addColumn(goodId) => "addonProps"
 * addColumn(goodId) => "prices"
 *
 */

const info = {
  revision: 2,
  name: "FixedLinkGood",
  created: "2022-06-06T19:00:08.854Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["goods", "addonPropsId", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["goods", "priceId", { transaction }],
  },
  {
    fn: "addColumn",
    params: [
      "addonProps",
      "goodId",
      {
        type: Sequelize.INTEGER,
        field: "goodId",
        onUpdate: "NO ACTION",
        onDelete: "CASCADE",
        references: { model: "goods", key: "id" },
        allowNull: true,
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "prices",
      "goodId",
      {
        type: Sequelize.INTEGER,
        field: "goodId",
        onUpdate: "NO ACTION",
        onDelete: "CASCADE",
        references: { model: "goods", key: "id" },
        allowNull: true,
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["addonProps", "goodId", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["prices", "goodId", { transaction }],
  },
  {
    fn: "addColumn",
    params: [
      "goods",
      "addonPropsId",
      {
        type: Sequelize.INTEGER,
        field: "addonPropsId",
        onUpdate: "NO ACTION",
        onDelete: "CASCADE",
        references: { model: "addonProps", key: "id" },
        allowNull: true,
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "goods",
      "priceId",
      {
        type: Sequelize.INTEGER,
        field: "priceId",
        onUpdate: "NO ACTION",
        onDelete: "CASCADE",
        references: { model: "prices", key: "id" },
        allowNull: true,
      },
      { transaction },
    ],
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
