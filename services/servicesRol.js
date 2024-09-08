const Rol = require("../models/Rol");

class servicesRol {
  constructor() {
    this.sesion = {};
  }

  // Método GET para obtener todos los roles
  async getAllRoles() {
    try {
      const roles = await Rol.findAll();
      return roles;
    } catch (error) {
      console.error("Error fetching all roles:", error);
      throw error;
    }
  }

  // Método GET para obtener un rol por ID
  async getRoleById(id) {
    try {
      const role = await Rol.findByPk(id);
      if (!role) {
        throw new Error(`Role with ID ${id} not found`);
      }
      return role;
    } catch (error) {
      console.error("Error fetching role by ID:", error);
      throw error;
    }
  }

  // Método POST para crear un nuevo rol
  async createRole(data) {
    try {
      const newRole = await Rol.create(data);
      return newRole;
    } catch (error) {
      console.error("Error creating role:", error);
      throw error;
    }
  }

  // Método PUT para actualizar un rol por ID
  async updateRole(id, data) {
    try {
      const role = await Rol.findByPk(id);
      if (!role) {
        throw new Error(`Role with ID ${id} not found`);
      }
      await role.update(data);
      return role;
    } catch (error) {
      console.error("Error updating role:", error);
      throw error;
    }
  }

  // Método DELETE para eliminar un rol por ID
  async deleteRole(id) {
    try {
      const role = await Rol.findByPk(id);
      if (!role) {
        throw new Error(`Role with ID ${id} not found`);
      }
      await role.destroy();
      return { message: "Role deleted successfully" };
    } catch (error) {
      console.error("Error deleting role:", error);
      throw error;
    }
  }
}

module.exports = servicesRol;
