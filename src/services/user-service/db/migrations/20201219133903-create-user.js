"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";') // added to give uuid by default
      .then(async () => {
        await queryInterface.createTable("users", {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal("uuid_generate_v4()"),
          },
          name: {
            type: Sequelize.STRING,
          },
          email: {
            type: Sequelize.STRING,
          },
          phone: {
            type: Sequelize.STRING,
          },
          country: {
            type: Sequelize.STRING,
          },
        });
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};