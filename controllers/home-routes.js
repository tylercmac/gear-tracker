const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require("bcrypt");

router.get('/', async (req, res) => {
  res.render('index')
})

router.get("/dashboard", (req, res) => { 
  if (!req.session.user) {
      return res.redirect("/")
  } else {
    console.log('route reached!')
      res.render("dashboard", req.session.user)
  }
})

module.exports = router;