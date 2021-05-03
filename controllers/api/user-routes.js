const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
// const session = require('express-session');

router.get('/sessiondata', (req, res) => {
    res.json(req.session);
})

// Create new profile
router.get('/new', (req, res) => {
    User.create({
            username: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }).then(newUser => {
            req.session.user = {
                id: newUser.id,
                email: newUser.email,
                username: newUser.username
            };
            res.json(newUser)
        }).catch (err => {
        console.log(err);
        res.status(500), json(err);
    })
});

// Login to existing profile
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(foundUser => {
        if (!foundUser) {
            req.session.destroy();
            return res.status(401).send('No account with this email found')
        }
        if (bcrypt.compareSync(req.body.password, foundUser.Password)) {
            req.session.user = {
                id: foundUser.id,
                email: foundUser.email,
                username: foundUser.username
            }; return res.json(foundUser)
        } else {
            req.session.destroy();
            return res.status(401).send('Username or password is incorrect')
        }
    })
});

// Logout
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.send("Successfully logged out!")
});

module.exports = router;
