const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const { Trip } = require('../../models')

router.get('/', async (req, res) => {
  try {
    const allTrips = await Trip.findAll();
    
    res.status(200).json(allTrips);
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;