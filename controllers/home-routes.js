const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require("bcrypt");

<<<<<<< HEAD
router.get('/', async (req, res) => {
  res.render('index')
})

router.get("/dashboard", (req, res) => { 
  if (!req.session.user) {
      return res.redirect("/")
  } else {
      res.render("dashboard", req.session.user)
  }
=======
router.get("/dashboard", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/")
    } else {
        res.render("dashboard", req.session.user)
    }
>>>>>>> Develop
})

module.exports = router;