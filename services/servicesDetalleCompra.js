const DetalleCompra = require("../models/DetalleCompra");

class servicesDetalleCompra {
  constructor() {
    this.sesion = {};
  }

  // Método GET para obtener todos los detalles de compra
  async getAllDetallesCompra() {
    try {
      const detallesCompra = await DetalleCompra.findAll();
      return detallesCompra;
    } catch (error) {
      console.error("Error fetching all detalles de compra:", error);
      throw error;
    }
  }

  // Método GET para obtener un detalle de compra por id_detalle
  async getDetalleCompra(id_detalle) {
    try {
      const detalleCompra = await DetalleCompra.findByPk(id_detalle);
      if (!detalleCompra) {
        throw new Error(`DetalleCompra with ID ${id_detalle} not found`);
      }
      return detalleCompra;
    } catch (error) {
      console.error("Error fetching detalle de compra:", error);
      throw error;
    }
  }

  // Método POST para crear un nuevo detalle de compra
  async createDetalleCompra(data) {
    try {
      const newDetalleCompra = await DetalleCompra.create(data);
      return newDetalleCompra;
    } catch (error) {
      console.error("Error creating detalle de compra:", error);
      throw error;
    }
  }

  // Método PUT para actualizar un detalle de compra por id_detalle
  async updateDetalleCompra(id_detalle, data) {
    try {
      const detalleCompra = await DetalleCompra.findByPk(id_detalle);
      if (!detalleCompra) {
        throw new Error(`DetalleCompra with ID ${id_detalle} not found`);
      }
      await detalleCompra.update(data);
      return detalleCompra;
    } catch (error) {
      console.error("Error updating detalle de compra:", error);
      throw error;
    }
  }

  // Método DELETE para eliminar un detalle de compra por id_detalle
  async deleteDetalleCompra(id_detalle) {
    try {
      const detalleCompra = await DetalleCompra.findByPk(id_detalle);
      if (!detalleCompra) {
        throw new Error(`DetalleCompra with ID ${id_detalle} not found`);
      }
      await detalleCompra.destroy();
      return { message: "DetalleCompra deleted successfully" };
    } catch (error) {
      console.error("Error deleting detalle de compra:", error);
      throw error;
    }
  }
}

module.exports = servicesDetalleCompra;
