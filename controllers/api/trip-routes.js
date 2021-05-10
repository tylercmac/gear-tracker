const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const { Trip, GearItem, User } = require('../../models')

router.get('/', async (req, res) => {
  try {
    const allTrips = await Trip.findAll();
    
    res.status(200).json(allTrips);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/:id', async (req, res) => {
  try {
      const tripData = await Trip.findByPk(req.params.id, {
          include: [{ model: User }, {model: GearItem }],
      });

      if (!tripData) {
          res.status(404).json({ message: 'No Trip found with that id!' });
          return;
      }

      res.status(200).json(tripData);
  } catch (err) {
      res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  try {
    const newTrip = await Trip.create({
      name: req.body.name,
      location: req.body.location,
      description: req.body.description,
      starting_date: req.body.starting_date,
      ending_date: req.body.ending_date,
      distance_mi: req.body.distance_mi,
      user_id: req.session.user.id,
    });
    res.status(200).json(newTrip);
  } catch (err) {
    res.status(500).json(err);
  }
})


router.put('/:id', async (req, res) => {
  let gearID = (req.body.id);
  console.log(gearID);

  try {
  const tripToUpdate = await Trip.findByPk(req.params.id)

  tripToUpdate.removeGearItem(gearID);
  tripToUpdate.save();
  res.status(200).json( {message: 'succes'})
  } catch (err) {
    console.log(err);
  }
  
})

router.delete('/:id', async (req, res) => {
  console.log(req.body)
  try {
    const removedTrip = await Trip.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(removedTrip)

    if (!removedTrip) {
      res.status(404).json({message: 'item not found'})
      
    }
  } catch (err) {
    res.status(500).json(err);
  }
})
module.exports = router;