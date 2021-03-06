const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Trip extends Model {}

Trip.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    starting_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    ending_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    distance_mi: {
      type: DataTypes.DECIMAL,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    // gear_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'GearItem',
    //     key: 'id',
    //   },
    // },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Trip',
  }
);

module.exports = Trip;
