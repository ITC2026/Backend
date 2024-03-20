'use strict';

export async function up(queryInterface, Sequelize) {
  // Drop all tables
  await queryInterface.dropAllTables();
}
export async function down(queryInterface, Sequelize) {
  // Recreate tables (you may need to define table structures here)
  // For example:
  // await queryInterface.createTable('Table1', { ... });
  // await queryInterface.createTable('Table2', { ... });
}
