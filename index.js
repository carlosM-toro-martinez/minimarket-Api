const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const db = require("./libs/dbConexionORM");
const Rol = require("./models/Rol");
const Permiso = require("./models/Permiso");
const RolPermiso = require("./models/RolPermiso");
const Administrador = require("./models/Administrador");
const Proveedor = require("./models/Proveedor");
const Producto = require("./models/Producto");
const Cliente = require("./models/Cliente");
const Trabajador = require("./models/Trabajador");
const DetalleCompra = require("./models/DetalleCompra");
const Lote = require("./models/Lote");
const Inventario = require("./models/Inventario");
const Venta = require("./models/Venta");
const DetalleVenta = require("./models/DetalleVenta");
const MovimientoInventario = require("./models/MovimientoInventario");
const Caja = require("./models/Caja");
const MovimientoCaja = require("./models/MovimientoCaja");
const DenominacionCaja = require("./models/DenominacionCaja");
const Reporte = require("./models/Reporte");
const router = require("./routes");

require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
router(app);

app.get("/", (req, res) => {
  res.send("¡Welcome!");
});

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await db.sync({ alter: true });
    console.log("Tablas sincronizadas con la base de datos");

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error sincronizando la base de datos:", error);
  }
}

startServer();
