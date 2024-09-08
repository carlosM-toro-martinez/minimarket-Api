const Inventario = require("../models/Inventario");

class servicesInventario {
  constructor() {
    this.sesion = {};
  }

  // Método GET para obtener todos los inventarios
  async getAllInventarios() {
    try {
      const inventarios = await Inventario.findAll();
      return inventarios;
    } catch (error) {
      console.error("Error fetching all inventarios:", error);
      throw error;
    }
  }

  // Método GET para obtener un inventario por id_inventario
  async getInventario(id_inventario) {
    try {
      const inventario = await Inventario.findByPk(id_inventario);
      if (!inventario) {
        throw new Error(`Inventario with ID ${id_inventario} not found`);
      }
      return inventario;
    } catch (error) {
      console.error("Error fetching inventario:", error);
      throw error;
    }
  }

  // Método POST para crear un nuevo inventario
  async createInventario(data) {
    try {
      const newInventario = await Inventario.create(data);
      return newInventario;
    } catch (error) {
      console.error("Error creating inventario:", error);
      throw error;
    }
  }

  // Método PUT para actualizar un inventario por id_inventario
  async updateInventario(id_inventario, data) {
    try {
      const inventario = await Inventario.findByPk(id_inventario);
      if (!inventario) {
        throw new Error(`Inventario with ID ${id_inventario} not found`);
      }
      await inventario.update(data);
      return inventario;
    } catch (error) {
      console.error("Error updating inventario:", error);
      throw error;
    }
  }

  // Método DELETE para eliminar un inventario por id_inventario
  async deleteInventario(id_inventario) {
    try {
      const inventario = await Inventario.findByPk(id_inventario);
      if (!inventario) {
        throw new Error(`Inventario with ID ${id_inventario} not found`);
      }
      await inventario.destroy();
      return { message: "Inventario deleted successfully" };
    } catch (error) {
      console.error("Error deleting inventario:", error);
      throw error;
    }
  }
}

module.exports = servicesInventario;
