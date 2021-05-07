const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class GearItem extends Model {}

GearItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    general_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    weight_oz: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'GearItem',
  }
);

module.exports = GearItem;
