'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Drop all tables
    await queryInterface.dropAllTables();
  },

  down: async (queryInterface, Sequelize) => {
    // Recreate tables (you may need to define table structures here)
    // For example:
    // await queryInterface.createTable('Table1', { ... });
    // await queryInterface.createTable('Table2', { ... });
  }
};