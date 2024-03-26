'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    barcode:{
      type: DataTypes.NUMERIC,
      allowNull: true,
    },
    costPrice: {
      type: DataTypes.NUMERIC,
      field: 'cost_price',
      allowNull: true
    },
    publicPrice: {
      type: DataTypes.NUMERIC,
      field: 'public_price',
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};