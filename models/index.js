const { Sequelize } = require("sequelize");
const sequelize = require("../libs/dbConexionORM");

const Rol = require("./Rol");
const Permiso = require("./Permiso");
const RolPermiso = require("./RolPermiso");
const Administrador = require("./Administrador");
const Proveedor = require("./Proveedor");
const Producto = require("./Producto");
const Cliente = require("./Cliente");
const Trabajador = require("./Trabajador");
const DetalleCompra = require("./DetalleCompra");
const Lote = require("./Lote");
const Inventario = require("./Inventario");
const Venta = require("./Venta");
const DetalleVenta = require("./DetalleVenta");
const MovimientoInventario = require("./MovimientoInventario");
const Caja = require("./Caja");
const MovimientoCaja = require("./MovimientoCaja");
const DenominacionCaja = require("./DenominacionCaja");
const Reporte = require("./Reporte");

// Rol - Permiso (Muchos a Muchos)
Rol.belongsToMany(Permiso, {
  through: RolPermiso,
  foreignKey: "id_rol",
  otherKey: "id_permiso",
  as: "permisos",
});
Permiso.belongsToMany(Rol, {
  through: RolPermiso,
  foreignKey: "id_permiso",
  otherKey: "id_rol",
  as: "roles",
});

// Trabajador - Rol (Uno a Muchos)
Trabajador.belongsTo(Rol, {
  foreignKey: "id_rol",
  as: "rol",
});
Rol.hasMany(Trabajador, {
  foreignKey: "id_rol",
  as: "trabajadores",
});

// Inventario - Producto
Inventario.belongsTo(Producto, {
  foreignKey: "id_producto",
  as: "producto",
});
Producto.hasMany(Inventario, {
  foreignKey: "id_producto",
  as: "inventarios",
});

// Inventario - Lote
Inventario.belongsTo(Lote, {
  foreignKey: "id_lote",
  as: "lote",
});
Lote.hasMany(Inventario, {
  foreignKey: "id_lote",
  as: "inventarios",
});

// Lote - Producto
Lote.belongsTo(Producto, { foreignKey: "id_producto", as: "producto" });
Producto.hasMany(Lote, { foreignKey: "id_producto", as: "lotes" });

// DetalleCompra - Producto
DetalleCompra.belongsTo(Producto, {
  foreignKey: "id_producto",
  as: "producto",
});
Producto.hasMany(DetalleCompra, {
  foreignKey: "id_producto",
  as: "detallesCompra",
});

// DetalleCompra - Proveedor
DetalleCompra.belongsTo(Proveedor, {
  foreignKey: "id_proveedor",
  as: "proveedor",
});
Proveedor.hasMany(DetalleCompra, {
  foreignKey: "id_proveedor",
  as: "detallesCompra",
});

// Lote - DetalleCompra
Lote.belongsTo(DetalleCompra, {
  foreignKey: "id_detalle_compra",
  as: "detalleCompra",
});
DetalleCompra.hasMany(Lote, { foreignKey: "id_detalle_compra", as: "lotes" });

// Caja - Trabajador
Caja.belongsTo(Trabajador, {
  foreignKey: "id_trabajador",
  as: "trabajadorCierre",
});
Trabajador.hasMany(Caja, {
  foreignKey: "id_trabajador",
  as: "cajasCierre",
});

// MovimientoCaja - Caja
MovimientoCaja.belongsTo(Caja, {
  foreignKey: "id_caja",
  as: "caja",
});
Caja.hasMany(MovimientoCaja, {
  foreignKey: "id_caja",
  as: "movimientos",
});

// MovimientoCaja - Trabajador
MovimientoCaja.belongsTo(Trabajador, {
  foreignKey: "id_trabajador",
  as: "trabajadorMovimiento",
});
Trabajador.hasMany(MovimientoCaja, {
  foreignKey: "id_trabajador",
  as: "movimientosRealizados",
});

// DenominacionCaja - Caja
DenominacionCaja.belongsTo(Caja, {
  foreignKey: "id_caja",
  as: "cajaDenominacion",
});
Caja.hasMany(DenominacionCaja, {
  foreignKey: "id_caja",
  as: "denominaciones",
});

module.exports = {
  sequelize,
  Rol,
  Permiso,
  RolPermiso,
  Administrador,
  Proveedor,
  Producto,
  Cliente,
  Trabajador,
  DetalleCompra,
  Lote,
  Inventario,
  Venta,
  DetalleVenta,
  MovimientoInventario,
  Caja,
  MovimientoCaja,
  DenominacionCaja,
  Reporte,
};
