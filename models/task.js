'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User, {foreignKey: "userId"})
    }
  };
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "title is required"
        }
      }
    },
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "choose category"
        }
      }
    },
    dueDate: {
      type: DataTypes.DATE,
      validate: {
        isAfter: new Date().toDateString()
      }
    }
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};