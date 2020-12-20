const { DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;

module.exports = {
  development: {
    username: DB_USERNAME || "postgres",
    password: DB_PASSWORD || "123456",
    database: DB_DATABASE || "ms_user" + "_dev",
    host: DB_HOST || "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: DB_USERNAME || "postgres",
    password: DB_PASSWORD || "123456",
    database: DB_DATABASE || "ms_user" + "_test",
    host: DB_HOST || "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: DB_USERNAME || "postgres",
    password: DB_PASSWORD || "123456",
    database: DB_DATABASE || "ms_user" + "_prod",
    host: DB_HOST || "127.0.0.1",
    dialect: "postgres",
  },
};