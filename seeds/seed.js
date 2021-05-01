const sequelize = require('../config/connection');
const { User, Trip, GearItem } = require('../models');

const userSeedData = require('./userSeedData.json');
const tripSeedData = require('./tripSeedData.json');
const gearItemSeedData = require('./gearItemSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Create users from user JSON seed
  const users = await User.bulkCreate(userSeedData);
  
  // randomly assign trip to user for seed data
  for (const trip of tripSeedData) {
    const newTrip = await Trip.create({
      ...trip,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  // For each gear item in gear JSON file, creates an item, gives it a random user id, and if the user ID matches one in the trips, assigns the item to one of the random trips.
  for (const item of gearItemSeedData) {
    const newGearItem = await GearItem.create({
      ...item,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    const matchedTrips = Trip.findAll({ 
      where: { 
        user_id: newGearItem.user_id,
      }
    })
    newGearItem.trip_id = matchedTrips[Math.floor(Math.random() * matchedTrips.length)].id
  }

  // If these above two FOR loops dont work, lets just use these two bulk creates for the other two models (the ids for trips and gear wont line up but whatever for now):
  // const trips = await Trip.bulkCreate(tripSeedData);
  // const gear = await GearItem.bulkCreate(gearItemSeedData);

  process.exit(0);
};

seedDatabase();