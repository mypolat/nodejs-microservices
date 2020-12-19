"use strict";



module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "User One",
          email: "user.one@example.com",
          phone: "+1-000-000-0000",
          country: "World"
        },
        {
          name: "User Two",
          email: "user.two@example.com",
          phone: "+1-000-000-0000",
          country: "World"
        },
        {
          name: "User Three",
          email: "user.three@example.com",
          phone: "+1-000-000-0000",
          country: "World"
        },
        {
          name: "User Four",
          email: "user.four@example.com",
          phone: "+1-000-000-0000",
          country: "World"
        },
        {
          name: "User Five",
          email: "user.five@example.com",
          phone: "+1-000-000-0000",
          country: "World"
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
