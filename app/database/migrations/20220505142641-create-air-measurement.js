'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Air_Measurements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      temperature: {
        type: Sequelize.INTEGER
      },
      humidity: {
        type: Sequelize.INTEGER
      },
      co2: {
        type: Sequelize.INTEGER
      },
      tvoc: {
        type: Sequelize.INTEGER
      },
      device_id: {
        type: Sequelize.STRING
      },
      year_built: {
        type: Sequelize.INTEGER
      },
      stories: {
        type: Sequelize.INTEGER
      },
      cooktop_fuel: {
        type: Sequelize.STRING
      },
      oven_fuel: {
        type: Sequelize.STRING
      },
      measured_at: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Air_Measurements');
  }
};