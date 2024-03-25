'use strict';
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Users', [{
       username: 'carla',
       password: bcrypt.hashSync('carla123', bcrypt.genSaltSync(10)),
       created_at: new Date(),
       updated_at: new Date()
     }], {});
  },

  async down (queryInterface, Sequelize) {
    // Remove all data from the Products table
    await queryInterface.bulkDelete('Users', null, {});
  }
};
