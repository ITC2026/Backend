'use strict';

export async function up(queryInterface, Sequelize) {
  // Alter data type of tariff_project column
  await queryInterface.changeColumn('Projects', 'tariff_project', {
    type: Sequelize.INTEGER,
    allowNull: true,
    // Specify conversion using USING
    defaultValue: Sequelize.literal("0") // Set a default value of 0 for now
  });

  // Update existing data to convert string values to integers
  await queryInterface.sequelize.query(`
      UPDATE "Projects"
      SET "tariff_project" = CAST(tariff_project AS FLOAT)
    `);
}
export async function down(queryInterface, Sequelize) {
  // If needed, define the down function to rollback changes
  // For example, reverting the data type back to VARCHAR
  await queryInterface.changeColumn('Projects', 'tariff_project', {
    type: Sequelize.STRING
  });
}
