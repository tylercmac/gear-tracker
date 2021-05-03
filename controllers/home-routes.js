const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require("bcrypt");

router.get("/dashboard", (req, res) => {
  if (!req.session.user) {
      return res.redirect("/")
  } else {
      res.render("dashboard", req.session.user)
  }
})

module.exports = router;