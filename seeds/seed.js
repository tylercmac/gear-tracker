  
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


  await trips[0].addGearItem(1)
  await trips[0].addGearItem(3)
  await trips[0].addGearItem(4)
 
  await trips[1].addGearItem(1)
  await trips[1].addGearItem(3)
  await trips[1].addGearItem(4)

  await trips[2].addGearItem(2)
  await trips[2].addGearItem(11)
  await trips[2].addGearItem(9)
  await trips[2].addGearItem(10)
  await trips[3].addGearItem(10)

  await trips[4].addGearItem(6)
  await trips[4].addGearItem(7)
  await trips[4].addGearItem(8)

  

  process.exit(0);
};


seedDatabase();