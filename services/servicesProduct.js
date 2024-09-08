const Producto = require("../models/Producto");

class servicesProducto {
  constructor() {
    this.sesion = {};
  }

  // Método GET para obtener todos los productos
  async getAllProducts() {
    try {
      const products = await Producto.findAll();
      return products;
    } catch (error) {
      console.error("Error fetching all products:", error);
      throw error;
    }
  }

  // Método GET para obtener un producto por ID
  async getProductById(id) {
    try {
      const product = await Producto.findByPk(id);
      if (!product) {
        throw new Error(`Product with ID ${id} not found`);
      }
      return product;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw error;
    }
  }

  // Método POST para crear un nuevo producto
  async createProduct(data) {
    try {
      const newProduct = await Producto.create(data);
      return newProduct;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  }

  // Método PUT para actualizar un producto por ID
  async updateProduct(id, data) {
    try {
      const product = await Producto.findByPk(id);
      if (!product) {
        throw new Error(`Product with ID ${id} not found`);
      }
      await product.update(data);
      return product;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }

  // Método DELETE para eliminar un producto por ID
  async deleteProduct(id) {
    try {
      const product = await Producto.findByPk(id);
      if (!product) {
        throw new Error(`Product with ID ${id} not found`);
      }
      await product.destroy();
      return { message: "Product deleted successfully" };
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }
}

module.exports = servicesProducto;
