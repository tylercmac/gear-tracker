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

module.exports = router;