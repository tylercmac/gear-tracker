const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const { GearItem } = require('../../models')


router.get('/', async (req, res) => {
  try {
    const allGear = await GearItem.findAll();
    
    res.status(200).json(allGear);
  } catch (err) {
    res.status(500).json(err);
  }
})


module.exports = router;