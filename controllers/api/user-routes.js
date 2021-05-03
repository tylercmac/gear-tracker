const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const { GearItem, Trip, User } = require('../../models')

router.get('/', async (req, res) => {
  try {
    const allUsers = await User.findAll();

    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/:id', async (req, res) => {
  try {
      const userData = await User.findByPk(req.params.id, {
          include: [{ model: Trip }, { model: GearItem }],
      });

      if (!userData) {
          res.status(404).json({ message: 'No user found with that id!' });
          return;
      }

      res.status(200).json(userData);
  } catch (err) {
      res.status(500).json(err);
  }
});


module.exports = router;