"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userReward extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.userReward, {
        foreignKey: {
          field: 'userId'
        },
        as: 'rewards'
      })
    }
  }
  userReward.init(
    {
      userId: DataTypes.UUID,
      rewardId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "userReward",
      timestamps: false,
    }
  );
  return userReward;
};