const sequelize = require('../config/connection');
const { User, Trip, GearItem } = require('../models');

const userSeedData = require('./userSeedData.json');
const tripSeedData = require('./tripSeedData.json');
const gearItemSeedData = require('./gearItemSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  
  // Create users from user JSON seed
  const users = await User.bulkCreate(userSeedData);
  
  const trips = await Trip.bulkCreate(tripSeedData);
  
  const gear = await GearItem.bulkCreate(gearItemSeedData);

  // // randomly assign trip to user for seed data
  for (const trip of trips) {
    trip.user_id = users[Math.floor(Math.random() * users.length)].id
    console.log('trip ui', trip.user_id)
    await trip.save();
  }

  for (const  gearItem of gear) {
      gearItem.user_id = users[Math.floor(Math.random() * users.length)].id,
      gearItem.trip_id = trips[Math.floor(Math.random() * users.length)].id
      console.log('gear ui', gearItem.user_id)
      console.log('gear ti', gearItem.trip_id)
      await gearItem.save();
  }

  process.exit(0);
};

seedDatabase();