const sequelize = require("../libs/dbConexionORM");
const Venta = require("../models/Venta");
const Caja = require("../models/Caja");
const MovimientoCaja = require("../models/MovimientoCaja");
const DenominacionCaja = require("../models/DenominacionCaja");
const DetalleVenta = require("../models/DetalleVenta");
const Inventario = require("../models/Inventario");
const Producto = require("../models/Producto");
const { Cliente, MovimientoInventario } = require("../models");

class servicesVenta {
  constructor() {
    this.sesion = {};
  }

  async registrarVentaYActualizar(dataVenta, id_caja, denominaciones) {
    console.log(dataVenta);
    const transaction = await Venta.sequelize.transaction();

    try {
      const newVenta = await Venta.create(dataVenta, { transaction });

      const caja = await Caja.findByPk(id_caja);
      if (!caja) {
        throw new Error(`Caja con ID ${id_caja} no encontrada`);
      }

      const montoVenta = parseFloat(dataVenta.total);
      const nuevoMontoCaja = parseFloat(caja.monto_final) + montoVenta;

      await caja.update({ monto_final: nuevoMontoCaja }, { transaction });

      const nuevoMovimientoCaja = await MovimientoCaja.create(
        {
          id_caja: id_caja,
          tipo_movimiento: "Ingreso",
          motivo: "Venta realizada",
          monto: montoVenta,
          fecha_movimiento: dataVenta.fecha_venta,
          id_trabajador: dataVenta.id_trabajador,
        },
        { transaction }
      );

      for (const denominacion of denominaciones) {
        const {
          tipo_dinero,
          denominacion: valorDenominacion,
          cantidad,
        } = denominacion;

        const denominacionCaja = await DenominacionCaja.findOne({
          where: {
            tipo_dinero: tipo_dinero,
            denominacion: valorDenominacion,
            id_caja: id_caja,
          },
        });

        if (!denominacionCaja) {
          throw new Error(
            `Denominación de tipo ${tipo_dinero} con valor ${valorDenominacion} no encontrada en la caja ${id_caja}`
          );
        }

        await denominacionCaja.update({ cantidad }, { transaction });
      }

      await transaction.commit();
      return {
        message: "Venta registrada y caja actualizada correctamente",
        newVenta,
      };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async procesarVenta(ventaDetalles) {
    const transaction = await sequelize.transaction();
    console.log(ventaDetalles);

    try {
      for (const detalle of ventaDetalles) {
        const {
          id_producto,
          id_lote,
          cantidad,
          id_venta,
          descripcion,
          cantidad_unidad,
          peso,
        } = detalle;

        await DetalleVenta.create(
          {
            id_producto: id_producto,
            id_venta: id_venta,
            id_lote: id_lote,
            cantidad: cantidad,
            subCantidad: cantidad_unidad,
            peso: peso,
            detalle: descripcion,
            precio_unitario: detalle.precio,
          },
          { transaction }
        );

        const inventario = await Inventario.findOne({
          where: {
            id_producto: id_producto,
            id_lote: id_lote,
          },
        });
        if (!inventario) {
          throw new Error(
            "No se encontró inventario para el producto y lote especificado."
          );
        }

        if (detalle.cantidad_unidad !== null) {
          const nuevaCantidadUnidad =
            inventario.subCantidad - detalle.cantidad_unidad;
          inventario.subCantidad = nuevaCantidadUnidad;
        } else {
          if (detalle.peso === null) {
            const nuevaCantidadInventario = inventario.cantidad - cantidad;
            if (nuevaCantidadInventario < 0) {
              throw new Error("Cantidad de inventario insuficiente.");
            }
            inventario.cantidad = nuevaCantidadInventario;
          }
        }

        if (detalle.peso !== null) {
          const nuevoPeso = inventario.peso - detalle.peso;
          inventario.peso = nuevoPeso;
          console.log(inventario.peso);
        }

        await inventario.update(
          {
            cantidad: inventario.cantidad,
            subCantidad: inventario.subCantidad,
            peso: inventario.peso,
          },
          { transaction }
        );

        const producto = await Producto.findByPk(id_producto);
        if (!producto) {
          throw new Error("Producto no encontrado.");
        }

        if (cantidad_unidad !== null) {
          producto.subCantidad -= cantidad_unidad;
        } else if (peso === null) {
          producto.stock -= cantidad;
          if (producto.stock < 0)
            throw new Error("Cantidad de producto insuficiente.");
        }

        if (peso !== null) {
          producto.peso -= peso;
        }

        await producto.update(
          {
            stock: producto.stock,
            subCantidad: producto.subCantidad,
            peso: producto.peso,
          },
          { transaction }
        );
      }

      const cliente = await Cliente.findByPk(ventaDetalles[0].clienteId);
      if (cliente) {
        const nuevosPuntos = cliente.puntos_fidelidad + 1;
        await cliente.update(
          { puntos_fidelidad: nuevosPuntos },
          { transaction }
        );
      }
      await transaction.commit();

      return {
        message: "Proceso completado sin registrar la venta.",
      };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async procesarInventario(ventaDetalles) {
    const transaction = await sequelize.transaction();

    try {
      for (const detalle of ventaDetalles) {
        const {
          id_producto,
          id_lote,
          cantidad,
          cantidad_unidad,
          peso,
          id_trabajador,
        } = detalle;

        const inventario = await Inventario.findOne({
          where: {
            id_producto: id_producto,
            id_lote: id_lote,
          },
        });
        if (!inventario) {
          throw new Error(
            "No se encontró inventario para el producto y lote especificado."
          );
        }

        if (cantidad_unidad !== null) {
          inventario.subCantidad -= cantidad_unidad;
        } else if (peso === null) {
          inventario.cantidad -= cantidad;
          if (inventario.cantidad < 0)
            throw new Error("Cantidad de inventario insuficiente.");
        }

        if (peso !== null) {
          inventario.peso -= peso;
        }

        await inventario.update(
          {
            cantidad: inventario.cantidad,
            subCantidad: inventario.subCantidad,
            peso: inventario.peso,
          },
          { transaction }
        );

        const producto = await Producto.findByPk(id_producto);
        if (!producto) {
          throw new Error("Producto no encontrado.");
        }

        if (cantidad_unidad !== null) {
          producto.subCantidad -= cantidad_unidad;
        } else if (peso === null) {
          producto.stock -= cantidad;
          if (producto.stock < 0)
            throw new Error("Cantidad de producto insuficiente.");
        }

        if (peso !== null) {
          producto.peso -= peso;
        }

        await producto.update(
          {
            stock: producto.stock,
            subCantidad: producto.subCantidad,
            peso: producto.peso,
          },
          { transaction }
        );

        await MovimientoInventario.create(
          {
            id_producto: id_producto,
            fecha_movimiento: new Date(),
            tipo_movimiento: "Salida sin venta",
            cantidad: cantidad ? parseFloat(cantidad) : null,
            subCantidad: cantidad_unidad ? parseInt(cantidad_unidad) : null,
            peso: peso ? parseFloat(peso) : null,
            id_trabajador: id_trabajador,
            lote: id_lote,
          },
          { transaction }
        );
      }

      await transaction.commit();

      return {
        message:
          "Proceso completado sin registrar la venta ni actualizar el cliente.",
      };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  // Método GET para obtener todas las ventas
  async getAllVentas() {
    try {
      const ventas = await Venta.findAll();
      return ventas;
    } catch (error) {
      console.error("Error fetching all ventas:", error);
      throw error;
    }
  }

  // Método GET para obtener una venta por id_venta
  async getVenta(id_venta) {
    try {
      const venta = await Venta.findByPk(id_venta);
      if (!venta) {
        throw new Error(`Venta with ID ${id_venta} not found`);
      }
      return venta;
    } catch (error) {
      console.error("Error fetching venta:", error);
      throw error;
    }
  }

  // Método POST para crear una nueva venta
  async createVenta(data) {
    try {
      const newVenta = await Venta.create(data);
      return newVenta;
    } catch (error) {
      console.error("Error creating venta:", error);
      throw error;
    }
  }

  // Método PUT para actualizar una venta por id_venta
  async updateVenta(id_venta, data) {
    try {
      const venta = await Venta.findByPk(id_venta);
      if (!venta) {
        throw new Error(`Venta with ID ${id_venta} not found`);
      }
      await venta.update(data);
      return venta;
    } catch (error) {
      console.error("Error updating venta:", error);
      throw error;
    }
  }

  // Método DELETE para eliminar una venta por id_venta
  async deleteVenta(id_venta) {
    try {
      const venta = await Venta.findByPk(id_venta);
      if (!venta) {
        throw new Error(`Venta with ID ${id_venta} not found`);
      }
      await venta.destroy();
      return { message: "Venta deleted successfully" };
    } catch (error) {
      console.error("Error deleting venta:", error);
      throw error;
    }
  }
}

module.exports = servicesVenta;
