require("dotenv").config({ path: __dirname + "/../../.env" });
const { DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE + "_dev",
    host: DB_HOST,
    dialect: "postgres",
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE + "_test",
    host: DB_HOST,
    dialect: "postgres",
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE + "_prod",
    host: DB_HOST,
    dialect: "postgres",
  },
};
