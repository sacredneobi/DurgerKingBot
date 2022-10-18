if (process.env.MIGRATE_TOOL) {
  require("dotenv").config();
}

const {
  DEV_USERNAME,
  DEV_PASSWORD,
  DEV_DATABASE,
  DEV_HOST,
  DEV_PORT,
  DEV_DIALECT
} = process.env

const dev = {
  username: DEV_USERNAME,
  password: DEV_PASSWORD,
  database: DEV_DATABASE,
  host: DEV_HOST,
  port: DEV_PORT,
  dialect: DEV_DIALECT,
  logging: (msg) => {
    // console.log(msg);
  },
  define: { createdAt: false },
};

module.exports = { development: dev, test: null, production: null };
