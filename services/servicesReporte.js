const express = require("express");
const { Op } = require("sequelize");
const {
  MovimientoInventario,
  Producto,
  Lote,
  DetalleCompra,
  MovimientoCaja,
  Trabajador,
  Venta,
  Proveedor,
  Cliente,
  DetalleVenta,
  Caja,
} = require("../models");

class servicesReporte {
  constructor() {}

  async getMovimientosAlmacen(idInicio, idFin) {
    try {
      const movimientos = await MovimientoInventario.findAll({
        where: {
          id_movimiento: {
            [Op.between]: [idInicio, idFin],
          },
        },
        include: [
          {
            model: Producto,
            as: "producto",
            attributes: ["id_producto", "nombre"],
            include: [
              {
                model: Lote,
                as: "lotes",
                attributes: [
                  "id_lote",
                  "numero_lote",
                  "cantidad",
                  "fecha_caducidad",
                ],
              },
            ],
          },
        ],
      });
      return movimientos;
    } catch (error) {
      console.error("Error fetching movimientos de almacén:", error);
      throw error;
    }
  }

  // Método para obtener compras según un proveedor
  async getComprasProveedor(proveedorId) {
    try {
      const compras = await DetalleCompra.findAll({
        where: { id_proveedor: proveedorId },
        include: [
          {
            model: Producto,
            as: "producto",
            attributes: ["id_producto", "nombre"],
            include: [
              {
                model: Lote,
                as: "lotes",
                attributes: [
                  "id_lote",
                  "numero_lote",
                  "cantidad",
                  "fecha_caducidad",
                ],
              },
            ],
          },
          {
            model: Proveedor,
            as: "proveedor",
            attributes: ["nombre"],
          },
        ],
      });
      return compras;
    } catch (error) {
      console.error("Error fetching compras por proveedor:", error);
      throw error;
    }
  }

  // Método para obtener movimientos de caja entre fechas
  async getMovimientosCaja(idInicio, idFin) {
    try {
      const cajas = await Caja.findAll({
        where: {
          id_caja: {
            [Op.between]: [idInicio, idFin],
          },
        },
        include: [
          {
            model: MovimientoCaja,
            as: "movimientos",
            include: [
              {
                model: Trabajador,
                as: "trabajadorMovimiento",
              },
            ],
          },
          {
            model: Trabajador,
            as: "trabajadorCierre",
          },
        ],
      });

      return cajas;
    } catch (error) {
      console.error("Error fetching movimientos de caja:", error);
      throw error;
    }
  }

  // Método para obtener todas las ventas
  async getVentas(idInicio, idFin) {
    try {
      const ventas = await Venta.findAll({
        where: {
          id_venta: {
            [Op.between]: [idInicio, idFin],
          },
        },
        include: [
          {
            model: Trabajador,
            as: "trabajadorVenta",
            attributes: ["nombre"],
          },
          {
            model: Cliente,
            as: "cliente",
            attributes: ["nombre", "apellido"],
          },
          {
            model: DetalleVenta,
            as: "detallesVenta",
            include: [
              {
                model: Producto,
                as: "producto",
                attributes: ["nombre"],
              },
            ],
            attributes: ["cantidad", "precio_unitario"],
          },
        ],
      });
      return ventas;
    } catch (error) {
      console.error("Error fetching ventas:", error);
      throw error;
    }
  }
}

module.exports = servicesReporte;
