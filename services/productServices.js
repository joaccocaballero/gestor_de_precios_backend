'use strict';

const { Product } = require('../models'); // Make sure to import the Product model correctly

const { Op } = require('sequelize');


class ProductService {
  // Method to create a new product
  async createProduct(name, barcode, costPrice, publicPrice) {
    try {
        if (barcode !== null && barcode !== '') {
            const existingProduct = await Product.findOne({ 
              where:  {
                barcode: barcode
              }});
            if (existingProduct) {
                throw new Error('Ya existe un producto con el mismo código de barras');
            }
            // Verificar si barcode es un código de barras válido
            // Puedes implementar la lógica de verificación aquí
        }

        const product = await Product.create({
            name,
            barcode,
            costPrice,
            publicPrice
        });
        return product;
    } catch (error) {
        throw new Error(error.message);
    }
}


  // Method to get all products
  async getAllProducts() {
    try {
      const products = await Product.findAll();
      return products;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Method to get a product by its ID
  async getProductById(id) {
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Method to update a product
  async updateProduct(id, newData) {
    try {
      const product = await this.getProductById(id);
      await product.update(newData);
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Method to delete a product
  async deleteProduct(id) {
    try {
      const product = await this.getProductById(id);
      await product.destroy();
      return 'Product deleted successfully';
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProductByName(name) {
    try {
      const products = await Product.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%` // Utiliza una búsqueda parcial para encontrar coincidencias
          }
        }
      });
      if (!products || products.length === 0) {
        throw new Error('Products not found');
      }
      return products;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Método para obtener productos por su código de barras
  async getProductByBarcode(barcode) {
    try {
      const products = await Product.findAll({
        where: {
          barcode: barcode
        }
      });
      if (!products || products.length === 0) {
        throw new Error('Products not found');
      }
      return products;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = ProductService;
