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
    },
    weight_oz: {
      type: DataTypes.DECIMAL(5, 2),
    },
    price: {
      type: DataTypes.DECIMAL,
    },
    description: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    trip_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'trip',
        key: 'id',
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'gearitem',
  }
);

module.exports = GearItem;
