const User = require('./User');
const Trip = require('./Trip');
const GearItem = require('./GearItem');

User.hasMany(Trip, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

User.hasMany(GearItem, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
})

Trip.hasMany(GearItem, {
  foreignKey: 'trip_id'
})

GearItem.belongsTo(User, {
  foreignKey: 'user_id',
});

GearItem.belongsToMany(Trip, {
  foreignKey: 'trip_id'
})

module.exports = { User, Trip, GearItem };