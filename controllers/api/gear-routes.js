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

  console.log("gear post *******",req.body);
  console.log("gear session *******",req.session);

  try {
    const newGear = await GearItem.create({
      general_name: req.body.general_name,
      product_name: req.body.product_name,
      description: req.body.description,
      weight_oz: req.body.weight_oz,
      price: req.body.price,
      user_id: req.session.user.id
    });
    res.status(200).json(newGear);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.delete('/:id', async (req, res) => {
  console.log(req.body)
  try {
    const removedItem = await GearItem.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(removedItem)

    if (!removedItem) {
      res.status(404).json({message: 'item not found'})
      
    }
  } catch (err) {
    res.status(500).json(err);
  }
})


router.put('/:id', async (req, res) => {
  console.log('route reached!');
  
  console.log('reqbody:', req.body)
  let tripID = (req.body.id);
  console.log(tripID);
  
  try {
    const tripToUpdate = await Trip.findByPk(tripID)

    tripToUpdate.addGearItem(req.params.id)
    tripToUpdate.save();
    res.status(200).json( {message: 'succes'})
  } catch (err) {
    console.log(err);
  }

})

router.put('/update/:id', async (req, res) => {
  console.log('route reached :)');

  console.log('reqbody:', req.body)
  let itemID = Number(req.params.id);
  console.log(itemID);
  // const item = await GearItem.findByPk(itemID);
  // console.log(item);
  

  try {
    const itemToUpdate = await GearItem.update(
      {
        general_name: req.body.categories,
        product_name: req.body.item,
        description: req.body.description,
        weight_oz: req.body.weight,
        price: req.body.price
      },
      {
        where: {
          id: itemID
        }
      })
      console.log(`My item that I updated:`, itemToUpdate);
      
      res.status(200).json(itemToUpdate);
    } catch (err) {
      res.status(500).json(err);
    }

})



module.exports = router;