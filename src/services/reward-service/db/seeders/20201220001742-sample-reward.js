'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "rewards",
      [
        {
          name: "ExReward One",
          amount: 111,
          expiryDate: new Date(2020,11,20)
        },
        {
          name: "ExReward Two",
          amount: 222,
          expiryDate: new Date(2020,11,20)
        },
        {
          name: "Reward One",
          amount: 333,
          expiryDate: new Date(2020,11,31)
        },
        {
          name: "Reward Two",
          amount: 444,
          expiryDate: new Date(2020,11,30)
        },
        {
          name: "Reward Three",
          amount: 555,
          expiryDate: new Date(2020,11,29)
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
