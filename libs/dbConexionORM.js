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
      connectTimeout: 10000, // Aumenta el tiempo de espera (en milisegundos)
      ssl: {
        require: true, // Habilita SSL
        rejectUnauthorized: false, // Permite la conexión sin verificar el certificado del servidor
      }, // Aumenta el tiempo de espera (en milisegundos)
    },
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Conectado a la base de datos PostgreSQL"))
  .catch((err) => console.error("Error al conectar:", err));

module.exports = sequelize;
