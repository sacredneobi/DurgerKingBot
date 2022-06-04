const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "addonProps", deps: []
 * createTable() => "articles", deps: []
 * createTable() => "clients", deps: []
 * createTable() => "prices", deps: []
 * createTable() => "roles", deps: []
 * createTable() => "warehouses", deps: []
 * createTable() => "goods", deps: [articles, prices, warehouses, addonProps]
 * createTable() => "orders", deps: [clients]
 * createTable() => "compositionOrders", deps: [orders, goods]
 * createTable() => "users", deps: [roles]
 *
 */

const info = {
  revision: 1,
  name: "Init",
  created: "2022-06-03T18:27:59.698Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "addonProps",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        dimension: { type: Sequelize.TEXT, field: "dimension" },
        type: { type: Sequelize.TEXT, field: "type" },
        description: { type: Sequelize.TEXT, field: "description" },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        deletedAt: { type: Sequelize.DATE, field: "deletedAt" },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "articles",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        caption: { type: Sequelize.TEXT, field: "caption" },
        description: { type: Sequelize.TEXT, field: "description" },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        deletedAt: { type: Sequelize.DATE, field: "deletedAt" },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "clients",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        first: { type: Sequelize.TEXT, field: "first" },
        last: { type: Sequelize.TEXT, field: "last" },
        chatId: { type: Sequelize.TEXT, field: "chatId" },
        description: { type: Sequelize.TEXT, field: "description" },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        deletedAt: { type: Sequelize.DATE, field: "deletedAt" },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "prices",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        purchase: { type: Sequelize.FLOAT, field: "purchase" },
        sale: { type: Sequelize.FLOAT, field: "sale" },
        description: { type: Sequelize.TEXT, field: "description" },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        deletedAt: { type: Sequelize.DATE, field: "deletedAt" },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "roles",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        level: { type: Sequelize.INTEGER, field: "level" },
        caption: { type: Sequelize.TEXT, field: "caption" },
        description: { type: Sequelize.TEXT, field: "description" },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        deletedAt: { type: Sequelize.DATE, field: "deletedAt" },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "warehouses",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        count: { type: Sequelize.TEXT, field: "count" },
        availability: { type: Sequelize.INTEGER, field: "availability" },
        description: { type: Sequelize.TEXT, field: "description" },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        deletedAt: { type: Sequelize.DATE, field: "deletedAt" },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "goods",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        caption: { type: Sequelize.TEXT, field: "caption" },
        description: { type: Sequelize.TEXT, field: "description" },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        deletedAt: { type: Sequelize.DATE, field: "deletedAt" },
        articleId: {
          type: Sequelize.INTEGER,
          field: "articleId",
          onUpdate: "NO ACTION",
          onDelete: "CASCADE",
          references: { model: "articles", key: "id" },
          allowNull: true,
        },
        priceId: {
          type: Sequelize.INTEGER,
          field: "priceId",
          onUpdate: "NO ACTION",
          onDelete: "CASCADE",
          references: { model: "prices", key: "id" },
          allowNull: true,
        },
        warehouseId: {
          type: Sequelize.INTEGER,
          field: "warehouseId",
          onUpdate: "NO ACTION",
          onDelete: "CASCADE",
          references: { model: "warehouses", key: "id" },
          allowNull: true,
        },
        addonPropsId: {
          type: Sequelize.INTEGER,
          field: "addonPropsId",
          onUpdate: "NO ACTION",
          onDelete: "CASCADE",
          references: { model: "addonProps", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "orders",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        description: { type: Sequelize.TEXT, field: "description" },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        deletedAt: { type: Sequelize.DATE, field: "deletedAt" },
        clientId: {
          type: Sequelize.INTEGER,
          field: "clientId",
          onUpdate: "NO ACTION",
          onDelete: "CASCADE",
          references: { model: "clients", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "compositionOrders",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        count: { type: Sequelize.FLOAT, field: "count" },
        sale: { type: Sequelize.FLOAT, field: "sale" },
        description: { type: Sequelize.TEXT, field: "description" },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        deletedAt: { type: Sequelize.DATE, field: "deletedAt" },
        orderId: {
          type: Sequelize.INTEGER,
          field: "orderId",
          onUpdate: "NO ACTION",
          onDelete: "CASCADE",
          references: { model: "orders", key: "id" },
          allowNull: true,
        },
        goodIdId: {
          type: Sequelize.INTEGER,
          field: "goodIdId",
          onUpdate: "NO ACTION",
          onDelete: "CASCADE",
          references: { model: "goods", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "users",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.TEXT, field: "name" },
        password: { type: Sequelize.TEXT, field: "password" },
        description: { type: Sequelize.TEXT, field: "description" },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        deletedAt: { type: Sequelize.DATE, field: "deletedAt" },
        roleId: {
          type: Sequelize.INTEGER,
          field: "roleId",
          onUpdate: "NO ACTION",
          onDelete: "CASCADE",
          references: { model: "roles", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["addonProps", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["articles", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["clients", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["compositionOrders", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["goods", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["orders", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["prices", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["roles", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["users", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["warehouses", { transaction }],
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
