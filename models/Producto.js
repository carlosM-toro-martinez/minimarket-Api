const { Model, DataTypes } = require("sequelize");
const sequelize = require("../libs/dbConexionORM");

class Producto extends Model {}

Producto.init(
  {
    id_producto: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: DataTypes.STRING,
    codigo_barra: {
      type: DataTypes.STRING,
      unique: true,
    },
    categoria: DataTypes.STRING,
    precio: DataTypes.DECIMAL(10, 2),
    stock: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "Producto",
    tableName: "Producto",
    timestamps: false,
  }
);

module.exports = Producto;
