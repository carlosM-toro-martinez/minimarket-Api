const MovimientoCaja = require("../models/MovimientoCaja");

class servicesMovimientoCaja {
  constructor() {
    this.sesion = {};
  }

  // Método GET para obtener todos los movimientos de caja
  async getAllMovimientos() {
    try {
      const movimientos = await MovimientoCaja.findAll();
      return movimientos;
    } catch (error) {
      console.error("Error fetching all movimientos:", error);
      throw error;
    }
  }

  // Método GET para obtener un movimiento de caja por id_movimiento
  async getMovimiento(id_movimiento) {
    try {
      const movimiento = await MovimientoCaja.findByPk(id_movimiento);
      if (!movimiento) {
        throw new Error(`Movimiento with ID ${id_movimiento} not found`);
      }
      return movimiento;
    } catch (error) {
      console.error("Error fetching movimiento:", error);
      throw error;
    }
  }

  // Método POST para crear un nuevo movimiento de caja
  async createMovimiento(data) {
    try {
      const newMovimiento = await MovimientoCaja.create(data);
      return newMovimiento;
    } catch (error) {
      console.error("Error creating movimiento:", error);
      throw error;
    }
  }

  // Método PUT para actualizar un movimiento de caja por id_movimiento
  async updateMovimiento(id_movimiento, data) {
    try {
      const movimiento = await MovimientoCaja.findByPk(id_movimiento);
      if (!movimiento) {
        throw new Error(`Movimiento with ID ${id_movimiento} not found`);
      }
      await movimiento.update(data);
      return movimiento;
    } catch (error) {
      console.error("Error updating movimiento:", error);
      throw error;
    }
  }

  // Método DELETE para eliminar un movimiento de caja por id_movimiento
  async deleteMovimiento(id_movimiento) {
    try {
      const movimiento = await MovimientoCaja.findByPk(id_movimiento);
      if (!movimiento) {
        throw new Error(`Movimiento with ID ${id_movimiento} not found`);
      }
      await movimiento.destroy();
      return { message: "Movimiento deleted successfully" };
    } catch (error) {
      console.error("Error deleting movimiento:", error);
      throw error;
    }
  }
}

module.exports = servicesMovimientoCaja;
