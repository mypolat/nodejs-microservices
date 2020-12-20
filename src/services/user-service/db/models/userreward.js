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
      this.belongsTo(models.user)
    }
  }
  userReward.init(
    {
      userId: DataTypes.INTEGER,
      rewardId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "userReward",
      timestamps: false,
    }
  );
  return userReward;
};