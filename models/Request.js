const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Request extends Model {}

Request.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    owner_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dog_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dog_breed: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'owner',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'request',
  }
);

module.exports = Request;
