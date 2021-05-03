const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const { GearItem, Trip, User } = require('../../models')


router.get('/', async (req, res) => {
  try {
    const allGear = await GearItem.findAll();

    res.status(200).json(allGear);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/:id', async (req, res) => {
  try {
    const gearData = await GearItem.findByPk(req.params.id, {
      include: [{ model: Trip }, { model: User }],
    });

    if (!gearData) {
      res.status(404).json({ message: 'No gear found with that id!' });
      return;
    }

    res.status(200).json(gearData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newGear = await GearItem.create(req.body);
    res.status(200).json(newGear);
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;