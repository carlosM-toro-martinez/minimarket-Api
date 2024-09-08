const Caja = require("../models/Caja");

class servicesCaja {
  constructor() {
    this.sesion = {};
  }

  // Método GET para obtener todas las cajas
  async getAllCajas() {
    try {
      const cajas = await Caja.findAll();
      return cajas;
    } catch (error) {
      console.error("Error fetching all cajas:", error);
      throw error;
    }
  }

  // Método GET para obtener una caja por id_caja
  async getCaja(id_caja) {
    try {
      const caja = await Caja.findByPk(id_caja);
      if (!caja) {
        throw new Error(`Caja with ID ${id_caja} not found`);
      }
      return caja;
    } catch (error) {
      console.error("Error fetching caja:", error);
      throw error;
    }
  }

  // Método POST para crear una nueva caja
  async createCaja(data) {
    try {
      const newCaja = await Caja.create(data);
      return newCaja;
    } catch (error) {
      console.error("Error creating caja:", error);
      throw error;
    }
  }

  // Método PUT para actualizar una caja por id_caja
  async updateCaja(id_caja, data) {
    try {
      const caja = await Caja.findByPk(id_caja);
      if (!caja) {
        throw new Error(`Caja with ID ${id_caja} not found`);
      }
      await caja.update(data);
      return caja;
    } catch (error) {
      console.error("Error updating caja:", error);
      throw error;
    }
  }

  // Método DELETE para eliminar una caja por id_caja
  async deleteCaja(id_caja) {
    try {
      const caja = await Caja.findByPk(id_caja);
      if (!caja) {
        throw new Error(`Caja with ID ${id_caja} not found`);
      }
      await caja.destroy();
      return { message: "Caja deleted successfully" };
    } catch (error) {
      console.error("Error deleting caja:", error);
      throw error;
    }
  }
}

module.exports = servicesCaja;
