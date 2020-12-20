'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "userRewards",
      [
        {
          userId: "1",
          rewardId: "3",
        },
        {
          userId: "1",
          rewardId: "4",
        },
        {
          userId: "2",
          rewardId: "3",
        }
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
