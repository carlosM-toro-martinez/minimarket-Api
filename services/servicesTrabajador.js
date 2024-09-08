const Trabajador = require("../models/Trabajador");

class servicesTrabajador {
  constructor() {
    this.sesion = {};
  }

  // Método GET para obtener todos los trabajadores
  async getAllTrabajadores() {
    try {
      const trabajadores = await Trabajador.findAll();
      return trabajadores;
    } catch (error) {
      console.error("Error fetching all trabajadores:", error);
      throw error;
    }
  }

  // Método GET para obtener un trabajador por id_trabajador
  async getTrabajador(id_trabajador) {
    try {
      const trabajador = await Trabajador.findByPk(id_trabajador);
      if (!trabajador) {
        throw new Error(`Trabajador with ID ${id_trabajador} not found`);
      }
      return trabajador;
    } catch (error) {
      console.error("Error fetching trabajador:", error);
      throw error;
    }
  }

  // Método POST para crear un nuevo trabajador
  async createTrabajador(data) {
    try {
      const newTrabajador = await Trabajador.create(data);
      return newTrabajador;
    } catch (error) {
      console.error("Error creating trabajador:", error);
      throw error;
    }
  }

  // Método PUT para actualizar un trabajador por id_trabajador
  async updateTrabajador(id_trabajador, data) {
    try {
      const trabajador = await Trabajador.findByPk(id_trabajador);
      if (!trabajador) {
        throw new Error(`Trabajador with ID ${id_trabajador} not found`);
      }
      await trabajador.update(data);
      return trabajador;
    } catch (error) {
      console.error("Error updating trabajador:", error);
      throw error;
    }
  }

  // Método DELETE para eliminar un trabajador por id_trabajador
  async deleteTrabajador(id_trabajador) {
    try {
      const trabajador = await Trabajador.findByPk(id_trabajador);
      if (!trabajador) {
        throw new Error(`Trabajador with ID ${id_trabajador} not found`);
      }
      await trabajador.destroy();
      return { message: "Trabajador deleted successfully" };
    } catch (error) {
      console.error("Error deleting trabajador:", error);
      throw error;
    }
  }
}

module.exports = servicesTrabajador;
