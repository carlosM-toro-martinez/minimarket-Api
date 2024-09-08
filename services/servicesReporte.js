// services/servicesReporte.js
const Reporte = require("../models/Reporte");

class servicesReporte {
  constructor() {
    this.sesion = {};
  }

  // Método GET para obtener todos los reportes
  async getAllReportes() {
    try {
      const reportes = await Reporte.findAll();
      return reportes;
    } catch (error) {
      console.error("Error fetching all reportes:", error);
      throw error;
    }
  }

  // Método GET para obtener un reporte por id_reporte
  async getReporte(id_reporte) {
    try {
      const reporte = await Reporte.findByPk(id_reporte);
      if (!reporte) {
        throw new Error(`Reporte with ID ${id_reporte} not found`);
      }
      return reporte;
    } catch (error) {
      console.error("Error fetching reporte:", error);
      throw error;
    }
  }

  // Método POST para crear un nuevo reporte
  async createReporte(data) {
    try {
      const newReporte = await Reporte.create(data);
      return newReporte;
    } catch (error) {
      console.error("Error creating reporte:", error);
      throw error;
    }
  }

  // Método PUT para actualizar un reporte por id_reporte
  async updateReporte(id_reporte, data) {
    try {
      const reporte = await Reporte.findByPk(id_reporte);
      if (!reporte) {
        throw new Error(`Reporte with ID ${id_reporte} not found`);
      }
      await reporte.update(data);
      return reporte;
    } catch (error) {
      console.error("Error updating reporte:", error);
      throw error;
    }
  }

  // Método DELETE para eliminar un reporte por id_reporte
  async deleteReporte(id_reporte) {
    try {
      const reporte = await Reporte.findByPk(id_reporte);
      if (!reporte) {
        throw new Error(`Reporte with ID ${id_reporte} not found`);
      }
      await reporte.destroy();
      return { message: "Reporte deleted successfully" };
    } catch (error) {
      console.error("Error deleting reporte:", error);
      throw error;
    }
  }
}

module.exports = servicesReporte;
