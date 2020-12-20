"use strict";
const { Model } = require("sequelize");
const rabbitmq = require("./../../mq/rabbitmq");

const MQ_CHANNEL_NAME = process.env.MQ_CHANNEL_NAME || "default";

module.exports = (sequelize, DataTypes) => {
  class userReward extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.reward);
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

  userReward.afterCreate(async (userReward, options) => {
    try {
      console.log("userReward.afterCreate triggered!");
      console.log(userReward);

      const mq = await rabbitmq;
      await mq.sendToQueue(MQ_CHANNEL_NAME, Buffer.from(JSON.stringify(userReward)), {
        persistent: true
      });

    } catch (error) {
      console.log(error);
    }
  });

  return userReward;
};
