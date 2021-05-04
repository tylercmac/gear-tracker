const User = require('./User');
const Trip = require('./Trip');
const GearItem = require('./GearItem');

User.hasMany(Trip, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Trip.belongsTo(User, {
  foreignKey: 'user_id',
})

GearItem.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(GearItem, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
})

Trip.belongsToMany(GearItem, {
  through: 'TripGear'
})

GearItem.belongsToMany(Trip, {
  through: 'TripGear'
})

module.exports = { User, Trip, GearItem };