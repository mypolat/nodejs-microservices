'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";') // added to give uuid by default
      .then(async () => {
        await queryInterface.createTable('userRewards', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal("uuid_generate_v4()"),
          },
          userId: {
            allowNull: false,
            type: Sequelize.UUID
          },
          rewardId: {
            allowNull: false,
            type: Sequelize.UUID
          }
        });
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('userRewards');
  }
};