'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Seed data for Products
    const productsData = [
      {
        name: 'REXONA ODORONO CREMA',
        barcode: 77947457,
        cost_price: 80,
        public_price: 150,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'REXONA INVISIBLE ROLL ON',
        barcode: 47894794,
        cost_price: 90,
        public_price: 180,
        created_at: new Date(),
        updated_at: new Date()
      },
    ];

    // Insert products data into the database
    await queryInterface.bulkInsert('Products', productsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all data from the Products table
    await queryInterface.bulkDelete('Products', null, {});
  }
};
