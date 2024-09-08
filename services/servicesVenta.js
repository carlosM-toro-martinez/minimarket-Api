const Venta = require("../models/Venta");

class servicesVenta {
  constructor() {
    this.sesion = {};
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
