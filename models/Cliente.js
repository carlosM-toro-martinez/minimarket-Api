const { Model, DataTypes } = require("sequelize");
const sequelize = require("../libs/dbConexionORM");

class Cliente extends Model {}

Cliente.init(
  {
    id_cliente: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    codigo: DataTypes.STRING,
    nitci: DataTypes.STRING,
    telefono: DataTypes.STRING,
    email: DataTypes.STRING,
    direccion: DataTypes.STRING,
    puntos_fidelidad: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Cliente",
    tableName: "Cliente",
    timestamps: true,
  }
);

module.exports = Cliente;
