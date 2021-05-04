const express = require('express');
const router = express.Router();
const apiAuth = require("../middleware/apiAuth")
const { User, GearItem, Trip } = require('../models')

router.get('/', async (req, res) => {
  res.render('index')
})

// Loads the dashboard with the user's data displayed
router.get("/dashboard", apiAuth, async (req, res) => {
    try {
      const userGearData = await GearItem.findAll( { 
        where: { 
          user_id: req.session.user.id
        }
      })
      const userGear = userGearData.map((gear) => gear.get({ plain: true }))
      console.log(userGear.general_name);
      
      res.render("dashboard", { userGear })
    } catch (err) {
      res.json(err);
    }
})

// For trips page, will display the trips that the user has
router.get("/trips", apiAuth, async (req, res) => {
  try {
    const userTripData = await Trip.findAll( { 
      where: { 
        user_id: req.session.user.id
      }
    })
    const userTrips = userTripData.map((Trip) => Trip.get({ plain: true }))
    
    res.render("trips", { userTrips })
  } catch (err) {
    res.json(err);
  }
})

router.get("/trips/:id", apiAuth, async (req, res) => {
  try {
    const specTripData = await Trip.findByPk( { 
      where: { 
        id: req.params.id
      }
    })
    const specTrip = specTripData.get({ plain: true })
    
    res.render("tripdisplay", { specTrip })
  } catch (err) {
    res.json(err);
  }
})



module.exports = router;

