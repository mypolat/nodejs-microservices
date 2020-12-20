"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("userRewards", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      rewardId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("userRewards");
  },
};
