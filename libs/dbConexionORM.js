const { Sequelize } = require("sequelize");
const { config } = require("../config/config");

const sequelize = new Sequelize(
  config.dbName,
  config.dbUser,
  config.dbPass,

  {
    host: config.dbHost,
    dialect: "postgres",
    port: config.dbPort,

    dialectOptions: {
      connectTimeout: 10000,
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Conectado a la base de datos PostgreSQL"))
  .catch((err) => console.error("Error al conectar:", err));

module.exports = sequelize;
