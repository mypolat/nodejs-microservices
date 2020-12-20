'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reward extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      reward.users = reward.hasMany(models.userReward,{
        foreignKey: {
          field: 'rewardId'
        }
      })
    }
  };
  reward.init({
    name: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    expiryDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'reward',
    timestamps:false
  });
  return reward;
};